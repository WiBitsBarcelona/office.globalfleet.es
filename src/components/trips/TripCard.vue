<template>
     
  <!-- DATA BEGINS -->
    <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary">
      <div class="grid">
        <div class="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
          <div class="rounded-md p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            <div class="grid grid-cols-6 mb-4 bg-gray-100 rounded-md p-1">
              <!-- edit -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <router-link :to="`trips/edit/${trip.id}`">
                    <Tippy tag="button" class="tooltip primary ml-4 mr-4" :content="edit_trip_tooltip" :options="{ theme: 'dark' }">
                      <CheckSquareIcon class="w-5 h-5 text-primary" />
                    </Tippy>
                  </router-link>
                </div>
              </div>
              <!-- view -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <Tippy tag="button" class="tooltip primary ml-4 mr-4" :content="view_trip_tooltip" :options="{ theme: 'dark' }">
                    <EyeIcon class="w-5 h-5 text-primary" @click="openTrip(trip.id)" />
                  </Tippy>
                </div>
              </div>
              <!-- delete -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <Tippy tag="button" class="tooltip primary ml-4 mr-4" :content="delete_trip_tooltip" :options="{ theme: 'dark' }">
                    <TrashIcon class="w-5 h-5 text-danger" @click="deleteTrip(trip.id)" /> 
                  </Tippy>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-6 bg-gray-100 rounded-md p-1">
              <!-- alert -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
              </div>
              <!-- message -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                  <p class="text-sm">-</p>
                </div> 
              </div>
              <!-- document -->
              <div class="col-span-2 gap-1">
                <div class="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
              </div>
            </div>
          </div>
          <!-- trip number-->
          <div class="rounded-md p-2 pb-1" :class="bg_trip">
            <h5 class="text-xs font-light text-gray-400">{{ $t("trip") }}</h5>
            <p class="text-xs font-normal leading-6 text-gray-500">{{ trip.reference_number }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("vehicle") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ trip.vehicle.plate }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("tow") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ tow_plate }}</p>
          </div>
          <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("driver") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ driver_name }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
            <p class="text-xs font-normal leading-6 text-gray-500">{{ captured_at }}</p>
          </div>
          <div class="grid grid-cols-2 justify-items-stretch gap-1">
            <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">Telem.</h5>
              <Tippy tag="button" class="tooltip primary ml-4 mr-2" :content="telematic_name" :options="{ theme: 'dark' }">
                <p class="text-md font-normal leading-6 text-gray-500">M</p>
              </Tippy>
            </div>
            <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("stages") }}</h5>
              <p class="text-md font-normal leading-6 text-gray-500">{{ stage_count }}</p>
            </div>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("trip_comm_status") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ trip.comm.name }}</p>
          </div>
          <div class="rounded-md p-2 pb-1" :class="bg_trip">
            <h5 class="text-xs font-light text-gray-400">{{ $t("trip_status") }}</h5>
            <p class="text-md font-bold leading-6 text-gray-500">{{ trip.status.name }}</p>
          </div>
          <div class="grid grid-cols-2 justify-items-stretch gap-1">
            <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("status") }}</h5>
              <Tippy tag="button" class="tooltip primary ml-4 mr-2" :content="speed_name" :options="{ theme: 'dark' }">
                <p class="text-md font-normal leading-6 text-gray-500">{{ speed_status }}</p>
              </Tippy>
            </div>
            <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("velocity_acrom") }}</h5>
              <p class="text-md font-normal leading-6 text-gray-500">{{ speed }}</p>
            </div>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}</h5>
            <p class="text-xs font-normal leading-6 text-gray-500">{{ execution_at }}</p>
          </div>
          <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("origin") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">
              {{ origin }}
            </p>
          </div>
          <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t("destination") }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">
              {{ destination }}
            </p>
          </div>
          <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t('gps_positioning') }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">
              {{ gps_positioning }}
            </p>
          </div>
          <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage') }}</h5>
            <p class="text-md font-normal uppercase leading-6 text-gray-500">
              {{ current_stage }}
            </p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_execution_at') }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ current_stage_execution_at }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_now') }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ current_stage_started_at }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_status') }}</h5>
            <p class="text-md font-normal leading-6 text-gray-500">{{ current_stage_status }}</p>
          </div>
          <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
            <h5 class="text-xs font-light text-gray-400">Km Etapa Siguiente</h5>
            <p class="text-md font-normal leading-6 text-gray-500">--</p>
          </div>
        </div>
      </div>
    </div>

  
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { helper as $h } from "@/utils/helper";
import { useI18n } from 'vue-i18n';
import enumTrip from '@/enums/enum_trip.js';
import { useRouter } from 'vue-router';


const { t } = useI18n();

const props = defineProps([
  'trip'
]);


const trip = ref('');
const bg_trip = ref('');
const driver_name = ref('');
const tow_plate = ref('-');
const stage_count = ref(0);
const origin = ref('');
const destination = ref('');


const speed = ref('');
const speed_status = ref('');
const speed_name = ref('');
const gps_positioning = ref('');

const current_stage = ref('--');
const current_stage_execution_at = ref('--');
const current_stage_now = ref('--');
const current_stage_status = ref('--');
const current_stage_started_at = ref('--');



const telematic_name = ref(t('tooltips.mobile'));
const edit_trip_tooltip = ref(t('tooltips.edit'));
const view_trip_tooltip = ref(t('tooltips.view'));
const delete_trip_tooltip = ref(t('tooltips.delete'));

const execution_at = ref('');
const captured_at = ref('');

const router = useRouter();





//trip.value = props.trip;
//console.log({ ...trip});




const openTrip = async (id) => {
  let route = router.resolve({ path: "/trip/" + id });     
  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=1000,height=800,left=50,top=50`;  
  window.open(route.href, '_blank', params);
}



const editTrip = async (id) => {
  console.log(id);
}


const deleteTrip = async (id) => {
  console.log(id);
}




watchEffect(() => {
  trip.value = props.trip;

  /**
   * Trip Status
   */
  if (trip.value.trip_status_id === enumTrip.TRIP_CREATED_ID || trip.value.trip_status_id === enumTrip.TRIP_ASSIGNED_ID) {
    bg_trip.value = 'bg-gray-100';

  }

  if (trip.value.trip_status_id === enumTrip.TRIP_PENDING_CONFIRMATION_ID ) {
    bg_trip.value = 'bg-orange-100';
  }

  if (trip.value.trip_status_id === enumTrip.TRIP_PENDING_TO_DO_ID) {
    bg_trip.value = 'bg-gray-100';
  }

  if (trip.value.trip_status_id === enumTrip.TRIP_PROGRESS_ID) {
    bg_trip.value = 'bg-blue-100';
  }

  if (trip.value.trip_status_id === enumTrip.TRIP_COMPLETED_ID) {
    bg_trip.value = 'bg-green-100';
  }


  driver_name.value = trip.value.driver.name + ' ' + trip.value.driver.surname;


  /**
   * Tows
   */
  if (trip.value.tows.length > 0) {
    tow_plate.value = trip.value.tows[0].tow.plate;
  }



  /**
   * Stages
   */
  let countStage = 0;
  if (trip.value.stages.length > 0) {



    let find = trip.value.stages.find(element => element.activity !== null);


    
    if(find){
      origin.value = find.name;
    }
    

    //destination.value = trip.value.stages[trip.value.stages.length - 1].name;
    trip.value.stages.forEach(element => {
      if (element.activity !== null) {
        destination.value = element.name;
        countStage++;
      }
    });

    let stageFind = trip.value.stages.find(stage => {
      return stage.activity != null && (stage.stage_status_id >= enumTrip.TRIP_CREATED_ID && stage.stage_status_id < enumTrip.TRIP_COMPLETED_ID);
    });

    let lastStageCompletedFind = trip.value.stages.findLast(stage => {
      return stage.activity != null && stage.stage_status_id === enumTrip.TRIP_COMPLETED_ID;
     });
    if (stageFind) {
      
      if(trip.value.trip_status_id === enumTrip.TRIP_PROGRESS_ID){
        current_stage.value = stageFind.name;
        current_stage_execution_at.value = $h.formatDate(stageFind.execution_at, 'DD/MM/YYYY HH:mm');
        current_stage_status.value = stageFind.status.name + ' ' + stageFind.activity.type.name;
        current_stage_now.value = $h.nowTimestamp();
        if(stageFind.started_at){
          current_stage_started_at.value = $h.formatDate(stageFind.started_at, 'DD/MM/YYYY HH:mm');
        }else{
          current_stage_started_at.value = '--';
        }
      }else{
          current_stage.value = '--';
          current_stage_execution_at.value = '--';
          current_stage_status.value = '--';
          current_stage_now.value = '--';
          current_stage_started_at.value = '--';
      }

    }else{
      if(lastStageCompletedFind){
        current_stage.value = lastStageCompletedFind.name;
        current_stage_execution_at.value = $h.formatDate(lastStageCompletedFind.execution_at, 'DD/MM/YYYY HH:mm');
        current_stage_status.value = lastStageCompletedFind.status.name + ' ' + lastStageCompletedFind.activity.type.name;
        current_stage_now.value = $h.nowTimestamp();
        if(lastStageCompletedFind.started_at){
          current_stage_started_at.value = $h.formatDate(lastStageCompletedFind.started_at, 'DD/MM/YYYY HH:mm');
        }else{
          current_stage_started_at.value = '--';
        }
      }
    }
  }

  stage_count.value = countStage;




  /**
   * Position
   */
  if (trip.value.driver.position) {
    
    let sp = $h.toKmsHour(trip.value.driver.position.speed);
    speed.value = sp;
    if (sp >= 5) {
      speed_status.value = 'C';
      speed_name.value = t('tooltips.driving');
    } else {
      speed_status.value = 'P';
      speed_name.value = t('tooltips.stopped');
    }
    gps_positioning.value = trip.value.driver.position.gps_positioning;
    captured_at.value = $h.formatDate(trip.value.driver.position.captured_at, 'DD/MM/YYYY HH:mm');
  }


  execution_at.value = $h.formatDate(trip.value.execution_at, 'DD/MM/YYYY HH:mm');


});


</script>


<style scoped>
</style>