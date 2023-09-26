<template>
	<!-- HEADER -->
	<h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
		{{ $t("edit") }}
	</h2>


	<!-- BEGIN: Page Layout -->
	<div class="intro-y box p-5 mt-5">
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
							<div v-for="(error, index) in validate.reference_number.$errors" :key="index"
								class="text-danger mt-2">
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
						<input v-model.trim="validate.execution_at.$model" id="execution_at" type="datetime-local"
							name="execution_at" class="form-control"
							:class="{ 'border-danger': validate.execution_at.$error }" />
						<template v-if="validate.execution_at.$error">
							<div v-for="(error, index) in validate.execution_at.$errors" :key="index"
								class="text-danger mt-2">
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

						<TomSelect v-model.trim="validate.trip_priority_id.$model" id="trip_priority_id"
							name="trip_priority_id" :options="{
								placeholder: $t('message.select'),
							}" class="form-control w-full" :class="{ 'border-danger': validate.trip_priority_id.$error }">

							<option :value="0"></option>
							<option v-for="item in selectTripPriorities" :value="item.id">
								{{ item.name }}
							</option>

						</TomSelect>

						<template v-if="validate.trip_priority_id.$error">
							<div v-for="(error, index) in validate.trip_priority_id.$errors" :key="index"
								class="text-danger mt-2">
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
							<div v-for="(error, index) in validate.vehicle_id.$errors" :key="index"
								class="text-danger mt-2">
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

	</div>
</template>
<script setup>

import { onMounted, onBeforeMount, reactive, toRefs, ref } from 'vue';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import useTrips from '@/composables/trips';
import useVehicles from '@/composables/vehicles.js';
import useTripPriority from '@/composables/trip_priorities.js';
import useDrivers from '@/composables/drivers.js';


const { t } = useI18n();
const route = useRoute();
const props = defineProps(['tripId']);
const emit = defineEmits(['cancelEdit', 'updateTripForm']);


// Trips
const { trip, getTrip } = useTrips();

const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();




const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);






const rules = {
	vehicle_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	plate: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	employee_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	company_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	trip_status_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	trip_comm_status_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	trip_priority_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	driver_id: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	reference_number: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	name: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	execution_at: {
		required: helpers.withMessage(t("form.required"), required),
		minLength: minLength(2),
	},
	observations: {
	},
};



const formData = reactive({
	vehicle_id: "",
	trip_status_id: "",
	trip_comm_status_id: "",
	trip_priority_id: "",
	driver_id: "",
	reference_number: "",
	name: "",
	execution_at: "",
	observations: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {
	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {

		//TODO guardar

		console.log("Guardar");
	}
};

onBeforeMount(async () => {
	await getTrip(route.params.id);
	
	
	
	
	// Vehicles
	await getVehicles();
	selectVehicles.value = vehicles.value;


	//Priorities
	await getTripPriorities();
	selectTripPriorities.value = tripPriorities.value;


	//Driver
	await getDrivers();
	selectDrivers.value = drivers.value;


	
	formData.trip_priority_id = trip.value.trip_priority_id.toString();
	formData.driver_id = trip.value.driver_id.toString();
	formData.vehicle_id = trip.value.vehicle_id.toString();


	formData.reference_number = trip.value.reference_number;
	formData.name = trip.value.name;
	formData.execution_at = trip.value.execution_at;
	formData.started_at = trip.value.started_at;
	formData.finished_at = trip.value.finished_at;
	formData.observations = trip.value.observations;



});

</script>
