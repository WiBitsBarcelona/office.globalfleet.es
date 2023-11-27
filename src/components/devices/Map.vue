<template>
  <!-- BEGIN: Devices Map -->
  <div class="col-span-3 w-full intro-y">
    <div class="sm:ml-auto mt-3 mb-3 w-full sm:mt-0 relative text-slate-500">
      <UserIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
      <input type="search" class="form-control sm:w-full box pl-10 search-cancel" :placeholder="$t('filter_by_driver')"
        v-model="searchDrivers" />
    </div>
    <div class="box p-1 intro-x h-[650px] overflow-y-auto">
      <div>
        <ul v-for="driver in searchedDrivers" :key="driver" class="text-sm text-gray-500 hover:cursor-pointer">
          <li class="border-b-[1px] border-inherit px-2 py-3 hover:bg-gray-50" @click="zoomDriver(driver.id)">
            <div class="flex flex-row items-center text-gray-500">
              <p class="basis-1/2 font-bold">{{ driver.name }} {{ driver.surname }}</p>
              <p class="basis-1/2 text-right text-sm">{{ $h.formatDate(driver.position.captured_at, 'DD/MM/YYYY HH:mm') }}
              </p>
            </div>
            <div class="flex flex-row pt-3">
              <div class="flex basis-3/6 items-center gap-1">
                <SmartphoneIcon class="w-4 h-4" />
                <p>
                  <span class="capitalize">{{ driver.position.manufacturer }} {{ driver.position.model }}</span>
                </p>
              </div>
              <div class="flex basis-2/6">
                <div class="flex basis-1/2 items-center gap-0.5">
                  <svg width="20" height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="android">
                      <mask id="mask0_103_447" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="13"
                        height="13">
                        <rect id="Bounding box" width="13" height="13" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_103_447)">
                        <path id="android_2"
                          d="M0.541504 9.74997C0.622754 8.784 0.918414 7.89476 1.42848 7.08226C1.93855 6.26976 2.61789 5.62428 3.4665 5.1458L2.46442 3.41247C2.41025 3.33122 2.39671 3.24546 2.4238 3.15518C2.45088 3.0649 2.50956 2.99719 2.59984 2.95205C2.67206 2.90692 2.75331 2.89789 2.84359 2.92497C2.93387 2.95205 3.00609 3.00622 3.06025 3.08747L4.06234 4.8208C4.83873 4.4958 5.65123 4.3333 6.49984 4.3333C7.34845 4.3333 8.16095 4.4958 8.93734 4.8208L9.93942 3.08747C9.99359 3.00622 10.0658 2.95205 10.1561 2.92497C10.2464 2.89789 10.3276 2.90692 10.3998 2.95205C10.4901 2.99719 10.5488 3.0649 10.5759 3.15518C10.603 3.24546 10.5894 3.33122 10.5353 3.41247L9.53317 5.1458C10.3818 5.62428 11.0611 6.26976 11.5712 7.08226C12.0813 7.89476 12.3769 8.784 12.4582 9.74997H0.541504ZM3.7915 8.26039C3.98109 8.26039 4.14133 8.19494 4.27223 8.06403C4.40314 7.93313 4.46859 7.77289 4.46859 7.58331C4.46859 7.39372 4.40314 7.23348 4.27223 7.10258C4.14133 6.97167 3.98109 6.90622 3.7915 6.90622C3.60192 6.90622 3.44168 6.97167 3.31078 7.10258C3.17987 7.23348 3.11442 7.39372 3.11442 7.58331C3.11442 7.77289 3.17987 7.93313 3.31078 8.06403C3.44168 8.19494 3.60192 8.26039 3.7915 8.26039ZM9.20817 8.26039C9.39776 8.26039 9.558 8.19494 9.6889 8.06403C9.8198 7.93313 9.88526 7.77289 9.88526 7.58331C9.88526 7.39372 9.8198 7.23348 9.6889 7.10258C9.558 6.97167 9.39776 6.90622 9.20817 6.90622C9.01859 6.90622 8.85835 6.97167 8.72744 7.10258C8.59654 7.23348 8.53109 7.39372 8.53109 7.58331C8.53109 7.77289 8.59654 7.93313 8.72744 8.06403C8.85835 8.19494 9.01859 8.26039 9.20817 8.26039Z"
                          fill="#5F6E86" />
                      </g>
                    </g>
                  </svg>
                  <sup>{{ driver.position.os_version }}</sup>
                </div>
                <div class="flex basis-1/2 items-center gap-1">
                  <Tippy v-if="$h.toKmsHour(driver.position.speed) >= 5" tag="button" class="tooltip primary"
                    :content="$t('tooltips.driving')" :options="{ theme: 'dark' }">
                    <img src="/src/assets/images/markers/driving-status-icon-green.svg" class="w-18 h-18">
                  </Tippy>
                  <Tippy v-else tag="button" class="tooltip primary" :content="$t('tooltips.stopped')"
                    :options="{ theme: 'dark' }">
                    <img src="/src/assets/images/markers/driving-status-icon-red.svg" class="w-18 h-18">
                  </Tippy>
                  <sup>{{ driver.position.fleet_version }}</sup>
                </div>
              </div>
              <div class="flex basis-1/6 justify-end">
                <div v-if="driver.position.is_charging == 1"
                  class="flex items-center gap-2 rounded-full bg-green-100 px-3 py-0">
                  <BatteryChargingIcon class="w-4 h-4" />
                  <p>{{ driver.position.battery_level }}%</p>
                </div>
                <template v-else>
                  <div v-if="driver.position.battery_level <= 10"
                    class="flex items-center gap-2 rounded-full bg-red-100 px-3 py-0">
                    <BatteryWarningIcon class="w-4 h-4" />
                    <p>{{ driver.position.battery_level }}%</p>
                  </div>
                  <div v-if="driver.position.battery_level > 10 && driver.position.battery_level <= 25"
                    class="flex items-center gap-2 px-3 py-0">
                    <BatteryLowIcon class="w-4 h-4" />
                    <p>{{ driver.position.battery_level }}%</p>
                  </div>
                  <div v-if="driver.position.battery_level > 25 && driver.position.battery_level <= 50"
                    class="flex items-center gap-2 px-3 py-0">
                    <BatteryMediumIcon class="w-4 h-4" />
                    <p>{{ driver.position.battery_level }}%</p>
                  </div>
                  <div v-if="driver.position.battery_level > 50 && driver.position.battery_level <= 100"
                    class="flex items-center gap-2 px-3 py-0">
                    <BatteryFullIcon class="w-4 h-4" />
                    <p>{{ driver.position.battery_level }}%</p>
                  </div>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-span-9 w-full intro-y">
    <div class="box p-1 intro-x h-[700px]">
      <GoogleMapLoader :init="init" class="vehicles-maps bg-slate-200 rounded-md" />
    </div>
  </div>
  <!-- END: Devices Map -->
</template>

<script setup>
import { watch, computed, ref, toRefs, defineProps, onUnmounted } from "vue";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { useDarkModeStore } from "@/stores/dark-mode";
import useDriver from "@/composables/drivers"
import { helper as $h } from "@/utils/helper";
import { useI18n } from 'vue-i18n';
import { MarkerWithLabel } from '@googlemaps/markerwithlabel';
import { useRouter } from "vue-router";
import { Toast } from '@/utils/toast';

const router = useRouter();
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
  toggle: {
    type: Boolean,
    default: false,
  }
});

const { toggle } = toRefs(props);
let auto_refresh = import.meta.env.VITE_AUTOREFRESHMAPS_VALUE;
const autoRefresh = ref();
watch(toggle, () => {
  console.log(toggle.value);
  if (toggle.value == true) {
    Toast(t("auto_refresh_on_toast"), 'info');
    autoRefresh.value = setInterval(() => {
      refreshData();
    }, auto_refresh);
  } else {
    Toast(t("auto_refresh_off_toast"), 'info');
    clearInterval(autoRefresh.value);
  }
})

//REFERENCE TO VARIABLE MAP
let mapa;
//ARRAY TO SAVE ALL MAKERS ID'S
let driversArr = [];
let markersArr = [];
const positionsArr = ref([]);
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
let refreshData = ref();
const init = async (initializeMap) => {

  await getDrivers();

  markersArr = [];
  drivers.value.forEach((d) => {
    if (d.position) {
      totalDevices.value++;
      markersArr.push(d);
      positionsArr.value.push(d);
    }
  });

  positionsArr.value.sort((a, b) => new Date(b.position.captured_at) - new Date(a.position.captured_at));

  const markers = JSON.parse(JSON.stringify(markersArr));

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
      //const lastDate = $h.toDate(markerElem.position.timestamp);
      const lastDate = $h.formatDate(markerElem.position.captured_at, 'DD/MM/YYYY HH:mm');
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
                    <a href="https://www.google.es/maps/place/${markerElem.position.latitude},${markerElem.position.longitude}" target="_blank" class="text-md font-normal leading-4 text-gray-500 hover:text-primary">${!markerElem.position.gps_positioning ? t('dashboard.no_data') : markerElem.position.gps_positioning}</a>
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
        labelContent: markerElem.name + ' ' + markerElem.surname + direction_icon,
        labelAnchor: new google.maps.Point(0, -75),
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

  refreshData = async () => {
    init(initializeMap);
  }
};

//FUNCTION FOR CREATE A BUTTON ELEMENT TO RESET MAP TO DEFAULT BOUNDS.
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
  return positionsArr.value.filter((driver) => {
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

onUnmounted(() => {
  clearInterval(autoRefresh.value);
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
}</style>