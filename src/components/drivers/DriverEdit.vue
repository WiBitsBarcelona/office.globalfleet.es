<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="employee_id" class="form-label w-full">
						{{ $t("employee") }}
					</label>

					<TomSelect 
						v-model="validate.employee_id.$model" 
						id="employee_id" 
						name="employee_id" 
						:options="{
							placeholder: $t('select_driver_manager'),
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


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
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


			<div class="col-span-12 md:col-span-6 lg:col-span-5">
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
			<div class="col-span-12 md:col-span-12 lg:col-span-2">
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

			<div class="col-span-12 flex p-5 bg-primary text-white self-stretch rounded-md">
            <div class="col-span-1 mr-2">
              <InfoIcon></InfoIcon>
            </div>
            <div class="col-span-11 text-left">
              {{ $t("driver_lang_info") }} 
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
	import useDrivers from '@/composables/drivers';
	import useEmployees from "@/composables/employees";
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';
	import useLanguage from '@/composables/languages';

	const { driver, getDriver } = useDrivers();
	const { employees, getEmployees } = useEmployees();
	const { t } = useI18n();
	const props = defineProps(['driverId']);
	const emit = defineEmits(['cancelEdit', 'updateDriverForm']);
	const { languages, getLanguages } = useLanguage();
	
	const selectEmployees = ref();
	const passwordFieldType = ref("password");
	const selectLangs = ref();


	const switchVisibility = () => {
		passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
	}

	const rules = {
		employee_id: {
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
		language_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		employee_id: "",
		name: "",
		surname: "",
		fiscal_identification: "",
		email: "",
		language_id: "1",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			console.log(formData);
			emit('updateDriverForm', driver.value.id, formData);
		}
	};

	onMounted(async () => {
		await getDriver(props.driverId);
		await getEmployees();
		await getLanguages();

		selectEmployees.value = employees.value;

		formData.employee_id = driver.value.employee[0].id.toString();

		formData.name = driver.value.name;
		formData.surname = driver.value.surname;
		formData.fiscal_identification = driver.value.fiscal_identification;
		formData.email = driver.value.user.email;
		formData.language_id = driver.value.language_id.toString();
		
		//Select Languages
		selectLangs.value = languages.value;

	});

</script>
