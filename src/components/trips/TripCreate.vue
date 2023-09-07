<template>
  <!-- HEADER -->
  <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
    {{ $t("create") }}
  </h2>


  <!-- BEGIN: Page Layout -->
  <div class="intro-y box p-5 mt-5">

    <!-- BEGIN: Form -->
    <form class="validate-form" @submit.prevent="save">

      <!-- BEGIN: container -->
      <div class="grid grid-cols-12 gap-6">

      


        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <div class="input-form">
            <label for="vehicle_id" class="form-label w-full">
              {{ $t("vehicle") }}
            </label>
            
            <select
              v-model.trim="validate.vehicle_id.$model"
              id="vehicle_id"
              name="vehicle_id"
              class="form-control"
              :class="{ 'border-danger': validate.vehicle_id.$error }"
            >

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

            <select
              v-model.trim="validate.trip_priority_id.$model"
              id="trip_priority_id"
              name="trip_priority_id"
              class="form-control"
              :class="{ 'border-danger': validate.trip_priority_id.$error }"
            >

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
            
            <select
              v-model.trim="validate.driver_id.$model"
              id="driver_id"
              name="driver_id"
              class="form-control"
              :class="{ 'border-danger': validate.driver_id.$error }"
            >

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


        <div class="col-span-12 md:col-span-12 lg:col-span-12">
          <div class="input-form">
            <label for="observations" class="form-label w-full">
              {{ $t("observations") }}
            </label>
            
           
            <textarea 
              v-model.trim="observations" 
              id="observations" 
              name="observations"
              class="form-control" >
            </textarea>


            <!-- <template v-if="validate.observations.$error">
              <div v-for="(error, index) in validate.observations.$errors" :key="index" class="text-danger mt-2">
                {{ error.$message }}
              </div>
            </template> -->
          </div>
        </div>


        <!-- BEGIN: Buttons -->
        <div class="col-span-12 md:col-span-12 lg:col-span-12">
          <div class="flex justify-center">
            <button type="submit" class="btn btn-primary mr-5">
              {{ $t("save") }}
            </button>
            <button @click.prevent="emit('cancelCreate')" class="btn btn-danger">
              {{ $t("cancel") }}
            </button>
          </div>
        </div>
        <!-- END: Buttons -->

      </div>
      <!-- END: container -->

    </form>
    <!-- END: Form -->

  </div>
</template>
<script setup>

import { onMounted, reactive, toRefs, ref } from 'vue';
import useTrips from '@/composables/trips.js';
import useVehicles from '@/composables/vehicles.js';
import useTripPriority from '@/composables/trip_priorities.js';
import useDrivers from '@/composables/drivers.js';


import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';


const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();
const { storeTrip } = useTrips();



const { t } = useI18n();




const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);




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

const save = async() => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    //TODO
  } else {
    
    console.log("envia a guardar");

    await storeTrip(formData);

  }
};

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
