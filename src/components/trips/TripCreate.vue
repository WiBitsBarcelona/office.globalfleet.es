<template>
  <!-- HEADER -->
  <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
    {{ $t("create") }}
  </h2>



  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5" v-if="isCreateTrip">

    <h2 class="text-lg font-medium mb-5">
      {{ $t("trip") }}
    </h2>


    <!-- BEGIN: Form -->
    <form class="validate-form" @submit.prevent="save">

      <!-- BEGIN: container -->
      <div class="grid grid-cols-12 gap-6">

        <div class="col-span-12 md:col-span-6 lg:col-span-4">
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

        <div class="col-span-12 md:col-span-6 lg:col-span-4">
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
            <label for="trip_priority_id" class="form-label w-full">
              {{ $t("trip_priority_id") }}
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
            <label for="driver_id" class="form-label w-full">
              {{ $t("driver_id") }}
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







        <!-- BEGIN: Buttons -->
        <div class="col-span-12 md:col-span-12 lg:col-span-12">
          <div class="flex justify-center">
            <button type="submit" class="btn btn-primary mr-5">
              {{ $t("save") }}
            </button>
            <!-- <button @click.prevent="" class="btn btn-danger">
              {{ $t("cancel") }}
            </button> -->
          </div>
        </div>
        <!-- END: Buttons -->


      </div>
      <!-- END: container -->

    </form>
    <!-- END: Form -->



    <div>
      <div class="col-span-2 intro-y mb-5 text-end">
        <a href="#" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2" @click="showStageForm">
          <PlusCircleIcon class="w-4 h-4" /> {{ "Agregar Etapa" }}
        </a>
      </div>
    </div>



    <!-- <div class="mb-10" v-if="arrStages.length > 0">
      <ul>
        <li v-for="item in arrStages" :key="item.id">
          {{ item.reference_number }} - {{ item.name }}
          <a href="#" @click.prevent="showTaskForm(item)">Task</a>
        </li>
      </ul>
    </div> -->





    <!-- Stage Card -->
    <div v-for="stage in arrStages" :key="stage.id"
      class="p-4 rounded border border-slate-200 text-slate-500 shadow mb-2">

      <div class="grid grid-cols-5 gap-2 mb-5 pb-2">

        <div class="col-span-12 text-right">
          <a href="#" @click.prevent="showTaskForm(stage)" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
            <PlusCircleIcon class="w-4 h-4" /> {{ "Agregar Task" }}
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
                      <h5 class="text-xs font-light text-gray-400">{{ $t("task") }}:</h5>
                      <p class="text-xs font-normal leading-6 text-gray-500">
                        {{ action_task.action_type_name }}
                      </p>
                    </div>

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


const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();
const { errors, storeTrip } = useTrips();



const { t } = useI18n();




const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);


const arrStages = ref([]);



const isCreateTrip = ref(true);
const isCreateStage = ref(false);
const isCreateTask = ref(false);
const isCreateActionTask = ref(false);


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
  trip_priority_id: "",
  driver_id: "",
  reference_number: "",
  name: "",
  execution_at: "",
  observations: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = async () => {

  //validate.value.$touch();

  if (validate.value.$invalid) {
    //TODO
  } else {

    console.log("envia a guardar");

    //await storeTrip(formData);


    console.log({ ...arrStages.value });

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
    if (el.reference_number === stage.reference_number) {
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
    if (st.reference_number === stage.reference_number) {
      st.tasks.forEach(t => {
        if (t.name === task.name) {
          if (t.action_tasks === undefined) {
            t.action_tasks = [];
            t.action_tasks.push(data);
          } else {
            t.action_tasks.push(data);
          }
        }
      });
    }
  });

  isCreateTrip.value = true;
  isCreateActionTask.value = false;
}







onMounted(async () => {

  //Vehicles
  await getVehicles();
  //console.log({...vehicles.value});
  selectVehicles.value = vehicles.value;


  await getTripPriorities();
  //console.log({...tripPriorities.value});
  selectTripPriorities.value = tripPriorities.value;



  await getDrivers();
  //console.log({...drivers.value});
  selectDrivers.value = drivers.value;

});


</script>
