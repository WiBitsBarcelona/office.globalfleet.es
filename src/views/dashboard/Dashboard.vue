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
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <NavigationIcon class="report-box__icon text-gray-500" />

                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{ trip_created_nb }}</div>
                <div class="text-base text-slate-500 mt-1">{{ $t("trip_created") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <NavigationIcon class="report-box__icon text-orange-300" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{ trip_pending_nb }}</div>
                <div class="text-base text-slate-500 mt-1">{{ $t("trip_pending") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <NavigationIcon class="report-box__icon text-blue-300" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{ trip_progress_nb }}</div>
                <div class="text-base text-slate-500 mt-1">
                  {{ $t("trip_progress") }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <NavigationIcon class="report-box__icon text-green-300" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">{{ trip_completed_nb }}</div>
                <div class="text-base text-slate-500 mt-1">
                  {{ $t("trip_completed") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- BEGIN: Vehicles Map -->
      <div class="col-span-12 xl:col-span-12 mt-6">
        <div class="intro-y block sm:flex items-center">
          <h2 class="text-lg font-medium truncate mr-5">{{ $t("dashboard.vehicles_title") }}</h2>
          <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
            <MapPinIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
            <input type="text" class="form-control sm:w-56 box pl-10" placeholder="Filtrar por matrícula" />
          </div>
        </div>
        <div class="intro-y box p-5 mt-12 sm:mt-5">
          <div>
            {{ $t("dashboard.vehicles_subtitle1") }} <span class="text-2xl text-primary dark:text-light">10 </span>{{
              $t("dashboard.vehicles_subtitle2") }}
          </div>
          <VehiclesMap class="report-maps mt-5 bg-slate-200 rounded-md" />
        </div>
      </div>
      <!-- END: Vehicles Map -->

      <!-- BEGIN: Footer Text -->
      <div class="col-span-12 mt-5 mb-1 text-center">
        <p class="text-slate-600 dark:text-slate-200">&copy; {{new Date().getFullYear()}} - GlobalFleet - {{ $t("auth_footer.all_rights") }}</p>
      </div>
    </div>
  </div>
  <!-- END: Page Layout -->
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import VehiclesMap from "@/components/vehicles-map/Main.vue";
  import useDashboard from '@/composables/dashboard.js';

  const {dashboard, getDashboard} = useDashboard();


  const trip_completed_nb = ref('');
  const trip_created_nb = ref('');
  const trip_pending_nb = ref('');
  const trip_progress_nb = ref('');

  



  onMounted(async() => {
    await getDashboard();
    //console.log("objjj", dashboard);

    console.log(dashboard.value.trip_completed_nb);

    trip_completed_nb.value = dashboard.value.trip_completed_nb;
    trip_created_nb.value = dashboard.value.trip_created_nb;
    trip_pending_nb.value = dashboard.value.trip_pending_nb;
    trip_progress_nb.value = dashboard.value.trip_progress_nb;



  });

</script>