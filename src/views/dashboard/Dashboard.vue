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
                  <NavigationIcon class="report-box__icon text-primary" />

                </div>
                <div class="text-3xl font-medium leading-8 mt-6">1</div>
                <div class="text-base text-slate-500 mt-1">{{ $t("dashboard.new_trips") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <AlertTriangleIcon class="report-box__icon text-pending" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">1</div>
                <div class="text-base text-slate-500 mt-1">{{ $t("dashboard.new_warnings") }}</div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <MessageCircleIcon class="report-box__icon text-primary" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">5</div>
                <div class="text-base text-slate-500 mt-1">
                  {{ $t("dashboard.new_chats") }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div class="report-box zoom-in">
              <div class="box p-5">
                <div class="flex">
                  <FileTextIcon class="report-box__icon text-primary" />
                </div>
                <div class="text-3xl font-medium leading-8 mt-6">1</div>
                <div class="text-base text-slate-500 mt-1">
                  {{ $t("dashboard.new_docs") }}
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
            <div class="inline-flex">
              <span class="text-lg font-medium mt-2 mr-3">Seleccionar Matrícula:</span>
              <TomSelect v-model="select" :options="{
                  placeholder: 'Seleccionar Matrícula...',

                }" class="form-control w-full sm:w-56">
                <option :value="0">Todas</option>
                <option :value="vehicle.position.latitude + ',' + vehicle.position.longitude" v-for="vehicle in vehicles" :key="vehicle">{{ vehicle.plate }}</option>
              </TomSelect>
            </div>
          </div>
        </div>
        <div class="intro-y box p-5 mt-12 sm:mt-5">
          <div>
            {{ $t("dashboard.vehicles_subtitle1") }} <span class="text-2xl text-primary dark:text-light">{{ totalVehicles
            }} </span>{{
  $t("dashboard.vehicles_subtitle2") }}
          </div>
          <withDirectives>
            <VehiclesMap class="report-maps mt-5 bg-slate-200 rounded-md" />
          </withDirectives>
        </div>
      </div>
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
//import ReportPieChart from "@/components/report-pie-chart/Main.vue";
import { computed } from 'vue';
import VehiclesMap from "@/components/vehicles-map/Main.vue";
import useVehicles from "@/composables/vehicles";
import { ref } from "vue";

const select = ref("");

const { vehicles, getVehicles } = useVehicles();

const totalVehicles = ref(0);

const findData = async () => {
  await getVehicles();
  console.log({ ...vehicles });
  totalVehicles.value = computed(() => vehicles.value.length);
  console.log(totalVehicles.value);
  
}

findData();





</script>