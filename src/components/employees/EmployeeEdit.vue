<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-12 lg:col-span-12">

				<div class="input-form">
					<label for="user_id" class="form-label w-full">
						{{ $t("user_id") }}
					</label>
					<input
						v-model.trim="validate.user_id.$model"
						id="user_id"
						type="text"
						name="user_id"
						class="form-control"
						:class="{ 'border-danger': validate.user_id.$error }"
					/>
					<template v-if="validate.user_id.$error">
						<div v-for="(error, index) in validate.user_id.$errors" :key="index" class="text-danger mt-2">
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

				<div class="input-form">
					<label for="phone_prefix" class="form-label w-full">
						{{ $t("phone_prefix") }}
					</label>
					<input
						v-model.trim="validate.phone_prefix.$model"
						id="phone_prefix"
						type="text"
						name="phone_prefix"
						class="form-control"
						:class="{ 'border-danger': validate.phone_prefix.$error }"
					/>
					<template v-if="validate.phone_prefix.$error">
						<div v-for="(error, index) in validate.phone_prefix.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="phone" class="form-label w-full">
						{{ $t("phone") }}
					</label>
					<input
						v-model.trim="validate.phone.$model"
						id="phone"
						type="text"
						name="phone"
						class="form-control"
						:class="{ 'border-danger': validate.phone.$error }"
					/>
					<template v-if="validate.phone.$error">
						<div v-for="(error, index) in validate.phone.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>

				<div class="input-form">
					<label for="cometchat_uid" class="form-label w-full">
						{{ $t("cometchat_uid") }}
					</label>
					<input
						v-model.trim="validate.cometchat_uid.$model"
						id="cometchat_uid"
						type="text"
						name="cometchat_uid"
						class="form-control"
						:class="{ 'border-danger': validate.cometchat_uid.$error }"
					/>
					<template v-if="validate.cometchat_uid.$error">
						<div v-for="(error, index) in validate.cometchat_uid.$errors" :key="index" class="text-danger mt-2">
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
	import useEmployees from '@/composables/employees';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { employee, getEmployee } = useEmployees();
	const { t } = useI18n();
	const props = defineProps(['employeeId']);
	const emit = defineEmits(['cancelEdit', 'updateEmployeeForm']);

	const rules = {
		user_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		company_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		name: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		surname: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		fiscal_identification: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		phone_prefix: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		phone: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
		cometchat_uid: {
			required: helpers.withMessage(t("form.required"), required),
			minLength: minLength(2),
		},
	};

	const formData = reactive({
		user_id: "",
		company_id: "",
		name: "",
		surname: "",
		fiscal_identification: "",
		phone_prefix: "",
		phone: "",
		cometchat_uid: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateEmployeeForm', employee.value.id, formData);
		}
	};

	onMounted(async () => {
		await getEmployee(props.employeeId);
		formData.user_id = employee.value.user_id;
		formData.company_id = employee.value.company_id;
		formData.name = employee.value.name;
		formData.surname = employee.value.surname;
		formData.fiscal_identification = employee.value.fiscal_identification;
		formData.phone_prefix = employee.value.phone_prefix;
		formData.phone = employee.value.phone;
		formData.cometchat_uid = employee.value.cometchat_uid;
	});

</script>
