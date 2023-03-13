<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-12 lg:col-span-12">

				<div class="input-form">
					<label for="plate" class="form-label w-full">
						{{ $t("plate") }}
					</label>
					<input
						v-model.trim="validate.plate.$model"
						id="plate"
						type="text"
						name="plate"
						class="form-control"
						:class="{ 'border-danger': validate.plate.$error }"
					/>
					<template v-if="validate.plate.$error">
						<div v-for="(error, index) in validate.plate.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="plate" class="form-label w-full">
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
					<label for="plate" class="form-label w-full">
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

</template>
<script setup>

	import { onMounted, reactive, toRefs } from 'vue';
	import useVehicles from '@/composables/vehicles';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { vehicle, getVehicle } = useVehicles();
	const { t } = useI18n();
	const props = defineProps(['vehicleId']);
	const emit = defineEmits(['cancelEdit', 'updatevehicleForm']);

	const rules = {
		plate: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		employee_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		company_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		plate: "",
		employee_id: "",
		company_id: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('saveVehicleForm', formData);
		}
	};

	onMounted(async () => {
		// TODO here implements...
	});

</script>
