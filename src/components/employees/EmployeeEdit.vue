<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-12 lg:col-span-4">
				<div class="input-form">
					<label for="role_id" class="form-label w-full">
						{{ $t("role") }}
					</label>

					<TomSelect 
						v-model="validate.role_id.$model" 
						id="role_id" 
						name="role_id" 
						:options="{
							placeholder: $t('select_role')
						}" 
						class="form-control w-full"
						:class="{ 'border-danger': validate.role_id.$error }">

						<option v-for="role in selectRoles" :key="role.id" :value="role.id">
							{{ role.description }}
						</option>

					</TomSelect>
					<template v-if="validate.role_id.$error">
						<div v-for="(error, index) in validate.role_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-12 lg:col-span-4">
				<div class="input-form">
					<label for="manager_id" class="form-label w-full">
						{{ $t("boss") }}
					</label>
					<TomSelect v-model.trim="validate.manager_id.$model" id="manager_id" name="manager_id" :options="{
						placeholder: $t('select_role'),
					}" class="form-control w-full"
						:class="{ 'border-danger': validate.manager_id.$error }">

						<option value="-">No tiene</option>
						<option value=""></option>
						<option v-for="item in selectManagers" :value="item.id">
							{{ item.name }} {{ item.surname }} 
						</option>

					</TomSelect>
					<template v-if="validate.manager_id.$error">
						<div v-for="(error, index) in validate.manager_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="fiscal_identification" class="form-label w-full">
						{{ $t("fiscal_identification") }}
					</label>
					<input
						v-model.trim="validate.fiscal_identification.$model"
						id="fiscal_identification"
						type="text"
						name="fiscal_identification"
						class="form-control"
						:class="{ 'border-danger': validate.fiscal_identification.$error }"
					/>
					<template v-if="validate.fiscal_identification.$error">
						<div v-for="(error, index) in validate.fiscal_identification.$errors" :key="index" class="text-danger mt-2">
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


			<div class="col-span-12 md:col-span-6 lg:col-span-5">
				<div class="input-form">
					<label for="surname" class="form-label w-full">
						{{ $t("surname") }}
					</label>
					<input
						v-model.trim="validate.surname.$model"
						id="surname"
						type="text"
						name="surname"
						class="form-control"
						:class="{ 'border-danger': validate.surname.$error }"
					/>
					<template v-if="validate.surname.$error">
						<div v-for="(error, index) in validate.surname.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>

			<div class="col-span-12 md:col-span-12 lg:col-span-3">
				<div class="input-form">
					<label for="language_id" class="form-label w-full">
						{{ $t("language") }}<InfoIcon class="inline-flex ml-1 -mt-2 w-4 h-4 text-primary"></InfoIcon>
					</label>
					<TomSelect v-model.trim="validate.language_id.$model" id="language_id" name="language_id" :options="{
						placeholder: $t('select_lang'),
					}" class="form-control w-full"
						:class="{ 'border-danger': validate.language_id.$error }">

						<option v-for="lang in selectLangs" :value="lang.id">
							{{ lang.name }}
						</option>
					</TomSelect>
					<template v-if="validate.language_id.$error">
						<div v-for="(error, index) in validate.language_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>

			


			<div class="col-span-12 md:col-span-6 lg:col-span-8">
				<div class="input-form">
					<label for="email" class="form-label w-full">
						{{ $t("email") }}
					</label>
					<input
						v-model.trim="validate.email.$model"
						id="email"
						type="text"
						name="email"
						class="form-control"
						:class="{ 'border-danger': validate.email.$error }"
					/>
					<template v-if="validate.email.$error">
						<div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="password" class="form-label w-full">
						{{ $t("password") }}
					</label>

					<div class="relative sm:flex items-center">
						<input
							v-model.trim="validate.password.$model"
							id="password"
							:type="passwordFieldType"
							name="password"
							class="form-control"
							:class="{ 'border-danger': validate.password.$error }"
						/>
						<EyeIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer" @click="switchVisibility" />
					</div>

					<template v-if="validate.password.$error">
						<div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>

			

			<div class="col-span-12 flex p-5 bg-primary text-white self-stretch rounded-md">
            <div class="col-span-1 mr-2">
              <InfoIcon></InfoIcon>
            </div>
            <div class="col-span-11 text-left">
              {{ $t("employee_lang_info") }}
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
	import useEmployees from '@/composables/employees';
	import useRoles from '@/composables/roles';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import enumRoles from '@/enums/enum_roles.js';
	import useLanguage from '@/composables/languages';

	const { employee, employees, getEmployee, getEmployees } = useEmployees();
	const { languages, getLanguages } = useLanguage();
	const { roles, getRoles } = useRoles();
	const { t } = useI18n();
	const props = defineProps(['employeeId']);
	const emit = defineEmits(['cancelEdit', 'updateEmployeeForm']);



	const selectRoles = ref();
	const selectLangs = ref();
	const selectManagers = ref();


	const passwordFieldType = ref("password");
	const switchVisibility = () => {
		passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
	}



	const rules = {
		role_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		manager_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		name: {
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
			minLength: helpers.withMessage(t("form.minLength"), minLength(2)),
		},
		language_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		role_id: "",
		manager_id: "",
		name: "",
		surname: "",
		fiscal_identification: "",
		email: "",
		password: "",
		language_id: "1",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {

			if(formData.manager_id === '-'){
				formData.manager_id = 0;
			}

			emit('updateEmployeeForm', employee.value.id, formData);
		}
	};




	onMounted(async () => {
		await getEmployee(props.employeeId);
		await getRoles();
		await getLanguages();
		//Select Roles
		const newRoles = roles.value.filter((role) => {
			return parseInt(role.id) === enumRoles.MANAGER_ID || 
			parseInt(role.id) === enumRoles.TRAFFIC_CHIEF_ID ||
			parseInt(role.id) === enumRoles.TRAFFIC_MANAGER_ID;
		});
		selectRoles.value = newRoles;

		//Load Data
		formData.role_id = employee.value.user.roles[0].id.toString();
		formData.name = employee.value.name;
		formData.surname = employee.value.surname;
		formData.fiscal_identification = employee.value.fiscal_identification;
		formData.email = employee.value.user.email;
		formData.password = '';
		formData.language_id = employee.value.language_id.toString();

		//select.value = employee.value.user.roles[0].id.toString();
		//Select Languages
		selectLangs.value = languages.value;


		await getEmployees();
		selectManagers.value = employees.value;

		if(employee.value.manager){
			formData.manager_id = employee.value.manager?.id.toString();
		}
		

	});

</script>
