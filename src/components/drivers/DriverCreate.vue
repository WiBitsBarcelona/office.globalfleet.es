<template>
	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">



			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("driver_manager") }}
					</label>

					<TomSelect v-model.trim="validate.employee_id.$model" id="employee_id" name="employee_id" :options="{
						placeholder: $t('select_driver_manager'),
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
					<label for="surname" class="form-label w-full">
						{{ $t("surname") }}
					</label>
					<input v-model.trim="validate.surname.$model" id="surname" type="text" name="surname"
						class="form-control" :class="{ 'border-danger': validate.surname.$error }" />
					<template v-if="validate.surname.$error">
						<div v-for="(error, index) in validate.surname.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-3">
				<div class="input-form">
					<label for="fiscal_identification" class="form-label w-full">
						{{ $t("fiscal_identification") }}
					</label>
					<input v-model.trim="validate.fiscal_identification.$model" id="fiscal_identification" type="text"
						name="fiscal_identification" class="form-control"
						:class="{ 'border-danger': validate.fiscal_identification.$error }" />
					<template v-if="validate.fiscal_identification.$error">
						<div v-for="(error, index) in validate.fiscal_identification.$errors" :key="index"
							class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>





			<div class="col-span-12 md:col-span-6 lg:col-span-5">
				<div class="input-form">
					<label for="email" class="form-label w-full">
						{{ $t("email") }}
					</label>
					<input v-model.trim="validate.email.$model" id="email" type="text" name="email" class="form-control"
						:class="{ 'border-danger': validate.email.$error }" />
					<template v-if="validate.email.$error">
						<div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4 hidden">
				<div class="input-form">
					<label for="password" class="form-label w-full">
						{{ $t("password") }}
					</label>

					<div class="relative sm:flex items-center">
						<!-- <input v-model.trim="validate.password.$model" id="password" :type="passwordFieldType" -->
						<input v-model="passTmp" id="password" :type="passwordFieldType"
							name="password" class="form-control" :class="{ 'border-danger': validate.password.$error }" />
						<EyeIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
							@click="switchVisibility" />

					</div>


					<template v-if="validate.password.$error">
						<div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-2">
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
import useDrivers from '@/composables/drivers';
import useEmployees from "@/composables/employees";
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';




const { driver, getDriver } = useDrivers();
const { employees, getEmployees } = useEmployees();


const { t } = useI18n();
const props = defineProps(['driverId']);
const emit = defineEmits(['cancelEdit', 'updatedriverForm']);



const selectEmployees = ref();
const passTmp = ref('');

const passwordFieldType = ref("password");
const switchVisibility = () => {
	passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}



const rules = {
	name: {
		required: helpers.withMessage(t("form.required"), required),
	},
	employee_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	surname: {
		required: helpers.withMessage(t("form.required"), required),
	},
	fiscal_identification: {
		required: helpers.withMessage(t("form.required"), required),
	},
	email: {
		required: helpers.withMessage(t("form.required"), required),
		email: helpers.withMessage(t("form.email"), email),
	},
	password: {
		//required: helpers.withMessage(t("form.required"), required),
	},
};


const formData = reactive({
	employee_id: "",
	name: "",
	surname: "",
	fiscal_identification: "",
	password: "",
	email: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {
	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {
		formData.password = passTmp.value;
		emit('saveDriverForm', formData);
	}
};

const generatePass = (lg) => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	let counter = 0;
    while (counter < lg) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
	passTmp.value = result;
}

onMounted(async () => {
	//List Employees
	await getEmployees();
	selectEmployees.value = employees.value;
	generatePass(15);
});

</script>
