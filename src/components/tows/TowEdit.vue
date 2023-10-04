<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("tractor_manager") }}
					</label>

					<TomSelect 
						v-model="validate.employee_id.$model" 
						id="employee_id" 
						name="employee_id" 
						:options="{
							placeholder: $t('select_tractor_manager'),
						}" class="form-control w-full"
						:class="{ 'border-danger': validate.employee_id.$error }"
					>

						<option v-for="employee in selectEmployees" 
							:key="employee.id" 
							:value="employee.id"  
						>
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
	import { onMounted, reactive, toRefs, ref } from 'vue';
	import useTow from '@/composables/tows';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import useEmployees from "@/composables/employees";

	const { tow, getTow } = useTow();
	const { t } = useI18n();
	const props = defineProps(['vehicleId']);
	const emit = defineEmits(['cancelEdit', 'updateVehicleForm']);
	const { employees, getEmployees } = useEmployees();

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
			emit('updateVehicleForm', tow.value.id, formData);
		}
	};

	onMounted(async () => {
		await getTow(props.vehicleId);
		await getEmployees();
		selectEmployees.value = employees.value;
		formData.plate = tow.value.plate;
		formData.employee_id = tow.value.employee_id.toString();

	});

</script>
