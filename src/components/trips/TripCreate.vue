<template>
  <!-- HEADER -->
  <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
    {{ $t("create") }}
  </h2>

  <Preloader v-if="loading" />


  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5" v-if="isCreateTrip">
    <!-- BEGIN: Form -->
    <form class="validate-form" @submit.prevent="save">

      <div class="grid grid-cols-12 gap-1 mb-8">

        <div class="col-span-8">
          <h2 class="text-lg font-medium">
            {{ $t("trip") }}
          </h2>
        </div>

        <!-- BEGIN: Buttons -->

        <div class="col-span-4 text-right">
          <button type="submit" class="btn btn-primary mr-2">
            {{ $t("save") }}
          </button>
          <router-link :to="`/trips`" class="btn btn-danger">{{ $t("cancel") }}</router-link>
        </div>

        <!-- END: Buttons -->

      </div>



      <!-- BEGIN: container -->
      <div class="grid grid-cols-12 gap-6">

        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="name" class="form-label w-full">
              {{ $t("name") }}
            </label>
            <input v-model.trim="validate.name.$model" id="name" type="text" name="name" class="form-control"
              :class="{ 'border-danger': validate.name.$error }" />
            <template v-if="validate.name.$error">
              <div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>


        <div class="col-span-12 md:col-span-6 lg:col-span-5">
          <div class="input-form">
            <label for="reference_number" class="form-label w-full">
              {{ $t("reference_number") }}
            </label>
            <input v-model.trim="validate.reference_number.$model" id="reference_number" type="text"
              name="reference_number" class="form-control"
              :class="{ 'border-danger': validate.reference_number.$error }" />
            <template v-if="validate.reference_number.$error">
              <div v-for="(error, index) in validate.reference_number.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>

        <div class="col-span-12 md:col-span-6 lg:col-span-3">
          <div class="input-form">
            <label for="execution_at" class="form-label w-full">
              {{ $t("execution_at") }}
            </label>
            <input v-model.trim="validate.execution_at.$model" id="execution_at" type="datetime-local" name="execution_at"
              class="form-control" :class="{ 'border-danger': validate.execution_at.$error }" />
            <template v-if="validate.execution_at.$error">
              <div v-for="(error, index) in validate.execution_at.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>


        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="trip_priority_id" class="form-label w-full">
              {{ $t("trip_priority") }}
            </label>
            <TomSelect v-model.trim="validate.trip_priority_id.$model" id="trip_priority_id" name="trip_priority_id"
              :options="{
                placeholder: $t('message.select'),
              }" class="form-control w-full" :class="{ 'border-danger': validate.trip_priority_id.$error }">

              <option v-for="item in selectTripPriorities" :value="item.id">
                {{ item.name }}
              </option>

            </TomSelect>

            <template v-if="validate.trip_priority_id.$error">
              <div v-for="(error, index) in validate.trip_priority_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>


        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="vehicle_id" class="form-label w-full">
              {{ $t("vehicle") }}
            </label>

            <TomSelect v-model.trim="validate.vehicle_id.$model" id="vehicle_id" name="vehicle_id" :options="{
              placeholder: $t('message.select'),
            }" class="form-control w-full" :class="{ 'border-danger': validate.vehicle_id.$error }">

              <option v-for="item in selectVehicles" :value="item.id">
                {{ item.plate }}
              </option>

            </TomSelect>

            <template v-if="validate.vehicle_id.$error">
              <div v-for="(error, index) in validate.vehicle_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>



        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="driver_id" class="form-label w-full">
              {{ $t("driver") }}
            </label>

            <TomSelect v-model.trim="validate.driver_id.$model" id="driver_id" name="driver_id" :options="{
              placeholder: $t('message.select'),
            }" class="form-control w-full" :class="{ 'border-danger': validate.driver_id.$error }">

              <option v-for="item in selectDrivers" :value="item.id">
                {{ item.name }} {{ item.surname }}
              </option>

            </TomSelect>


            <template v-if="validate.driver_id.$error">
              <div v-for="(error, index) in validate.driver_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>


        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="driver_id" class="form-label w-full">
              {{ $t("trip_tow") }}
            </label>

            <TomSelect v-model.trim="validate.tow_id.$model" id="tow_id" name="tow_id" :options="{
              placeholder: $t('message.select'),
            }" class="form-control w-full" :class="{ 'border-danger': validate.tow_id.$error }">

              <option v-for="item in selectTows" :value="item.id">
                {{ item.name }} {{ item.plate }}
              </option>

            </TomSelect>


            <template v-if="validate.tow_id.$error">
              <div v-for="(error, index) in validate.tow_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>




        <div class="col-span-12 md:col-span-6 lg:col-span-8">
          <div class="input-form">
            <label for="observations" class="form-label w-full">
              {{ $t("observations") }}
            </label>

            <textarea v-model.trim="validate.observations.$model" id="observations" name="observations"
              class="form-control">
            </textarea>

          </div>
        </div>


      </div>
      <!-- END: container -->

    </form>
    <!-- END: Form -->



    <div class="grid grid-cols-12 gap-1 mt-10 mb-10">
      <div class="col-span-12 md:col-span-12 lg:col-span-12 text-end">

        <a href="#" class="btn btn-outline border-slate-200 w-1/2 sm:w-auto mr-2" @click="showActionStageForm">
          <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_action_stage") }}
        </a>

        <a href="#" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2" @click="showStageForm">
          <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_stage") }}
        </a>

      </div>
    </div>


    <!-- Stage Card -->
    <div v-for="stage in arrStages" :key="stage.id">
      <!-- v-if -->
      <div v-if="stage.activity_type_id"> <!-- class="p-4 rounded border border-slate-200 text-slate-500 shadow mb-2" -->

        <!-- Stage -->
        <div class="relative">
          <div class="md:flex items-center md:space-x-4 mb-3">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
              </div>
            </div>

            <div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-full">
              <div class="grid grid-cols-6 gap-2 mb-5 pb-2">
                <div class="col-span-6">
                  <div class="flex flex-row justify-between">

                    <p class="text-md font-normal leading-6 text-gray-500">
                      <span class="text-xs font-light text-gray-400">{{ $t("stage") }}
                      </span> {{ stage.name }}
                    </p>

                    <div class="text-right">
                      <a href="#" @click.prevent="showTaskForm(stage)"
                        class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
                        <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_task") }}
                      </a>
                      <a href="#" @click.prevent="deleteStageForm(stage.uuid)"
                        class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
                        <TrashIcon class="w-4 h-4" />
                      </a>
                    </div>

                  </div>

                </div>

                <div class="col-span-1">
                  <h5 class="text-xs font-light text-gray-400">{{ $t("reference_number") }}:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ stage.reference_number }}
                  </p>
                </div>

                <div class="col-span-1">
                  <h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ stage.activity_type_name }}
                  </p>
                </div>

                <div class="col-span-1">
                  <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ stage.stage_type_name }}
                  </p>
                </div>

                <div class="col-span-1">
                  <h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ stage.client_name }}
                  </p>
                </div>
                <div class="col-span-1">
                  <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ stage.execution_at }}
                  </p>
                </div>
              </div>


              <!-- Tasks -->
              <div v-for="task in stage.tasks" :key="task.id">

                <div
                  class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.20rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

                  <div class="relative">
                    <div class="md:flex items-center md:space-x-4 mb-3">
                      <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                        <div
                          class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                        </div>
                      </div>
                      <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
                        <div class="grid grid-cols-4 gap-2 mb-5pb-2">

                          <div class="col-span-4">

                            <div class="flex flex-row justify-between">

                              <p class="text-md font-normal leading-6 text-gray-500 mt-2"><span
                                  class="text-xs font-light text-gray-400">{{ $t("task") }}:
                                </span>
                                {{ task.name }}
                              </p>

                              <div class="col-span-12 text-right">
                                <a href="#" @click.prevent="showActionTaskForm(stage, task)"
                                  class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
                                  <PlusCircleIcon class="w-4 h-4" /> {{ t("add_action_task") }}
                                </a>
                                <a href="#" @click.prevent="deleteTaskForm(stage.uuid, task.uuid)"
                                  class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
                                  <TrashIcon class="w-4 h-4" />
                                </a>
                              </div>

                            </div>

                          </div>



                          <!-- Action Tasks -->
                          <div v-for="action_task in task.action_tasks" :key="action_task.id">

                            <div class="grid grid-cols-6 gap-2">

                              <div class="col-span-3">
                                <h5 class="text-xs font-light text-gray-400">{{ $t("action") }}:</h5>
                                <p class="text-xs font-normal leading-6 text-gray-500">
                                  {{ action_task.action_type_name }}
                                </p>
                              </div>



                              <!-- Action Cameras -->
                              <div v-if="parseInt(action_task.action_type_model) === enumActionTask.CAMERA_ID">
                                <div v-for="camera in action_task.cameras" :key="camera.id">

                                  <div class="col-span-2">
                                    <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                    <p class="text-xs font-normal leading-6 text-gray-500">
                                      {{ camera.name }}
                                    </p>
                                  </div>

                                </div>
                              </div>
                              <!-- End of Action Cameras -->



                              <!-- Action Scanner -->
                              <div v-if="parseInt(action_task.action_type_model) === enumActionTask.SCANNER_ID">
                                <div v-for="scanner in action_task.scanners" :key="scanner.id">


                                  <div class="col-span-3">
                                    <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                    <p class="text-xs font-normal leading-6 text-gray-500">
                                      {{ scanner.name }}
                                    </p>
                                  </div>

                                </div>
                              </div>
                              <!-- End of Action Scanner -->




                              <!-- Action Scanner -->
                              <div v-if="parseInt(action_task.action_type_model) === enumActionTask.FORM_ID">
                                <div v-for="form in action_task.forms" :key="form.id">


                                  <div class="col-span-3">
                                    <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                    <p class="text-xs font-normal leading-6 text-gray-500">
                                      {{ form.name }}
                                    </p>
                                  </div>

                                  <div class="col-span-3">
                                    <h5 class="text-xs font-light text-gray-400">{{ $t("name") }}:</h5>
                                    <p class="text-xs font-normal leading-6 text-gray-500">
                                      {{ form.action_form_field_name }}
                                    </p>
                                  </div>

                                </div>
                              </div>
                              <!-- End of Action Scanner -->


                            </div>
                          </div>

                        </div>
                        <!-- End Action Tasks -->

                      </div>
                    </div><!-- Card -->
                  </div>
                </div>
              </div>

              <!-- End Task 1 Stage 1 -->


            </div>

          </div>

        </div>
        <!-- End Stage -->

      </div>



      <!-- v-else -->
      <div v-else>


        <!-- Action Stages -->
        <div v-for="action_stage in stage.action_stages" :key="action_stage.id">

          <div class="relative">
            <div class="md:flex items-center md:space-x-4 mb-3">
              <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                </div>
              </div>

              <div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-3/4">
                <div class="grid grid-cols-6 gap-2 mb-5 pb-2">

                  <div class="col-span-6">
                    <div class="flex flex-row justify-between">

                      <p class="text-md font-normal leading-6 text-gray-500">
                        <span class="text-xs font-light text-gray-400">{{ $t("action") }}
                        </span> {{ action_stage.action_type_name }}
                      </p>

                      <div class="text-right">
                        <a href="#" @click.prevent="deleteStageForm(stage.uuid)"
                          class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
                          <TrashIcon class="w-4 h-4" />
                        </a>
                      </div>

                    </div>

                  </div>





                  <!-- Action Cameras -->
                  <div v-if="parseInt(action_stage.action_type_model) === enumActionTask.CAMERA_ID">
                    <div v-for="camera in action_stage.cameras" :key="camera.id">

                      <div class="col-span-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ camera.name }}
                        </p>
                      </div>

                    </div>
                  </div>
                  <!-- End of Action Cameras -->



                  <!-- Action Scanner -->
                  <div v-if="parseInt(action_stage.action_type_model) === enumActionTask.SCANNER_ID">
                    <div v-for="scanner in action_stage.scanners" :key="scanner.id">


                      <div class="col-span-3">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ scanner.name }}
                        </p>
                      </div>

                    </div>
                  </div>
                  <!-- End of Action Scanner -->




                  <!-- Action Scanner -->
                  <div v-if="parseInt(action_stage.action_type_model) === enumActionTask.FORM_ID">
                    <div v-for="form in action_stage.forms" :key="form.id">


                      <div class="col-span-3">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ form.name }}
                        </p>
                      </div>

                      <div class="col-span-3">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("name") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ form.action_form_field_name }}
                        </p>
                      </div>

                    </div>
                  </div>
                  <!-- End of Action Scanner -->

                </div>
                <!-- End <div class="grid grid-cols-6 gap-2 mb-5 pb-2"> -->
              </div>
            </div>
          </div>
          <!-- End relative -->
        </div>
        <!-- End Action Stages -->

      </div>
      <!-- End v-else -->

    </div>
    
  </div>
  <!-- End of Stage Card -->






  <div class="intro-y box p-5 mt-5" v-if="isCreateStage">
    <StageCreate @cancelStageForm="cancelStageForm" @addStageForm="addStageForm" :arrStages="arrStages" />
  </div>



  <div class="intro-y box p-5 mt-5" v-if="isCreateTask">
    <TaskCreate :stageIndex="stageIndex" @cancelTaskForm="cancelTaskForm" @addTaskForm="addTaskForm" />
  </div>




  <div class="intro-y box p-5 mt-5" v-if="isCreateActionTask">
    <ActionTaskCreate :stageIndex="stageIndex" :taskIndex="taskIndex" @cancelActionTaskForm="cancelActionTaskForm"
      @addActionTaskForm="addActionTaskForm" />
  </div>




  <div class="intro-y box p-5 mt-5" v-if="isCreateActionStage">
    <ActionStageCreate @cancelActionStageForm="cancelActionStageForm" @addActionStageForm="addActionStageForm"
      :arrStages="arrStages" />
  </div>
</template>


<script setup>

import { onMounted, reactive, toRefs, ref } from 'vue';
import Preloader from '@/components/preloader/Preloader.vue';


import { Toast } from '@/utils/toast';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";

import useTrips from '@/composables/trips.js';
import useStage from '@/composables/stages.js';
import useActivity from '@/composables/activities.js';
import useTask from '@/composables/tasks.js';
import useActionTask from '@/composables/action_tasks.js';

import useActionTaskCamera from '@/composables/action_task_cameras.js';
import useActionTaskScanner from '@/composables/action_task_scanners.js';
import useActionTaskForm from '@/composables/action_task_forms.js';


import useActionStage from '@/composables/action_stages.js';
import useActionStageCamera from '@/composables/action_stage_cameras.js';
import useActionStageScanner from '@/composables/action_stage_scanners.js';
import useActionStageForm from '@/composables/action_stage_forms.js';




import useVehicles from '@/composables/vehicles.js';
import useTripPriority from '@/composables/trip_priorities.js';
import useDrivers from '@/composables/drivers.js';
import useTow from '@/composables/tows.js';
import useTripTow from '@/composables/trip_tows.js';



import StageCreate from '@/components/stages/StageCreate.vue';
import TaskCreate from '@/components/tasks/TaskCreate.vue';
import ActionTaskCreate from '@/components/action_tasks/ActionTaskCreate.vue';
import ActionStageCreate from '@/components/action_stages/ActionStageCreate.vue';


import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';


import enumActionTask from '@/enums/enum_action_task.js';



const loading = ref(false);



const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();
const { tows, getTows } = useTow();


const { trip, tripErrors, storeTrip } = useTrips();
const { stage, stageErrors, storeStage } = useStage();
const { activity, activityErrors, storeActivity } = useActivity();
const { task, taskErrors, storeTask } = useTask();
const { actionTask, actionTaskErrors, storeActionTask } = useActionTask();
const { actionTaskCamera, actionTaskCameraErrors, storeActionTaskCamera } = useActionTaskCamera();
const { actionTaskScanner, actionTaskScannerErrors, storeActionTaskScanner } = useActionTaskScanner();
const { actionTaskForm, actionTaskFormErrors, storeActionTaskForm } = useActionTaskForm();


const { actionStage, actionStageErrors, storeActionStage } = useActionStage();
const { actionStageCamera, actionStageCameraErrors, storeActionStageCamera } = useActionStageCamera();
const { actionStageScanner, actionStageScannerErrors, storeActionStageScanner } = useActionStageScanner();
const { actionStageForm, actionStageFormErrors, storeActionStageForm } = useActionStageForm();

const { tripTow, errorTripTow, storeTripTow } = useTripTow();



const { t } = useI18n();


const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);
const selectTows = ref([]);


const arrStages = ref([]);


const isCreateTrip = ref(true);
const isCreateStage = ref(false);
const isCreateTask = ref(false);
const isCreateActionTask = ref(false);
const isCreateActionStage = ref(false);


const stageIndex = ref();
const taskIndex = ref();


let activityObj;
let actionTaskCameraObj;
let actionTaskScannerObj;
let actionTaskFormObj;

let actionStageCameraObj;
let actionStageScannerObj;
let actionStageFormObj;




const rules = {
  vehicle_id: {
    required: helpers.withMessage(t("form.required"), required),
  },
  trip_priority_id: {
    required: helpers.withMessage(t("form.required"), required),
  },
  driver_id: {
    required: helpers.withMessage(t("form.required"), required),
  },
  tow_id: {
    required: helpers.withMessage(t("form.required"), required),
  },
  reference_number: {
    required: helpers.withMessage(t("form.required"), required),
  },
  name: {
    required: helpers.withMessage(t("form.required"), required),
  },
  execution_at: {
    required: helpers.withMessage(t("form.required"), required),
  },
  observations: {
  },
};



// const formData = reactive({
//   vehicle_id: "",
//   trip_priority_id: "",
//   driver_id: "",
//   tow_id: "",
//   reference_number: Math.floor(Math.random() * 100000),
//   name: "Viaje Plaza",
//   execution_at: $h.nowTimestamp('-').substr(0, 16),
//   observations: "",
// });



const formData = reactive({
  vehicle_id: "",
  trip_priority_id: "",
  driver_id: "",
  tows_id: "",
  reference_number: "",
  name: "",
  execution_at: $h.nowTimestamp('-').substr(0, 16),
  observations: "",
});


const validate = useVuelidate(rules, toRefs(formData));

const save = async () => {


  validate.value.$touch();
  if (validate.value.$invalid) {
    //TODO
  } else {


    if(arrStages.value.length <= 0){
      Swal.fire({
					icon: 'warning',
					title: t("message.it_must_have_action_stage"),
					showCancelButton: false,
					confirmButtonText: t("message.ok"),
					confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
				});
        return;
    }

    //Validacion sobre los stage


    loading.value = true;

    console.log("envia a guardar");


    /**
     * Trip
     */
    await storeTrip(formData);
    console.log({ ...trip.value });
    console.log(tripErrors);




    /**
     * Trip tows
     */
    const dataTripTow = {
      trip_id: trip.value.id,
      tow_id: formData.tow_id
    }
    await storeTripTow(dataTripTow);
    console.log({...tripTow});




    /**
     * Stages
     */
     for (const eleStage of arrStages.value) {
    //arrStages.value.forEach(async (eleStage) => {

      console.log(eleStage.name);

      stage.value = [];

      eleStage.trip_id = trip.value.id;
      
      await storeStage(eleStage);
      
      console.log({ ...stage.value });






      /**
       * Activity
       */
      if (eleStage.activity_type_id) {

        activityObj = {
          stage_id: stage.value.id,
          activity_type_id: eleStage.activity_type_id
        }

        await storeActivity(activityObj);
        console.log({ ...activity.value });

      }




      /**
      * Action Stages
      */
      if (eleStage.action_stages) {
        for (const eleActionStage of eleStage.action_stages){

          eleActionStage.stage_id = stage.value.id;

          await storeActionStage(eleActionStage);
          console.log({ ...actionStage.value });


          /**
           *  Action stage cameras
           */
          if (eleActionStage.cameras) {

            actionStageCameraObj = {
              action_stage_id: actionStage.value.id
            }

            await storeActionStageCamera(actionStageCameraObj);
            console.log({ ...actionStageCamera.value });

          }


          /**
           * Action stage scanners
           */
          if (eleActionStage.scanners) {

            actionStageScannerObj = {
              action_stage_id: actionStage.value.id
            }

            await storeActionStageScanner(actionStageScannerObj);
            console.log({ ...actionStageScanner.value });

          }


          /**
           * Action stage forms
           */
          if (eleActionStage.forms) {

            actionStageFormObj = {
              action_stage_id: actionStage.value.id,
              action_form_field_id: eleActionStage.action_form_field_id,
            }

            await storeActionStageForm(actionStageFormObj);
            console.log({ ...actionStageForm.value });

          }


        };
      }




      /**
       * Tasks
       */
      if (eleStage.tasks) {
        for (const eleTask of eleStage.tasks){


          eleTask.stage_id = stage.value.id;

          await storeTask(eleTask);
          console.log({ ...task.value });



          /**
           * Action Tasks
           */
          if (eleTask.action_tasks) {
            for (const eleActionTask of eleTask.action_tasks){

              eleActionTask.task_id = task.value.id;
              await storeActionTask(eleActionTask);
              console.log({ ...actionTask.value });


              /**
               *  Action task cameras
               */
              if (eleActionTask.cameras) {

                actionTaskCameraObj = {
                  action_task_id: actionTask.value.id
                }

                await storeActionTaskCamera(actionTaskCameraObj);
                console.log({ ...actionTaskCamera.value });

              }


              /**
               * Action task scanners
               */
              if (eleActionTask.scanners) {

                actionTaskScannerObj = {
                  action_task_id: actionTask.value.id
                }

                await storeActionTaskScanner(actionTaskScannerObj);
                console.log({ ...actionTaskScanner.value });

              }


              /**
               * Action task forms
               */
              if (eleActionTask.forms) {

                actionTaskFormObj = {
                  action_task_id: actionTask.value.id,
                  action_form_field_id: eleActionTask.action_form_field_id,
                }

                await storeActionTaskForm(actionTaskFormObj);
                console.log({ ...actionTaskForm.value });

              }
              
            };

          }
        };
      }



    };

    loading.value = false;
    await Toast(t("message.record_saved"), 'success');
    setTimeout(() => location.reload(), 3000);

  }
};












/**
 * Stage
 */
const showStageForm = () => {
  isCreateTrip.value = false;
  isCreateStage.value = true;
  console.log({ ...arrStages.value });
}

const cancelStageForm = () => {
  isCreateTrip.value = true;
  isCreateStage.value = false;
}

const addStageForm = async (stage) => {

  arrStages.value.push(stage);

  isCreateTrip.value = true;
  isCreateStage.value = false;
}

const deleteStageForm = (uuid) => {
  arrStages.value.forEach((ele, index) => {
    if (ele.uuid === uuid) {
      arrStages.value.splice(index, 1);
    }
  });
}

/**
 * End Stage
 */




/**
 * Task
 */

const showTaskForm = (stage) => {
  isCreateTrip.value = false;
  isCreateTask.value = true;
  stageIndex.value = { ...stage };
}



const cancelTaskForm = () => {
  isCreateTrip.value = true;
  isCreateTask.value = false;
}



const addTaskForm = (stage, data) => {
  arrStages.value.forEach(el => {
    if (el.uuid === stage.uuid) {
      if (el.tasks === undefined) {
        el.tasks = [];
        el.tasks.push(data);
      } else {
        el.tasks.push(data);
      }
    }
  });

  isCreateTrip.value = true;
  isCreateTask.value = false;
}

const deleteTaskForm = (stageUuid, taskUuid) => {

  arrStages.value.forEach((stage) => {

    if (stage.uuid === stageUuid) {

      stage.tasks.forEach((task, index) => {

        if (task.uuid === taskUuid) {
          stage.tasks.splice(index, 1);
        }

      });
    }

  });

}

/**
 * End Task
 */





/**
 * Action Task
 */

const showActionTaskForm = (stage, task) => {
  isCreateTrip.value = false;
  isCreateActionTask.value = true;
  stageIndex.value = { ...stage };
  taskIndex.value = { ...task };
}



const cancelActionTaskForm = () => {
  isCreateTrip.value = true;
  isCreateActionTask.value = false;
}



const addActionTaskForm = (stage, task, data) => {

  arrStages.value.forEach(st => {
    if (st.uuid === stage.uuid) {
      st.tasks.forEach(t => {

        if (t.uuid === task.uuid) {
          if (t.action_tasks === undefined) {

            let dataNew = addActionTaskModel(data);

            t.action_tasks = [];
            t.action_tasks.push(dataNew);


          } else {
            let dataNew = addActionTaskModel(data);
            t.action_tasks.push(dataNew);
          }

        }
      });
    }
  });

  isCreateTrip.value = true;
  isCreateActionTask.value = false;
}







const addActionTaskModel = (data) => {

  if (parseInt(data.action_type_model) === enumActionTask.CAMERA_ID) {
    let action = {};
    action.uuid = uuidv4();
    action.name = t("action_camera");

    if (data.cameras === undefined) {
      data.cameras = [];
      data.cameras.push(action);
    } else {
      data.cameras.push(action);
    }

    return data;
  }


  if (parseInt(data.action_type_model) === enumActionTask.SCANNER_ID) {

    let action = {};
    action.uuid = uuidv4();
    action.name = t("action_scanner");

    if (data.scanners === undefined) {
      data.scanners = [];
      data.scanners.push(action);
    } else {
      data.scanners.push(action);
    }


    return data;
  }

  if (parseInt(data.action_type_model) === enumActionTask.FORM_ID) {

    let action = {};
    action.uuid = uuidv4();
    action.name = t("action_form");
    action.action_form_field_id = data.action_form_field_id;
    action.action_form_field_name = data.action_form_field_name;

    if (data.forms === undefined) {
      data.forms = [];
      data.forms.push(action);
    } else {
      data.forms.push(action);
    }

    return data;
  }

  return;

}

/**
 * End Action Task
 */




/**
 * Action Stage
 */

const showActionStageForm = () => {

  isCreateTrip.value = false;
  isCreateActionStage.value = true;
  //console.log({ ...arrStages.value });

}

const cancelActionStageForm = () => {
  isCreateTrip.value = true;
  isCreateActionStage.value = false;
}

const addActionStageForm = (stage, data) => {

  let dataNew = addActionTaskModel(data);

  stage.action_stages = [];
  stage.action_stages.push(dataNew);


  arrStages.value.push(stage);

  isCreateTrip.value = true;
  isCreateActionStage.value = false;

}

/**
* End Action Stage
*/





onMounted(async () => {

  // Vehicles
  await getVehicles();
  selectVehicles.value = vehicles.value;


  //Priorities
  await getTripPriorities();
  selectTripPriorities.value = tripPriorities.value;


  //Driver
  await getDrivers();
  selectDrivers.value = drivers.value;


  //Tows
  await getTows();
  selectTows.value = tows.value;

});


</script>
