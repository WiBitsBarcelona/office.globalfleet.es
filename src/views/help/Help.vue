<template>
    

     <!-- HEADER -->
     <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
        {{ $t("help") }}
    </h2>

    <!-- BEGIN: Page Layout -->
    <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 lg:col-span-3 2xl:col-span-2">
      <!-- BEGIN: File Manager Menu -->
      <div class="intro-x box p-5">
        <div class="mt-1">
          <a
            href="#"
            class="flex items-center px-3 py-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : welcomeActive == 1, 'hover:font-medium hover:ml-2' : welcomeActive == 0}"
            @click="selectPage('welcome')"
          >
            <HandIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.welcome") }}
          </a>
          <a
            href="#"
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : homeActive == 1, 'hover:font-medium hover:ml-2' : homeActive == 0}"
            @click="selectPage('home')"
          >
            <HomeIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.home") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : tripsActive == 1, 'hover:font-medium hover:ml-2' : tripsActive == 0}"
            @click="selectPage('trips')"
          >
            <NavigationIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.trips") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : tripDetailsActive == 1, 'hover:font-medium hover:ml-2' : tripDetailsActive == 0}"
            @click="selectPage('tripDetails')"
            >
            <LocateIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.trip_details") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : devicesActive == 1, 'hover:font-medium hover:ml-2' : devicesActive == 0}"
            @click="selectPage('devices')"
            >
            <CastIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.devices") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : deviceHistoryActive == 1, 'hover:font-medium hover:ml-2' : deviceHistoryActive == 0}"
            @click="selectPage('deviceHistory')"
            >
            <ClockIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.devices_history") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : documentsActive == 1, 'hover:font-medium hover:ml-2' : documentsActive == 0}"
            @click="selectPage('documents')"
            >
            <FilesIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.general_documents") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : incidencesActive == 1, 'hover:font-medium hover:ml-2' : incidencesActive == 0}"
            @click="selectPage('incidences')"
            >
            <AlertTriangleIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.incidences") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : messagesActive == 1, 'hover:font-medium hover:ml-2' : messagesActive == 0}"
            @click="selectPage('messages')"
            >
            <MessageCircleIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.messages") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : usersActive == 1, 'hover:font-medium hover:ml-2' : usersActive == 0}"
            @click="selectPage('users')"
          >
            <UsersIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.users") }}
          </a>
          <a 
            href="#" 
            class="flex items-center px-3 py-2 mt-2 rounded-md"
            :class="{ 'bg-primary text-white font-medium' : driversActive == 1, 'hover:font-medium hover:ml-2' : driversActive == 0}"
            @click="selectPage('drivers')"
            >
            <TruckIcon class="w-4 h-4 mr-2" /> {{ $t("help_screen.menu.drivers") }}
          </a>
        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
      <Welcome v-if="welcomeActive == 1"/>
      <Home v-if="homeActive == 1"/>
      <Trips v-if="tripsActive == 1"/>
      <TripDetails v-if="tripDetailsActive == 1"/>
      <Devices v-if="devicesActive == 1"/>
      <DevicesHistory v-if="deviceHistoryActive == 1"/>
      <Documents v-if="documentsActive == 1"/>
      <Incidences v-if="incidencesActive == 1"/>
      <Messages v-if="messagesActive == 1"/>
      <Users v-if="usersActive == 1"/>
      <Drivers v-if="driversActive == 1"/>
    </div>
  </div>
    <!-- END: Page Layout -->
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import { useI18n } from "vue-i18n";
    import Welcome from "@/components/help/Welcome.vue";
    import Home from "@/components/help/Home.vue";
    import Trips from "@/components/help/Trips.vue";
    import TripDetails from "@/components/help/TripDetails.vue";
    import Devices from "@/components/help/Devices.vue";
    import DevicesHistory from "@/components/help/DevicesHistory.vue";
    import Documents from "@/components/help/Documents.vue";
    import Incidences from "@/components/help/Incidences.vue";
    import Messages from "@/components/help/Messages.vue";
    import Users from "@/components/help/Users.vue";
    import Drivers from "@/components/help/Drivers.vue";

    const { t } = useI18n();
    const welcomeActive = ref(1);
    const homeActive = ref(0);
    const tripsActive = ref(0);
    const tripDetailsActive = ref(0);
    const devicesActive = ref(0);
    const deviceHistoryActive = ref(0);
    const documentsActive = ref(0);
    const incidencesActive = ref(0);
    const messagesActive = ref(0);
    const usersActive = ref(0);
    const driversActive = ref(0);

    const selectPage = async(page) => { 
      switch(page){
        case 'welcome':
          welcomeActive.value = 1;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'home':
          welcomeActive.value = 0;
          homeActive.value = 1;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'trips':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 1;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'tripDetails':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 1;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'devices':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 1;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'deviceHistory':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 1;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'documents':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 1;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'incidences':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 1;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'messages':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 1;
          usersActive.value = 0;
          driversActive.value = 0;
          break;
        case 'users':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 1;
          driversActive.value = 0;
          break;
        case 'drivers':
          welcomeActive.value = 0;
          homeActive.value = 0;
          tripsActive.value = 0;
          tripDetailsActive.value = 0;
          devicesActive.value = 0;
          deviceHistoryActive.value = 0;
          documentsActive.value = 0;
          incidencesActive.value = 0;
          messagesActive.value = 0;
          usersActive.value = 0;
          driversActive.value = 1;
          break;
      }
    }

  </script>