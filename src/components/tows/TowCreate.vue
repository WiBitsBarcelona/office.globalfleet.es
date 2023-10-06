<template>
	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("tow_manager") }}
					</label>

					<TomSelect v-model.trim="validate.employee_id.$model" id="employee_id" name="employee_id" :options="{
						placeholder: $t('select_tow_manager'),
					}" class="form-control w-full"
						:class="{ 'border-danger': validate.employee_id.$error }">

						<option v-for="employee in selectEmployees" :key="employee.id" :value="employee.id">
							{{ employee.name }} {{ employee.surname }}
						</option>
					</TomSelect>
					<template v-if="validate.employee_id.$error">
						<div v-for="(error, index) in validate.employee_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>

			<div class="col-span-6 md:col-span-4 lg:col-span-4">

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

	import { onMounted, reactive, toRefs, ref } from 'vue';
	import useVehicles from '@/composables/vehicles';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import useEmployees from "@/composables/employees";

	const { vehicle, getVehicle } = useVehicles();
	const { employees, getEmployees } = useEmployees();
	const { t } = useI18n();
	const props = defineProps(['vehicleId']);
	const emit = defineEmits(['cancelEdit', 'updatevehicleForm']);

	const selectEmployees = ref();

	const rules = {
		plate: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		employee_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		plate: "",
		employee_id: "",
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
		await getEmployees();
		selectEmployees.value = employees.value;
	});

</script>
