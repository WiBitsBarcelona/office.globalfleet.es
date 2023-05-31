<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: Trip -->
		<h1 class="text-lg">{{ t("trip") }}</h1>
		
		<div class="grid grid-rows-12 gap-6 mb-5">

			<div class="col-span-12 md:col-span-8 lg:col-span-8">

				<div class="input-form">
					<label for="name" class="form-label w-full">
						{{ $t("name") }}
					</label>
					<input
						v-model.trim="validate.name.$model"
						id="name"
						type="text"
						name="name"
						class="form-control"
						:class="{ 'border-danger': validate.name.$error }"
					/>
					<template v-if="validate.name.$error">
						<div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div>



			<div class="col-span-12 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="reference_number" class="form-label w-full">
						{{ $t("reference_number") }}
					</label>
					<input
						v-model.trim="validate.reference_number.$model"
						id="reference_number"
						type="text"
						name="reference_number"
						class="form-control"
						:class="{ 'border-danger': validate.reference_number.$error }"
					/>
					<template v-if="validate.reference_number.$error">
						<div v-for="(error, index) in validate.reference_number.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div>
				

			<div class="col-span-4 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="execution_at" class="form-label w-full">
						{{ $t("execution_at") }}
					</label>
					<input
						v-model.trim="validate.execution_at.$model"
						id="execution_at"
						type="text"
						name="execution_at"
						class="form-control"
						:class="{ 'border-danger': validate.execution_at.$error }"
					/>
					<template v-if="validate.execution_at.$error">
						<div v-for="(error, index) in validate.execution_at.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>

				</div>

			</div>

			<div class="col-span-12 md:col-span-4 lg:col-span-4">


				<div class="input-form">
					<label for="started_at" class="form-label w-full">
						{{ $t("started_at") }}
					</label>
					<input
						v-model.trim="validate.started_at.$model"
						id="started_at"
						type="text"
						name="started_at"
						class="form-control"
						:class="{ 'border-danger': validate.started_at.$error }"
					/>
					<template v-if="validate.started_at.$error">
						<div v-for="(error, index) in validate.started_at.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div>




			<div class="col-span-12 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="finished_at" class="form-label w-full">
						{{ $t("finished_at") }}
					</label>
					<input
						v-model.trim="validate.finished_at.$model"
						id="finished_at"
						type="text"
						name="finished_at"
						class="form-control"
						:class="{ 'border-danger': validate.finished_at.$error }"
					/>
					<template v-if="validate.finished_at.$error">
						<div v-for="(error, index) in validate.finished_at.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div>


			<div class="col-span-12 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="" class="form-label w-full">
						{{ $t("trip_priority") }}
					</label>

					<select v-model="selectPriority">
						<option v-for="priority in tripPriorities" :value="priority.id" :key="priority.id">
							{{ priority.name}}
						</option>
					</select>
				</div>

			</div>


			<div class="col-span-12 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="" class="form-label w-full">
						{{ $t("trip_status") }}
					</label>

					<select v-model="selectStatus">
						<option v-for="status in tripStatuses" :value="status.id" :key="status.id">
							{{ status.name}}
						</option>
					</select>
				</div>

			</div>



			<div class="col-span-12 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="" class="form-label w-full">
						{{ $t("trip_comm_status") }}
					</label>

					<select v-model="selectCommStatus">
						<option v-for="comm_status in tripCommStatuses" :value="comm_status.id" :key="comm_status.id">
							{{ comm_status.name}}
						</option>
					</select>
				</div>

			</div>



			<!-- <div class="col-span-4 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="trip_status_id" class="form-label w-full">
						{{ $t("trip_status") }}
					</label>
					<input
						v-model.trim="validate.trip_status_id.$model"
						id="trip_status_id"
						type="text"
						name="trip_status_id"
						class="form-control"
						:class="{ 'border-danger': validate.trip_status_id.$error }"
					/>
					<template v-if="validate.trip_status_id.$error">
						<div v-for="(error, index) in validate.trip_status_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div> -->



			<!-- <div class="col-span-4 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="trip_comm_status_id" class="form-label w-full">
						{{ $t("trip_comm_status") }}
					</label>
					<input
						v-model.trim="validate.trip_comm_status_id.$model"
						id="trip_comm_status_id"
						type="text"
						name="trip_comm_status_id"
						class="form-control"
						:class="{ 'border-danger': validate.trip_comm_status_id.$error }"
					/>
					<template v-if="validate.trip_comm_status_id.$error">
						<div v-for="(error, index) in validate.trip_comm_status_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div> -->



			<div class="col-span-12 md:col-span-12 lg:col-span-12">

				<div class="input-form">
					<label for="observations" class="form-label w-full">
						{{ $t("observations") }}
					</label>
					<textarea
						v-model.trim="validate.observations.$model"
						id="observations"
						type="text"
						name="observations"
						class="form-control"
						:class="{ 'border-danger': validate.observations.$error }"
					/>
					<template v-if="validate.observations.$error">
						<div v-for="(error, index) in validate.observations.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

			</div>

		</div>
		<!-- END: Trip -->


		<!-- BEGIN: Vehicle -->
		<h1 class="text-lg">{{ t("vehicle") }}</h1>

		<div class="grid grid-rows-12 gap-6 mb-5">

			<div class="col-span-12 md:col-span-4 lg:col-span-4">
				<div class="input-form">
					<label for="vehicle_id" class="form-label w-full">
						{{ $t("plate") }}
					</label>
					
					{{ tripVehicle.plate }}

					<input
						v-model.trim="tripVehicle.plate"
						id="plate"
						name="plate"
						type="text"
						class="form-control"
					/>


				</div>

			</div>

		</div>
		<!-- END: Vehicle -->


		










		<!-- BEGIN: Employee -->

		<h1 class="text-lg">{{ t("employee") }}</h1>

		<div class="grid grid-rows-12 gap-6 mb-5">

			<div class="col-span-4 md:col-span-4 lg:col-span-4">

				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("name") }}
					</label>
					<input
						v-model.trim="tripEmployee.name"
						id="employee_name"
						type="text"
						name="employee_name"
						class="form-control"
					/>
					
				</div>

			</div>

			<div class="col-span-2 md:col-span-4 lg:col-span-4">
				<div class="input-form">
					<label for="driver_id" class="form-label w-full">
						{{ $t("surname") }}
					</label>
					<input
						v-model.trim="tripEmployee.surname"
						id="surname"
						type="text"
						name="surname"
						class="form-control"
					/>
					
				</div>

			</div>



		<!-- END: Employee -->
		</div>

			


		<!-- BEGIN: Driver -->
		<h1 class="text-lg">{{ t("driver") }}</h1>

		<div class="grid grid-rows-12 gap-6 mb-5">

			<div class="col-span-4 md:col-span-4 lg:col-span-4">
				<div class="input-form">
					<label for="driver_id" class="form-label w-full">
						{{ $t("driver") }}
					</label>
					<input
						v-model.trim="tripDriver.name"
						id="driver_name"
						type="text"
						name="driver_name"
						class="form-control"
					/>
					
				</div>

			</div>

			<div class="col-span-4 md:col-span-4 lg:col-span-4">
				<div class="input-form">
					<label for="driver_id" class="form-label w-full">
						{{ $t("surname") }}
					</label>
					<input
						v-model.trim="tripDriver.surname"
						id="driver_surname"
						type="text"
						name="driver_surname"
						class="form-control"
					/>
					
				</div>

			</div>

		</div>
		<!-- END: Driver -->






		<!-- BEGIN: container -->
		<div class="grid grid-rows-12 gap-6 first:mb-5">
			
		</div>
		<!-- END: container -->






		<!-- BEGIN: container -->
		<div class="grid grid-rows-12 gap-6 p-5">

			<!-- BEGIN: Buttons -->
			<div class="col-span-12 md:col-span-12 lg:col-span-12">
				<div class="flex justify-center">
					<!-- <button type="submit" class="btn btn-primary mr-5">
						{{ $t("save") }}
					</button> -->
					<button @click.prevent="emit('cancelEdit')" class="btn btn-danger">
						{{ $t("cancel") }}
					</button>
				</div>
			</div>
			<!-- END: Buttons -->
			
		</div>
		<!-- END: container -->




	</form>
	<!-- END: Form -->

</template>
<script setup>

	import { onMounted, onBeforeMount, reactive, toRefs, ref } from 'vue';
	import useTrips from '@/composables/trips';
	import useTripPriority from '@/composables/trip_priorities';
	import useTripStatus from '@/composables/trip_statuses';
	import useTripCommStatus from '@/composables/trip_comm_statuses';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';


	const { t } = useI18n();
	const props = defineProps(['tripId']);
	const emit = defineEmits(['cancelEdit', 'updateTripForm']);


	// Trips
	const { trip, getTrip } = useTrips();
	
	// Priority
	const { tripPriorities, getTripPriorities } = useTripPriority();

	// Statuses
	const { tripStatuses, getTripStatuses } = useTripStatus();

	// Comm statuses
	const { tripCommStatuses, getTripCommStatuses } = useTripCommStatus();
	
	
	
	
	const selectPriority = ref('');
	const selectStatus = ref('');
	const selectCommStatus = ref('');



	const tripVehicle = ref('');
	const tripEmployee = ref('');
	const tripDriver = ref('');




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
		started_at: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		finished_at: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		observations: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
	};



	const formData = reactive({
		trip_tracking_id: "",
		provider_telematic_id: "",
		vehicle_id: "",
		employee_id: "",
		company_id: "",
		trip_status_id: "",
		trip_comm_status_id: "",
		trip_priority_id: "",
		driver_id: "",
		reference_number: "",
		name: "",
		execution_at: "",
		started_at: "",
		finished_at: "",
		observations: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateTripForm', trip.value.id, formData);
		}
	};

	onBeforeMount(async () => {
		await getTrip(props.tripId);
		await getTripPriorities();
		await getTripStatuses();
		await getTripCommStatuses();
		
		selectStatus.value = trip.value.trip_status_id;
		selectPriority.value = trip.value.trip_priority_id;
		selectCommStatus.value = trip.value.trip_comm_status_id;



		//formData.vehicle_id = trip.value.vehicle_id;


		if(trip.value.vehicle){
			tripVehicle.value = trip.value.vehicle;
		}
		

		if(trip.value.employee){
			tripEmployee.value = trip.value.employee;
		}

		if(trip.value.driver){
			tripDriver.value = trip.value.driver;
		}


		formData.plate = trip.value.vehicle.plate;
		formData.employee_id = trip.value.employee_id;
		formData.company_id = trip.value.company_id;
		
		//formData.trip_comm_status_id = trip.value.trip_comm_status_id;
		//formData.trip_status_id = trip.value.trip_status_id;
		//formData.trip_priority_id = trip.value.trip_priority_id;
		


		formData.driver_id = trip.value.driver_id;
		formData.reference_number = trip.value.reference_number;
		formData.name = trip.value.name;
		formData.execution_at = trip.value.execution_at;
		formData.started_at = trip.value.started_at;
		formData.finished_at = trip.value.finished_at;
		formData.observations = trip.value.observations;



	});

</script>
