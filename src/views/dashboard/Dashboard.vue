<template>
  <!-- BEGIN: Page Layout -->
  <div class="relative">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 mt-8">
        <div class="intro-y flex items-center h-10">
          <h2 class="text-lg font-medium truncate mr-5">{{ $t("dashboard.title") }}</h2>
          <a href="" class="ml-auto flex items-center text-primary dark:text-light">
            <RefreshCcwIcon class="w-4 h-4 mr-3" /> <span class="">{{ $t("dashboard.reload") }}</span>
          </a>
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5">
          <div class="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex align-middle">
                  <div class="text-3xl font-medium leading-8 text-gray-500">{{ trip_created_nb }}</div>
                  <div class="ml-auto">
                    <NavigationIcon class="report-box__icon text-gray-500" />
                  </div>
                </div>
                <div class="text-base text-slate-500 mt-3">{{ $t("trip_created") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex align-middle">
                  <div class="text-3xl font-medium leading-8 text-orange-300">{{ trip_pending_nb }}</div>
                  <div class="ml-auto">
                    <AlertCircleIcon class="report-box__icon text-orange-300" />
                  </div>
                </div>
                <div class="text-base text-slate-500 mt-3">{{ $t("trip_pending") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex align-middle">
                  <div class="text-3xl font-medium leading-8 text-blue-300">{{ trip_progress_nb }}</div>
                  <div class="ml-auto">
                    <ActivityIcon class="report-box__icon text-blue-300" />
                  </div>
                </div>
                <div class="text-base text-slate-500 mt-3">{{ $t("trip_progress") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-2 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex align-middle">
                  <div class="text-3xl font-medium leading-8 text-green-300">{{ trip_completed_nb }}</div>
                  <div class="ml-auto">
                    <CheckIcon class="report-box__icon text-green-300" />
                  </div>
                </div>
                <div class="text-base text-slate-500 mt-3">{{ $t("trip_completed") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-4 intro-y"></div>
        </div>
      </div>

      <!-- BEGIN: Vehicles Map -->
        <VehiclesMap />
      <!-- END: Vehicles Map -->
      <!-- BEGIN: Footer Text -->
      <div class="col-span-12 mt-5 mb-1 text-center">
        <p class="text-slate-600 dark:text-slate-200">&copy; {{ new Date().getFullYear() }} - GlobalFleet - {{
          $t("auth_footer.all_rights") }}</p>
      </div>
    </div>
  </div>
  <!-- END: Page Layout -->
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
//import VehiclesMap from "@/components/vehicles-map/Main.vue";
import VehiclesMap from "@/components/dashboard-map/Main.vue";
//import useVehicles from "@/composables/vehicles";
import useDashboard from '@/composables/dashboard.js';


const { dashboard, getDashboard } = useDashboard();

//const locations = ref('');

const trip_completed_nb = ref('');
const trip_created_nb = ref('');
const trip_pending_nb = ref('');
const trip_progress_nb = ref('');



const select = ref("");

//const { vehicles, getVehicles } = useVehicles();

//const totalVehicles = ref(0);


onMounted(async () => {
  await getDashboard();
  //await getVehicles();
  //totalVehicles.value = computed(() => vehicles.value.length);
  trip_completed_nb.value = dashboard.value.trip_completed_nb;
  trip_created_nb.value = dashboard.value.trip_created_nb;
  trip_pending_nb.value = dashboard.value.trip_pending_nb;
  trip_progress_nb.value = dashboard.value.trip_progress_nb;
  //locations.value = vehicles.value;
});

</script>