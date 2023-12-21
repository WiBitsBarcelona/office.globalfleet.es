<template>

  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 intro-y">
      <h2 class="text-lg font-medium truncate mr-5">
        {{ $t("incidences.title") }} 
        <span class="text-xl font-bold">
        {{ useAuthentication.getUser?.employee.company.name }}
        </span>
      </h2>
    </div>
  </div>


  <div class="intro-y box p-5 mt-5" v-if="isAsyncDataLoaded">

    <IncidentButtons 
      :incidentDriverTotal="incidentDriverTotal" 
    />

    <DriversIncidences />

  </div>




</template>

<script setup>
import { ref, onMounted } from 'vue';
import IncidentButtons from '@/components/incidences/IncidentButtons.vue';
import DriversIncidences from "@/components/incidences/Drivers.vue";
import { useAuthenticationStore } from '@/stores/auth/authentications';

import useDriverIncident from "@/composables/driver_incidents";



const useAuthentication = useAuthenticationStore();

const incidentDriverTotal = ref(0);
const isAsyncDataLoaded = ref(false);



const { getDriverIncidents, driverIncidents } = useDriverIncident();





const findData = async() => {
  await getDriverIncidents();
  incidentDriverTotal.value = driverIncidents.value.length;
  isAsyncDataLoaded.value = true;
}

  

onMounted(async() => {
  await findData();
})




</script>
