import { ref } from 'vue';
<template>
    <!-- DATA BEGINS -->
    <!-- Element 1 -->
    <!-- <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary">
        <div class="grid gap-y-8">
            <div
                class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
                <div
                    class="flex items-end gap-2 rounded-md bg-gray-100 p-2 pb-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                     alert 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                   message 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                     document 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                </div>
                <div class="rounded-md bg-blue-100 p-2 pb-1">
                    <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">2023056219</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">1234LMT</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">R1234BDB</p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Aitor Menta</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">01-06-23 09:13</p>
                </div>
                <div class="grid grid-cols-2 justify-items-stretch gap-1">
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">M</p>
                    </div>
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">2</p>
                    </div>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Confirmado</p>
                </div>
                <div class="rounded-md bg-blue-100 p-2 pb-1">
                    <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                    <p class="text-md font-bold leading-6 text-gray-500">En Curso</p>
                </div>
                <div class="grid grid-cols-2 justify-items-stretch gap-1">
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Status</h5>
                        <Tippy tag="button" class="tooltip primary ml-4 mr-2" content="Conduciendo"
                            :options="{ theme: 'dark' }">
                            <p class="text-md font-normal leading-6 text-gray-500">C</p>
                        </Tippy>
                    </div>
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Veloc.</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">78</p>
                    </div>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Tacógrafo Restante</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Origen</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        Zaragoza plaza <span class="font-bold"> (ES)</span>
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Destino</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        Hannover<span class="font-bold"> (DE)</span>
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        21 Km. SE Tours, Francia
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                    <p class="text-md font-normal uppercase leading-6 text-gray-500">
                        Descarga Hannover
                    </p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">01-06-23 18:15</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">F/H Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Status Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Pendiente R.</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Km Etapa Siguiente</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- DATA BEGINS -->
    <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
    >
          <div class="grid gap-y-8">
            <div
              class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12"
            >
              <div
                class="flex items-end gap-2 rounded-md bg-gray-100 p-2 pb-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              >
                <!-- alert -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
                <!-- message -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
                <!-- document -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
              </div>
              <!-- trip number-->
              <div class="rounded-md p-2 pb-1" :class="bg_trip">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500 ">{{ trip.reference_number }} - {{ trip.id }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("vehicle") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ trip.vehicle.plate }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("tow") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ tow_plate }}</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("driver") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ driver_name }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">-</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">-</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">{{ $t("stages") }}</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">{{ stage_count }}</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_comm_status") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ trip.comm.name }}</p>
              </div>


              <div class="rounded-md p-2 pb-1" :class="bg_trip">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_status") }}</h5>
                <p class="text-md font-bold leading-6 text-gray-500">{{ trip.status.name }}</p>
              </div>

              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">{{ $t("status") }}</h5>
                  <Tippy
                    tag="button"
                    class="tooltip primary ml-4 mr-2"
                    :content="speed_name"
                    :options="{ theme: 'dark' }"
                  >
                    <p class="text-md font-normal leading-6 text-gray-500">{{ speed_status }}</p>
                  </Tippy>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">{{ $t("velocity_acrom") }}</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">{{ speed }}</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("tacograf") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("origin") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ origin }}
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("destination") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ destination }}
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t('gps_positioning') }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ gps_positioning }}
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage') }}</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">
                  {{ current_stage }}
                </p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_execution_at') }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ current_stage_execution_at }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_now') }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{  current_stage_now }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t('current_stage_status') }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ current_stage_status }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Km Etapa Siguiente</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
            </div>
          </div>
        </div>

</template>

<script setup>
    import { ref } from 'vue';
    import { helper as $h } from "@/utils/helper";
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();  

    const props = defineProps([
        'trip',
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

    const current_stage = ref('');
    const current_stage_execution_at = ref('');
    const current_stage_now = ref('');
    const current_stage_status = ref('');

    



    trip.value = props.trip;

    //console.log({ ...trip});


    /**
     * Trip Status
     */
    if(trip.value.trip_status_id === 1 || trip.value.trip_status_id === 2){
      bg_trip.value = 'bg-gray-100';
    }

    if(trip.value.trip_status_id === 3 || trip.value.trip_status_id === 4){
      bg_trip.value = 'bg-orange-100';
    }

    if(trip.value.trip_status_id === 5){
      bg_trip.value = 'bg-blue-100';
    }

    if(trip.value.trip_status_id === 6){
      bg_trip.value = 'bg-green-100';
    }
    

    driver_name.value = trip.value.driver.name + ' ' + trip.value.driver.surname;


    /**
     * Tows
     */
    if(trip.value.tows.length > 0){
      tow_plate.value = trip.value.tows[0].tow.plate;
    }
   


    /**
     * Stages
     */
    let countStage = 0;
    if(trip.value.stages.length > 0){

        let find = trip.value.stages.find(element => element.activity !== null);
        origin.value = find.name;

        //destination.value = trip.value.stages[trip.value.stages.length - 1].name;
        trip.value.stages.forEach(element => {
          if(element.activity !== null){
            destination.value = element.name;
            countStage++;
          }
        });

        // let flag = false;
        // let ele;
        // trip.value.stages.forEach(element => {
        //   if(element.activity !== null && !flag){
        //     console.log(element.stage_status_id);
        //     if(parseInt(element.stage_status_id) >= 1 && parseInt(element.stage_status_id) < 6){
        //       ele = element;
        //       flag = true;
        //     }
        //   }
        // });
        // console.log(ele);

        let stageFind = trip.value.stages.find(stage => {
          return stage.activity != null && (stage.stage_status_id >= 1 && stage.stage_status_id < 6);
        });

        if(stageFind){
          current_stage.value = stageFind.name;
          current_stage_execution_at.value = stageFind.execution_at;
          current_stage_status.value = stageFind.status.name;
        }

        
        current_stage_now.value = $h.nowTimestamp();

    }

    stage_count.value = countStage;




    /**
     * Position
     */
    if(trip.value.driver.position){
      let sp = $h.toKmsHour(trip.value.driver.position.speed);
      speed.value = sp;
      if(sp >= 5){
        speed_status.value = 'C';
        speed_name.value = t('driving');
      }else{
        speed_status.value = 'P';
        speed_name.value = t('stopped');
      }
      gps_positioning.value = trip.value.driver.position.gps_positioning;
    }


</script>

<style scoped>

</style>