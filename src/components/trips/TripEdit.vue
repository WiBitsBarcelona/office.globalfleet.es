<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-12 lg:col-span-12">

				<div class="input-form">
					<label for="trip_tracking_id" class="form-label w-full">
						{{ $t("trip_tracking_id") }}
					</label>
					<input
						v-model.trim="validate.trip_tracking_id.$model"
						id="trip_tracking_id"
						type="text"
						name="trip_tracking_id"
						class="form-control"
						:class="{ 'border-danger': validate.trip_tracking_id.$error }"
					/>
					<template v-if="validate.trip_tracking_id.$error">
						<div v-for="(error, index) in validate.trip_tracking_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="provider_telematic_id" class="form-label w-full">
						{{ $t("provider_telematic_id") }}
					</label>
					<input
						v-model.trim="validate.provider_telematic_id.$model"
						id="provider_telematic_id"
						type="text"
						name="provider_telematic_id"
						class="form-control"
						:class="{ 'border-danger': validate.provider_telematic_id.$error }"
					/>
					<template v-if="validate.provider_telematic_id.$error">
						<div v-for="(error, index) in validate.provider_telematic_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="vehicle_id" class="form-label w-full">
						{{ $t("vehicle_id") }}
					</label>
					<input
						v-model.trim="validate.vehicle_id.$model"
						id="vehicle_id"
						type="text"
						name="vehicle_id"
						class="form-control"
						:class="{ 'border-danger': validate.vehicle_id.$error }"
					/>
					<template v-if="validate.vehicle_id.$error">
						<div v-for="(error, index) in validate.vehicle_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("employee_id") }}
					</label>
					<input
						v-model.trim="validate.employee_id.$model"
						id="employee_id"
						type="text"
						name="employee_id"
						class="form-control"
						:class="{ 'border-danger': validate.employee_id.$error }"
					/>
					<template v-if="validate.employee_id.$error">
						<div v-for="(error, index) in validate.employee_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="company_id" class="form-label w-full">
						{{ $t("company_id") }}
					</label>
					<input
						v-model.trim="validate.company_id.$model"
						id="company_id"
						type="text"
						name="company_id"
						class="form-control"
						:class="{ 'border-danger': validate.company_id.$error }"
					/>
					<template v-if="validate.company_id.$error">
						<div v-for="(error, index) in validate.company_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="trip_status_id" class="form-label w-full">
						{{ $t("trip_status_id") }}
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

				<div class="input-form">
					<label for="trip_comm_status_id" class="form-label w-full">
						{{ $t("trip_comm_status_id") }}
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

				<div class="input-form">
					<label for="trip_priority_id" class="form-label w-full">
						{{ $t("trip_priority_id") }}
					</label>
					<input
						v-model.trim="validate.trip_priority_id.$model"
						id="trip_priority_id"
						type="text"
						name="trip_priority_id"
						class="form-control"
						:class="{ 'border-danger': validate.trip_priority_id.$error }"
					/>
					<template v-if="validate.trip_priority_id.$error">
						<div v-for="(error, index) in validate.trip_priority_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="driver_id" class="form-label w-full">
						{{ $t("driver_id") }}
					</label>
					<input
						v-model.trim="validate.driver_id.$model"
						id="driver_id"
						type="text"
						name="driver_id"
						class="form-control"
						:class="{ 'border-danger': validate.driver_id.$error }"
					/>
					<template v-if="validate.driver_id.$error">
						<div v-for="(error, index) in validate.driver_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

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

				<div class="input-form">
					<label for="observations" class="form-label w-full">
						{{ $t("observations") }}
					</label>
					<input
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

			<!-- BEGIN: Buttons -->
			<div class="col-span-12 md:col-span-12 lg:col-span-12">
				<div class="flex justify-center">
					<button type="submit" class="btn btn-primary mr-5">
						{{ $t("save") }}
					</button>
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

	import { onMounted, reactive, toRefs } from 'vue';
	import useTrips from '@/composables/trips';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { trip, getTrip } = useTrips();
	const { t } = useI18n();
	const props = defineProps(['tripId']);
	const emit = defineEmits(['cancelEdit', 'updateTripForm']);

	const rules = {
		trip_tracking_id: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		provider_telematic_id: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		vehicle_id: {
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

	onMounted(async () => {
		await getTrip(props.tripId);
		formData.trip_tracking_id = trip.value.trip_tracking_id;
		formData.provider_telematic_id = trip.value.provider_telematic_id;
		formData.vehicle_id = trip.value.vehicle_id;
		formData.employee_id = trip.value.employee_id;
		formData.company_id = trip.value.company_id;
		formData.trip_status_id = trip.value.trip_status_id;
		formData.trip_comm_status_id = trip.value.trip_comm_status_id;
		formData.trip_priority_id = trip.value.trip_priority_id;
		formData.driver_id = trip.value.driver_id;
		formData.reference_number = trip.value.reference_number;
		formData.name = trip.value.name;
		formData.execution_at = trip.value.execution_at;
		formData.started_at = trip.value.started_at;
		formData.finished_at = trip.value.finished_at;
		formData.observations = trip.value.observations;
	});

</script>
