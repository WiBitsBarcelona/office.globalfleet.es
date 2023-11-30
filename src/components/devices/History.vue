<template>
  <!-- BEGIN: History Map -->
  <div class="col-span-12 w-full intro-y">

    <div class="box p-1 intro-x p-3">
      <div class="inline-flex gap-2">
        <TomSelect v-model="selected_driver" name="plate_driver" :options="{
          placeholder: $t('dashboard.select_driver_placeholder'),
        }" class="form-control w-[350px]">
          <option :value="0">{{ $t("dashboard.select_driver_placeholder") }}</option>
          <template v-for="driver in drivers" :key="driver.id">
            <option v-if="driver.position" :value="driver.id">{{ driver.name }} {{
              driver.surname }}</option>
          </template>
        </TomSelect>
        <Litepicker v-model="daterange" :options="{
          autoApply: false,
          singleMode: false,
          numberOfColumns: 2,
          numberOfMonths: 2,
          lang: currentLocale,
          showWeekNumbers: false,
          dropdowns: {
            minYear: 2000,
            maxYear: null,
            months: true,
            years: true,
          },
          buttonText: {
            apply: t('btn_accept'),
            cancel: t('btn_cancel')
          },
          tooltipText: {
            one: t('day'),
            other: t('days')
          },
        }" class="form-control w-56 block mx-auto" />
        <div class="text-center">
          <Dropdown class="inline-block" placement="bottom-start" v-slot="{ dismiss }">
            <DropdownToggle class="btn btn-primary">
              <ClockIcon class="w-5 h-5" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownContent tag="div">
                <div class="p-2">
                  <div>
                    <div class="text-xs">{{ $t("from") }}</div>
                    <TomSelect v-model="time_from" class="form-control">
                      <option v-for="(time, index) in times" :value="time" :key="index">{{ time }}</option>
                    </TomSelect>
                  </div>
                  <div class="mt-3">
                    <div class="text-xs">{{ $t("to") }}</div>
                    <TomSelect v-model="time_at" class="form-control">
                      <option v-for="(time, index) in times.slice().reverse()" :value="time" :key="index">{{ time }}</option>
                    </TomSelect>
                  </div>
                  <div class="flex items-center mt-3">
                    <button @click="dismiss" class="btn btn-secondary w-32 ml-auto">
                      {{ $t('btn_close') }}
                    </button>
                    <button @click="dismiss" class="btn btn-primary w-32 ml-2">
                      {{ $t('btn_accept') }}
                    </button>
                  </div>
                </div>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <button @click="getData" class="btn btn-outline-primary w-32 mb-1">
          <CheckIcon class="w-4 h-4 mr-2" /> {{ $t('btn_accept') }}
        </button>
      </div>
    </div>
  </div>
  <div class="col-span-12 w-full intro-y">
    <div class="box p-1 intro-x h-[700px]">
      <div class="grid grid-cols-12 gap-0">
        <div class="col-span-3 h-[690px] overflow-auto">
          <div class="p-4 mt-1">
            <div class="container">
              <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
                <div v-for="driverPosition in driverPositions" :key="driverPosition.id" class="flex md:contents">
                  <div class="col-start-2 col-end-3 mr-10 md:-mx-10 relative">
                    <div class="h-full w-5 flex items-center justify-center">
                      <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                    </div>
                    <div v-if="$h.toKmsHour(driverPosition.speed) >= 5"
                      class="w-5 h-5 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center"></div>
                    <div v-else class="w-5 h-5 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center"></div>
                  </div>
                  <div @click="zoomData(driverPosition.latitude, driverPosition.longitude, driverPosition.id)"
                    class="block col-start-3 col-end-12 p-4 my-1 mr-auto w-full -mx-12 hover:bg-gray-200 hover:cursor-pointer">
                    <h5 class="text-xs text-gray-900 dark:text-white mb-1">{{ driverPosition.gps_positioning
                    }}</h5>
                    <p class="text-xs leading-tight text-justify w-full text-gray-400 dark:text-gray-500">
                      {{
                        $h.formatDate(driverPosition.captured_at, 'DD/MM/YYYY HH:mm') }}
                      <span
                        class="inline-flex items-center py-1 px-1 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent ml-2">{{
                          $h.toKmsHour(driverPosition.speed) }}
                        km/h.</span>

                      <!-- {{ $h.getDirectionIcon($h.getDirection(driverPosition.heading)) }} -->

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-9">
          <GoogleMapLoader :init="init" class="vehicles-maps bg-slate-200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, computed, ref, defineProps, onMounted, onUpdated } from "vue";
import useDriver from "@/composables/drivers";
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import { useI18n } from 'vue-i18n';
import useDriverPosition from "@/composables/driver_positions";
import { useDarkModeStore } from "@/stores/dark-mode";

const daterange = ref("");
const selected_driver = ref("");
const today = ref("");
const startDate = ref("");
const endDate = ref("");
const time_from = ref("00:00");
const time_at = ref("23:59");
const { drivers, getDrivers } = useDriver();
const { t } = useI18n();
const { driverPositions, getDriverPositions } = useDriverPosition();
const currentLocale = ref("es-ES");

switch(localStorage.getItem('locale')){
  case 'es':
    currentLocale.value = "es-ES";
    break;
  case 'en':
    currentLocale.value = "en-US";
    break;
  default:
    currentLocale.value = "es-ES";
    break;
}

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
  },
});

const imageAssets = import.meta.globEager(
  `/src/assets/images/markers/*.{jpg,jpeg,png,svg}`
);
const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const times = [
  "00:00",
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
  "23:59"
];

let centerControl = '';

let mapa;
let markers = [];
let coordinates = [];
let latlngbounds;
let infoWindow;

let markerColor = '';
let markerColorDriving = 'rgb(34 197 94)';
let markerColorStopped = 'rgb(239 68 68)';

const getData = async () => {
  if (selected_driver.value == 0) {
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("select_driver_error"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
      },
    });
  } else {
    let rangeArray = daterange.value.split('-');
    let [dayfrom, monthfrom, yearfrom] = rangeArray[0].trim().split('/');
    let timeFromArray = time_from.value.split(':');
    let hourfrom = timeFromArray[0];
    let minutesfrom = timeFromArray[1];
    let secondsfrom = '00';
    let [dayto, monthto, yearto] = rangeArray[1].trim().split('/');
    let timeAtArray = time_at.value.split(':');
    let hourat = timeAtArray[0];
    let minutesat = timeAtArray[1];
    let secondsat = '59';

    let dateFromTmp = new Date(+yearfrom, +monthfrom - 1, +dayfrom, +hourfrom, +minutesfrom, +secondsfrom);
    let dateToTmp = new Date(+yearto, +monthto - 1, +dayto, +hourat, +minutesat, +secondsat);
    let dateFrom = $h.formatDate(dateFromTmp, "YYYY-MM-DD HH:mm:ss");
    let dateTo = $h.formatDate(dateToTmp, "YYYY-MM-DD HH:mm:ss");

    


    let currentData = { from_at: dateFrom, to_at: dateTo };
    await getDriverPositions(selected_driver.value, currentData);

    if (driverPositions.value.length == 0) {
      Swal.fire({
        icon: 'info',
        title: '',
        text: t("no_position_data"),
        confirmButtonText: t("documents.swal.all_right_btn"),
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary shadow-md',
        },
      });
    } else {
      if (markers) {
        for (let i in markers) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      latlngbounds = new google.maps.LatLngBounds();

      infoWindow = new google.maps.InfoWindow({
        minWidth: 350,
        maxWidth: 500,
        pixelOffset: new google.maps.Size(0, -10),
      });
      let totalArr = driverPositions.value.length;
      let indexArr = 0;
      let markerScale = 4;
      driverPositions.value.forEach(element => {
        if ($h.toKmsHour(element.speed) >= 5) {
          markerColor = markerColorDriving;
        } else {
          markerColor = markerColorStopped;
        }
        if(indexArr == 0){
          markerScale = 10;
        }else if(indexArr == totalArr -1){
          markerScale = 10;
        }else{
          markerScale = 4;
        }
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.latitude, element.longitude),
          id: element.id,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: markerScale,
            strokeColor: markerColor,
            strokeWeight: 2,
            fillColor: markerColor,
            fillOpacity: 0.5
          },
          title: element.gps_positioning
        });
        latlngbounds.extend(marker.position);
        markers.push(marker);
        coordinates.push({ 'lat': parseFloat(element.latitude), 'lng': parseFloat(element.longitude) });

        let speed = $h.toKmsHour(element.speed);
        let direction = $h.getDirection(element.heading);
        let direction_icon = $h.getDirectionIcon(direction);
        let formattedDate = $h.formatDate(element.captured_at, "DD-MM-YYYY HH:mm")
        const infowincontent = "<div class='grid grid-cols-12 gap-2 mt-2'><div class='col-span-3 font-medium'>" + t('gps_positioning') + ":</div><div class='col-span-9'><a class='hover:text-primary' href='https://www.google.es/maps/place/" + element.latitude + "," + element.longitude + "' target='_blank'>" + element.gps_positioning + "</a></div><div class='col-span-3 font-medium'>"+ t('infowindow.speed') + "</div><div class='col-span-9'>" + speed + " km/h</div><div class='col-span-3 font-medium'>" + t('infowindow.direction') + "</div><div class='col-span-9'>" + direction + "<span>" + direction_icon + "</span></div><div class='col-span-3 font-medium'>" + t('infowindow.last_update') + "</div><div class='col-span-9'>" + formattedDate + "</div></div>";

        google.maps.event.addListener(marker, "click", function () {
          infoWindow.setContent(infowincontent);
          google.maps.event.addListener(infoWindow, "domready", function () {
          });
          infoWindow.setPosition(marker.getPosition());
          infoWindow.open(mapa, marker);
        });
        indexArr++;
      });

      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(mapa);
      }

      mapa.setCenter(latlngbounds.getCenter());
      mapa.fitBounds(latlngbounds);

      //INSERT CUSTOM BUTTOM TO RESET MAP IN MAP.
      if (centerControl == '') {
        const centerControlDiv = document.createElement("div");
        centerControl = createCenterControl(mapa);
        centerControlDiv.appendChild(centerControl);
        mapa.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
      }
    }
  }
}

const zoomData = async (lat, lng, id) => {
  markers.forEach(el => {
    if (id == el.id) {
      google.maps.event.trigger(el, 'click');
    }
  });
  mapa.setZoom(18);
  mapa.setCenter(new google.maps.LatLng(lat, lng));
}

const init = async (initializeMap) => {

  const darkTheme = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#171f29",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];
  const lightTheme = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e0e3e8",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  const { google, map } = await initializeMap({
    apiKey: "AIzaSyCw7L6S2IxJ2FDgm5F6on9pG-1898qtQVg",
    config(google) {
      return {
        zoom: 5,
        styles: darkMode.value ? darkTheme : lightTheme,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        streetViewControl: false,
        mapTypeControl: false,
        center: {
          lat: 43.85341,
          lng: 9.3488,
        },
      };
    },
  });

  mapa = map;
  const stop = watch(darkMode, () => {
    init(initializeMap);
    stop();
  });
}

function createCenterControl(map) {
  const controlButton = document.createElement("button");
  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.backgroundImage = "url('" + imageAssets["/src/assets/images/markers/refresh.png"].default + "')";
  controlButton.style.backgroundSize = "cover"
  controlButton.style.width = "40px";
  controlButton.style.height = "40px";
  controlButton.style.border = "2px solid #fff";
  controlButton.style.borderRadius = "3px";
  controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
  controlButton.style.color = "rgb(25,25,25)";
  controlButton.style.cursor = "pointer";
  controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
  controlButton.style.fontSize = "16px";
  controlButton.style.lineHeight = "38px";
  controlButton.style.margin = "10px 10px 22px";
  controlButton.style.padding = "5px";
  controlButton.style.textAlign = "center";
  controlButton.textContent = "";
  controlButton.title = t('dashboard.reload_map');
  controlButton.type = "button";
  controlButton.addEventListener("click", () => {
    //BUTTON ON CLICK RESET MAP TO BOUNDS.
    if (infoWindow) {
      infoWindow.close();
    }
    mapa.setCenter(latlngbounds.getCenter());
    mapa.fitBounds(latlngbounds);
  });
  return controlButton;
}

onMounted(() => {
  getDrivers();
  let dateNowTmp = new Date();
  today.value = $h.formatDate(dateNowTmp, "YYYY-MM-DD");
  startDate.value = $h.formatDate(dateNowTmp, "DD/MM/YYYY");
  endDate.value = $h.formatDate(dateNowTmp, "DD/MM/YYYY");

});
</script>

<style>
.labels {
  color: rgb(14, 14, 14);
  font-size: 14px;
  text-align: center;
  width: auto;
  padding: 6px;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #000000;
}
</style>