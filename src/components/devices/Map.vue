<template>
  <!-- BEGIN: Devices Map -->
  <div class="col-span-2 w-full intro-y">
    <div class="sm:ml-auto mt-3 mb-3 w-full sm:mt-0 relative text-slate-500">
      <UserIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
      <input type="search" class="form-control sm:w-full box pl-10 search-cancel" :placeholder="$t('filter_by_driver')"
        v-model="searchDrivers" />
    </div>
    <div class="box p-1 intro-x h-[650px] overflow-y-auto">
      <div>
        <table id="drivers" class="table table-hover hover:cursor-pointer overflow-scroll w-full">
          <tbody v-for="driver in searchedDrivers" :key="driver" class="overflow-y-auto">
            <template v-if="driver.position">

              <tr>
                <td :id="driver.id" class="text-sm leading-6 text-gray-500 !p-1"
                  @click="zoomDriver(driver.id)">
                  <span class="font-bold">{{ driver.name }} {{ driver.surname }}</span><br/>
                  <span class="text-xs">{{ $h.toDate(driver.position.timestamp) }}</span>
                </td>
                <td class="text-right !p-1">
                  <Tippy v-if="driver.position.speed >= 5" tag="button" class="tooltip primary ml-4 mr-2"
                    :content="$t('driving')" :options="{ theme: 'light' }">
                    <img src="/src/assets/images/markers/driving-status-icon-green.svg" class="w-5 h-5">
                  </Tippy>
                  <Tippy v-else tag="button" class="tooltip primary ml-4 mr-2" :content="$t('stopped')"
                    :options="{ theme: 'light' }">
                    <img src="/src/assets/images/markers/driving-status-icon-red.svg" class="w-5 h-5">
                  </Tippy>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-span-10 w-full intro-y">
    <div class="box p-1 intro-x h-[700px]">
      <GoogleMapLoader :init="init" class="vehicles-maps bg-slate-200 rounded-md" />
    </div>
  </div>
  <!-- END: Devices Map -->
</template>

<script setup>
import { watch, computed, ref, toRaw, defineProps, VueElement } from "vue";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { useDarkModeStore } from "@/stores/dark-mode";
import useDriver from "@/composables/drivers"
import { helper as $h } from "@/utils/helper";
import { useI18n } from 'vue-i18n';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

const { t } = useI18n();
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
//REFERENCE TO VARIABLE MAP
let mapa;
//ARRAY TO SAVE ALL MAKERS ID'S
let driversArr = [];
let markersArr = [];
//VARIABLE TO SET BG ON INFOWINDOW
let bg_trip = 'bg-gray-100';
//VARIABLE TO SET MARKER
let markerIcon = '';
const { drivers, getDrivers } = useDriver();
const totalDevices = ref(0);
const selected_driver = ref("");
const imageAssets = import.meta.globEager(
  `/src/assets/images/markers/*.{jpg,jpeg,png,svg}`
);
const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);
//DEFINE CONSTANT TO SAVE BOUNDS
let latlngbounds;
let infoWindow;
let plate;
let trip_id;
let trip_status;
let trip_origin;
let trip_destination;
let cluster;

const init = async (initializeMap) => {

  await getDrivers();
  //const devices = drivers.value;
  drivers.value.forEach((d) => {
    if (d.position) {
      totalDevices.value++;
      markersArr.push(d);
    }
  });

  const markers = JSON.parse(JSON.stringify(markersArr));
  //console.log(markers);
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
    apiKey: "AIzaSyCMlwJPBGrPWXJE2oaZ7arA7VxkJI2EdxY",
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

  latlngbounds = new window.google.maps.LatLngBounds();

  infoWindow = new google.maps.InfoWindow({
    minWidth: 350,
    maxWidth: 450,
    pixelOffset: new google.maps.Size(0, -60),
  });

  cluster = new MarkerClusterer(
    map,
    markers.map(function (markerElem) {
      const point = new google.maps.LatLng(
        parseFloat(markerElem.position.latitude),
        parseFloat(markerElem.position.longitude)
      );
      const lastDate = $h.toDate(markerElem.position.timestamp);
      const speed = $h.toKmsHour(markerElem.position.speed);
      const direction = $h.getDirection(markerElem.position.heading);
      const direction_icon = $h.getDirectionIcon(direction);
      additionalInfoWindowData(markerElem.driver_trips);
      const infowincontent = `
              <div class="grid gap-y-8">
                <div class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
                  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-center dark:bg-gray-800 dark:text-gray-400">
                    <p class="text-md text-xl font-bold leading-5 text-gray-500">${markerElem.name} ${markerElem.surname} / ${plate}</p>
                  </div>
                  <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.trip")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${trip_id}</p>
                  </div>
                  <div class="col-span-6 rounded-md ${bg_trip} p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.status")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${trip_status}</p>
                  </div>
                  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.origin")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${trip_origin}</p>
                  </div>
                  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.destination")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${trip_destination}</p>
                  </div>
                  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.gps_position")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${!markerElem.position.gps_positioning ? t('dashboard.no_data') : markerElem.position.gps_positioning}</p>
                  </div>
                  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.accuracy")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${markerElem.position.accuracy} m.</p>
                  </div>
                  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.speed")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500"> ${!speed ? t('dashboard.no_data') : speed} km/h.</p>
                  </div>
                  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.direction")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${direction_icon}<span class="text-xs"> ${direction} </span></p>
                  </div>
                  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">${t("infowindow.last_update")}</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">${!lastDate ? t('dashboard.no_data') : lastDate}</p>
                  </div>
                </div>
              </div>`;

      if (speed >= 5) {
        markerIcon = imageAssets["/src/assets/images/markers/map-marker-green.svg"].default;
        //markerIcon = "/src/assets/images/markers/map-marker-green.svg";
      } else {
        markerIcon = imageAssets["/src/assets/images/markers/map-marker-red.svg"].default;
        //markerIcon = "/src/assets/images/markers/map-marker-red.svg";
      };

      /*  BLOCK TO DISPLAY COORDINATES ON THE INFOWINDOW. DISABLED AT THIS MOMENT.           
      <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
        <h5 class="text-xs font-light text-gray-400">${ t("infowindow.coords") }</h5>
        <p class="text-md font-normal leading-6 text-gray-500">${markerElem.position.latitude},${markerElem.position.longitude}</p>
      </div> */
      //const marker = new google.maps.Marker({
      const marker = new MarkerWithLabel({
        map: map,
        clickable: true,
        position: point,
        id: markerElem.id,
        //animation: google.maps.Animation.DROP,
        labelContent: markerElem.name + ' ' + markerElem.surname,
        labelAnchor: new google.maps.Point(0, -65),
        labelClass: "labels " + bg_trip,
        labelInBackground: true,
        icon: markerIcon,
      });

      //ADD CURRENT MARKER POSITION TO BOUNDS
      latlngbounds.extend(marker.position);

      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(infowincontent);
        google.maps.event.addListener(infoWindow, "domready", function () {
/*           cash(".arrow_box").closest(".gm-style-iw-d").removeAttr("style");
          cash(".arrow_box")
            .closest(".gm-style-iw-d")
            .attr("style", "overflow:visible");
          cash(".arrow_box")
            .closest(".gm-style-iw-d")
            .parent()
            .removeAttr("style"); */
        });
        infoWindow.setPosition(marker.getPosition());
        infoWindow.open(map, marker);

      });
      driversArr.push(marker);
      return marker;
    }),
    {
      styles: [
        {
          width: 55,
          height: 55,
          textColor: "white",
          url: !darkMode.value
            ? imageAssets["/src/assets/images/markers/map-marker-group-100.svg"].default
            : imageAssets["/src/assets/images/markers/map-marker-group-100.svg"].default,
          anchor: [0, 0],
          anchorText: [17, 0],
          fontWeight: "bold",
        },
      ],
    }
  );

  //INSERT CUSTOM BUTTOM TO RESET MAP IN MAP.
  const centerControlDiv = document.createElement("div");
  const centerControl = createCenterControl(map);
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

  //SET DEFAULT CENTER AND ZOOM TO CURRENT BOUNDS.
  if (markers.length > 1) {
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
  }

  mapa = map;

  const stop = watch(darkMode, () => {
    init(initializeMap);
    stop();
  });
};

//FUNCTION FOR CREATE A BUTTON ELEMENT TO RESET MAP TO DEFAULT BOUNDS.
function createCenterControl(map) {
  const controlButton = document.createElement("button");
  // Set CSS for the control.
  controlButton.style.backgroundColor = "#fff";
  controlButton.style.backgroundImage = "url('" + imageAssets["/src/assets/images/markers/refresh.png"].default + "')";
  //controlButton.style.backgroundImage = "url('../../../src/assets/images/refresh.png')";
  //controlButton.style.backgroundImage = "url(imageAssets['/src/assets/images/map-marker-region-dark.svg'])";
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
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
  });
  return controlButton;
}

function additionalInfoWindowData(data) {
  plate = '--';
  trip_id = '--';
  trip_status = '--';
  trip_origin = '--';
  trip_destination = '--';
  let active_trip = null;
  let exist = 0;

  data.forEach((trip) => {
    switch (trip.trip_status_id) {
      case 6:
      if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 5;
          bg_trip = 'bg-green-100';
        }
        break;        
      case 5:
        if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 5;
          bg_trip = 'bg-blue-100';
        }
        break;
      case 4:
        if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 4;
          bg_trip = 'bg-orange-100';
        }
        break;
      case 3:
        if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 3;
          bg_trip = 'bg-orange-100';
        }
        break;
      case 2:
        if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 2;
          bg_trip = 'bg-gray-100';
        }
        break;
      case 1:
        if (exist < trip.trip_status_id) {
          active_trip = trip;
          exist = 1;
          bg_trip = 'bg-gray-100';
        }
        break;
      default:
        break;
    }
  });

  if (active_trip) {
    plate = active_trip.vehicle.plate;
    trip_id = active_trip.reference_number;
    trip_status = active_trip.status.name;
    let stageArr = [];
    active_trip.stages.forEach((stage) => {
      if (stage.activity) {
        stageArr.push(stage.name);
      }
    });
    trip_origin = stageArr[0];
    trip_destination = stageArr[stageArr.length - 1];
  }
}

const searchDrivers = ref("");

const searchedDrivers = computed(() => {
  return drivers.value.filter((driver) => {
    let fullname = driver.name + ' ' + driver.surname;
    return (
      fullname
        .toLowerCase()
        .indexOf(searchDrivers.value.toLowerCase()) != -1
    );
  });
});

function zoomDriver(drv) {
  if (infoWindow) {
    infoWindow.close();
  }
  driversArr.forEach(el => {
    if (drv == el.id) {
      google.maps.event.trigger(el, 'click');
    }
  });
}

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