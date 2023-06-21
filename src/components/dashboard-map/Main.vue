<template>
  <!-- BEGIN: Vehicles Map -->
  <div class="col-span-12 xl:col-span-12 mt-6">
    <div class="intro-y block sm:flex items-center mb-5">
      <h2 class="text-lg font-medium truncate ml-3"> <span class="text-2xl text-primary dark:text-light">{{ totalVehicles }} </span>{{$t("dashboard.vehicles_subtitle2") }}</h2>
      <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
        <div class="inline-flex">
          <span class="text-lg font-medium mt-2 mr-3">{{ $t("dashboard.select_plate") }}</span>
            <TomSelect v-model="selected_plate" name="plate_selector" @change="onChange()" :options="{
              placeholder: 'Seleccionar Matrícula...',
            }" class="form-control w-full sm:w-56">
            <option :value="0">Todas</option>
            <option :value="vehicle.plate + ',' + vehicle.position.latitude + ',' + vehicle.position.longitude" v-for="vehicle in vehicles"
              :key="vehicle.plate">{{ vehicle.plate }}</option>
          </TomSelect>
        </div>
      </div>
    </div>
    <div class="intro-y box p-3">
      <GoogleMapLoader :init="init" class="report-maps bg-slate-200 rounded-md" />
    </div>
  </div>
  <!-- END: Vehicles Map -->
</template>

<script setup>
import { watch, computed, ref, toRaw, defineProps, VueElement } from "vue";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import { useDarkModeStore } from "@/stores/dark-mode";
import useVehicles from "@/composables/vehicles";
import { helper as $h } from "@/utils/helper";

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
let plates = [];

const { vehicles, getVehicles } = useVehicles();
const totalVehicles = ref(0);
const selected_plate = ref("");
const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);
const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);


//DEFINE CONSTANT TO SAVE BOUNDS
let latlngbounds;
let infoWindow;
const init = async (initializeMap) => {

  await getVehicles();

  const locations = vehicles.value;
  totalVehicles.value = computed(() => vehicles.value.length);

  const markers = JSON.parse(JSON.stringify(locations));
  console.log(markers);

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
    minWidth: 300,
    maxWidth: 400,
  });

  new MarkerClusterer(
    map,
    markers.map(function (markerElem) {
      const point = new google.maps.LatLng(
        parseFloat(markerElem.position.latitude),
        parseFloat(markerElem.position.longitude)
      );
      const lastDate = $h.toDate(markerElem.position.timestamp);
      const speed = $h.toKmsHour(markerElem.position.speed);
      const direction = $h.getDirection(markerElem.position.heading);
      const infowincontent = `
            <div class="font-medium">
              ${markerElem.plate}
            </div>
            <div class="mt-1 text-gray-600">
              <span class="font-medium mr-1">Conductor:</span> ${!markerElem.position.driver_name ? 'No existen datos.' : markerElem.position.driver_name} <br>
              <span class="font-medium mr-1">Latitud:</span> ${markerElem.position.latitude} <br>
              <span class="font-medium mr-1">Longitud:</span> ${markerElem.position.longitude}<br>
              <span class="font-medium mr-1">Posición GPS:</span>${!markerElem.position.gps_positioning ? 'No existen datos.' : markerElem.position.gps_positioning} <br>
              <span class="font-medium mr-1">Exactitud:</span> ${markerElem.position.accuracy} metros.<br>
              <span class="font-medium mr-1">Velocidad:</span> ${!speed ? 'No existen datos.' : speed} km/h.<br>
              <span class="font-medium mr-1">Dirección:</span>${!direction ? 'No existen datos.' : direction} <br><br>
              <span class="font-medium mr-1">Última actualización:</span>${!lastDate ? 'No existen datos.' : lastDate} <br>
            </div>`;
      const marker = new google.maps.Marker({
        map: map,
        position: point,
        id: markerElem.plate,
        icon: {
          url: !darkMode.value
            ? imageAssets["/src/assets/images/map-marker.svg"].default
            : imageAssets["/src/assets/images/map-marker-dark.svg"].default,
        },
      });

      //ADD CURRENT MARKER POSITION TO BOUNDS
      latlngbounds.extend(marker.position);

      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(infowincontent);
        google.maps.event.addListener(infoWindow, "domready", function () {
          cash(".arrow_box").closest(".gm-style-iw-d").removeAttr("style");
          cash(".arrow_box")
            .closest(".gm-style-iw-d")
            .attr("style", "overflow:visible");
          cash(".arrow_box")
            .closest(".gm-style-iw-d")
            .parent()
            .removeAttr("style");
        });

        infoWindow.open(map, marker);
        
      });
      plates.push(marker);
      return marker;
    }),
    {
      styles: [
        {
          width: 55,
          height: 55,
          textColor: "white",
          url: !darkMode.value
            ? imageAssets["/src/assets/images/map-marker-region.svg"].default
            : imageAssets["/src/assets/images/map-marker-region-dark.svg"]
              .default,
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
  map.setCenter(latlngbounds.getCenter());
  map.fitBounds(latlngbounds);

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
  controlButton.style.backgroundImage = "url('../../../src/assets/images/refresh.png')";
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
  controlButton.title = "Reiniciar el mapa";
  controlButton.type = "button";
  controlButton.addEventListener("click", () => {
    //BUTTON ON CLICK RESET MAP TO BOUNDS.
    if(infoWindow){
      infoWindow.close();
    }
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
  });
  return controlButton;
}

function onChange() {
  if(infoWindow){
      infoWindow.close();  
  }
  if(selected_plate.value == 0){
    mapa.setCenter(latlngbounds.getCenter());
    mapa.fitBounds(latlngbounds);
  }else{
    const ltlngArr = selected_plate.value.split(',');
    mapa.setCenter({lat:parseFloat(ltlngArr[1]), lng:parseFloat(ltlngArr[2])});


    plates.forEach(el => {
      if(ltlngArr[0] == el.id){
        google.maps.event.trigger(el, 'click');
      }
    });

    
  }
}

</script>
