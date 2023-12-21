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

    
    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <IncidentButtons />

        <TripsIncidences />

    </div>
    <!-- END: Page Layout -->
</template>

<script setup>
import IncidentButtons from '@/components/incidences/IncidentButtons.vue';
import TripsIncidences from "@/components/incidences/Trips.vue";
import { useAuthenticationStore } from '@/stores/auth/authentications';


const useAuthentication = useAuthenticationStore();


</script>

<style scoped>

</style>