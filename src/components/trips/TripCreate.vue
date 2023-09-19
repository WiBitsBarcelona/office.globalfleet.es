<template>
  <!-- HEADER -->
  <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
    {{ $t("create") }}
  </h2>


  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5" v-if="isCreateTrip">
    <!-- BEGIN: Form -->
    <form class="validate-form" @submit.prevent="save">

      <div class="grid grid-cols-12 gap-1 mb-8">

        <div class="col-span-10">
          <h2 class="text-lg font-medium">
            {{ $t("trip") }}
          </h2>
        </div>



        <div v-if="isProcess">En Proceso....</div>


        <!-- BEGIN: Buttons -->

        <div class="col-span-2 text-right">
          <button type="submit" class="btn btn-primary">
            {{ $t("save") }}
          </button>
          <!-- <button @click.prevent="" class="btn btn-danger">
              {{ $t("cancel") }}
            </button> -->
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
            <input v-model.trim="validate.execution_at.$model" id="execution_at" type="text" name="execution_at"
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

            <select v-model.trim="validate.trip_priority_id.$model" id="trip_priority_id" name="trip_priority_id"
              class="form-control" :class="{ 'border-danger': validate.trip_priority_id.$error }">

              <option value="" selected>Seleccione</option>
              <option v-for="item in selectTripPriorities" :value="item.id">
                {{ item.name }}
              </option>

            </select>


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

            <select v-model.trim="validate.vehicle_id.$model" id="vehicle_id" name="vehicle_id" class="form-control"
              :class="{ 'border-danger': validate.vehicle_id.$error }">

              <option value="" selected>Seleccione</option>
              <option v-for="item in selectVehicles" :value="item.id">
                {{ item.plate }}
              </option>

            </select>

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

            <select v-model.trim="validate.driver_id.$model" id="driver_id" name="driver_id" class="form-control"
              :class="{ 'border-danger': validate.driver_id.$error }">

              <option value="" selected>Seleccione</option>
              <option v-for="item in selectDrivers" :value="item.id">
                {{ item.name }} {{ item.surname }}
              </option>

            </select>



            <template v-if="validate.driver_id.$error">
              <div v-for="(error, index) in validate.driver_id.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template>
          </div>
        </div>


        <div class="col-span-12 md:col-span-12 lg:col-span-12">
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
        
        <a href="#" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2" @click="showStageForm">
          <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_stage") }}
        </a>
        
        <a href="#" class="btn btn-outline-success w-1/2 sm:w-auto mr-2" @click="showStageForm">
          <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_action_stage") }}
        </a>
      </div>
    </div>



    <!-- Stage Card -->
    <div v-for="stage in arrStages" :key="stage.id"
      class="p-4 rounded border border-slate-200 text-slate-500 shadow mb-2">

      <div class="grid grid-cols-5 gap-2 mb-5 pb-2">

        <div class="col-span-12 text-right">
          <a href="#" @click.prevent="showTaskForm(stage)" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
            <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_task") }}
          </a>
        </div>

        <div class="col-span-2">
          <h5 class="text-xs font-light text-gray-400">{{ $t("stage") }}:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ stage.name }}
          </p>
        </div>

        <div class="col-span-2">
          <h5 class="text-xs font-light text-gray-400">{{ $t("reference_number") }}:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ stage.reference_number }}
          </p>
        </div>

        <div class="col-span-2">
          <h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ stage.activity_type_name }}
          </p>
        </div>

        <div class="col-span-3">
          <h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ stage.client_name }}
          </p>
        </div>
        <div class="col-span-3">
          <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ stage.execution_at }}
          </p>
        </div>

      </div>


      <!-- Tasks -->
      <div class="relative" v-for="task in stage.tasks" :key="task.id">
        <div class="md:flex items-center md:space-x-4 mb-3">
          <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow">
            <div class="grid grid-cols-4 gap-2 mb-5">

              <div class="col-span-12 text-right">
                <a href="#" @click.prevent="showActionTaskForm(stage, task)"
                  class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
                  <PlusCircleIcon class="w-4 h-4" /> {{ "Agregar Action Task" }}
                </a>
              </div>

              <div class="col-span-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("task") }}:</h5>
                <p class="text-xs font-normal leading-6 text-gray-500">
                  {{ task.name }}
                </p>
              </div>

            </div>




            <!-- Action Tasks -->
            <div class="relative" v-for="action_task in task.action_tasks" :key="action_task.id">
              <div class="md:flex items-center md:space-x-4 mb-3">
                <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow">
                  <div class="grid grid-cols-4 gap-2 mb-5">


                    <!-- <div class="col-span-12 text-right">
                <a href="#" @click.prevent="showActionTaskForm(stage, task)"
                  class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
                  <PlusCircleIcon class="w-4 h-4" /> {{ "Agregar Action Task" }}
                </a>
              </div> -->

                    <div class="col-span-2">
                      <h5 class="text-xs font-light text-gray-400">{{ $t("action") }}:</h5>
                      <p class="text-xs font-normal leading-6 text-gray-500">
                        {{ action_task.action_type_name }}
                      </p>
                    </div>


                    <!-- Action Cameras -->
                    <div  class="col-span-12" v-if="action_task.action_type_model === enumActionTask.CAMERA_ID">
                      <div class="relative" v-for="camera in action_task.cameras" :key="camera.id">

                          <div class="md:flex items-center md:space-x-4 mb-3">
                            <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow">
                              <div class="grid grid-cols-4 gap-2 mb-5">

                                <div class="col-span-2">
                                  <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                  <p class="text-xs font-normal leading-6 text-gray-500">
                                    {{ camera.name }}
                                  </p>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <!-- End of Action Cameras -->



                    <!-- Action Scanner -->
                    <div class="col-span-12" v-if="action_task.action_type_model === enumActionTask.SCANNER_ID">
                      <div class="relative" v-for="scanner in action_task.scanners" :key="scanner.id">
                        <div class="md:flex items-center md:space-x-4 mb-3">
                          <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow">
                            <div class="grid grid-cols-4 gap-2 mb-5">

                              <div class="col-span-2">
                                <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                <p class="text-xs font-normal leading-6 text-gray-500">
                                  {{ scanner.name }}
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End of Action Scanner -->




                    <!-- Action Scanner -->
                    <div class="col-span-12" v-if="action_task.action_type_model === enumActionTask.FORM_ID">
                      <div class="relative" v-for="form in action_task.forms" :key="form.id">
                        <div class="md:flex items-center md:space-x-4 mb-3">
                          <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow">
                            <div class="grid grid-cols-4 gap-2 mb-5">

                              <div class="col-span-2">
                                <h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
                                <p class="text-xs font-normal leading-6 text-gray-500">
                                  {{ form.name }}
                                </p>
                              </div>

                              <div class="col-span-2">
                                <h5 class="text-xs font-light text-gray-400">{{ $t("name") }}:</h5>
                                <p class="text-xs font-normal leading-6 text-gray-500">
                                  {{ form.action_form_field_name }}
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End of Action Scanner -->






                  </div>
                </div>
              </div>
            </div>
            <!-- End of Action Tasks -->


          </div>

        </div>

      </div>
      <!-- End of Tasks -->



    </div>
    <!-- End of Stage Card -->


  </div>






  <div class="intro-y box p-5 mt-5" v-if="isCreateStage">
    <StageCreate @cancelStageForm="cancelStageForm" @addStageForm="addStageForm" />
  </div>



  <div class="intro-y box p-5 mt-5" v-if="isCreateTask">
    <TaskCreate :stageIndex="stageIndex" @cancelTaskForm="cancelTaskForm" @addTaskForm="addTaskForm" />
  </div>




  <div class="intro-y box p-5 mt-5" v-if="isCreateActionTask">
    <ActionTaskCreate :stageIndex="stageIndex" :taskIndex="taskIndex" @cancelActionTaskForm="cancelActionTaskForm"
      @addActionTaskForm="addActionTaskForm" />
  </div>
  
</template>


<script setup>

import { onMounted, reactive, toRefs, ref } from 'vue';

import useTrips from '@/composables/trips.js';
import useStage from '@/composables/stages.js';
import useTask from '@/composables/tasks.js';


import useVehicles from '@/composables/vehicles.js';
import useTripPriority from '@/composables/trip_priorities.js';
import useDrivers from '@/composables/drivers.js';


import StageCreate from '@/components/stages/StageCreate.vue';
import TaskCreate from '@/components/tasks/TaskCreate.vue';
import ActionTaskCreate from '@/components/action_tasks/ActionTaskCreate.vue';


import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';




import enumActionTask from '@/enums/enum_action_task.js';



const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();
const { trip, tripErrors, storeTrip } = useTrips();
const { stage, stageErrors, storeStage } = useStage();
const { task, taskErrors, storeTask } = useTask();





const { t } = useI18n();




const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);


const arrStages = ref([]);



const isCreateTrip = ref(true);
const isCreateStage = ref(false);
const isCreateTask = ref(false);
const isCreateActionTask = ref(false);
const isProcess = ref(false);


const stageIndex = ref();
const taskIndex = ref();





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

const formData = reactive({
  vehicle_id: "",
  trip_priority_id: "2",
  driver_id: "",
  reference_number: "78978922",
  name: "Viaje Plaza",
  execution_at: "2023-10-10 10:00:00",
  observations: "Sin observaciones",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = async () => {

  validate.value.$touch();
  if (validate.value.$invalid) {
    //TODO
  } else {

    isProcess.value = true;

    console.log("envia a guardar");

    await storeTrip(formData);
    console.log({ ...trip.value });




    // arrStages.value

    arrStages.value.forEach( async(eleStage) => {

      eleStage.trip_id = trip.value.id;

      await storeStage(eleStage);
      console.log({...stage.value});



      eleStage.tasks.forEach( async(eleTask) => {

        eleTask.stage_id = stage.value.id;

        await storeTask(eleTask);

        console.log({ ...task.value });


        //TODO actions


      });








    });
    

    isProcess.value = false;

    //console.log({ ...arrStages.value });

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

  if(parseInt(data.action_type_model) === enumActionTask.CAMERA_ID){
    let action = {}; 
    action.uuid = uuidv4();
    action.name = t("action_camera");

    if (data.cameras === undefined) {
      data.cameras = [];
      data.cameras.push(action);
    }else{
      data.cameras.push(action);
    }

    return data;
  }


  if(parseInt(data.action_type_model) === enumActionTask.SCANNER_ID){

    let action = {}; 
    action.uuid = uuidv4();
    action.name = t("action_scanner");

    if (data.scanners === undefined) {
      data.scanners = [];
      data.scanners.push(action);
    }else{
      data.scanners.push(action);
    }
    

    return data;
  }

  if(parseInt(data.action_type_model) === enumActionTask.FORM_ID){

    let action = {}; 
    action.uuid = uuidv4();
    action.name = t("action_form");
    action.action_form_field_id = data.action_form_field_id;
    action.action_form_field_name = data.action_form_field_name;

    if (data.forms === undefined) {
      data.forms = [];
      data.forms.push(action);
    }else{
      data.forms.push(action);
    }

    return data;
  }

  return;

}






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


});


</script>
