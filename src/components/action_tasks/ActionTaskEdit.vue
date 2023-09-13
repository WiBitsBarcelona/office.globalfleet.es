<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="task_id" class="form-label w-full">
						{{ $t("task_id") }}
					</label>
					<input
						v-model.trim="validate.task_id.$model"
						id="task_id"
						type="text"
						name="task_id"
						class="form-control"
						:class="{ 'border-danger': validate.task_id.$error }"
					/>
					<template v-if="validate.task_id.$error">
						<div v-for="(error, index) in validate.task_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="action_type_id" class="form-label w-full">
						{{ $t("action_type_id") }}
					</label>
					<input
						v-model.trim="validate.action_type_id.$model"
						id="action_type_id"
						type="text"
						name="action_type_id"
						class="form-control"
						:class="{ 'border-danger': validate.action_type_id.$error }"
					/>
					<template v-if="validate.action_type_id.$error">
						<div v-for="(error, index) in validate.action_type_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
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
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
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
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="order_number" class="form-label w-full">
						{{ $t("order_number") }}
					</label>
					<input
						v-model.trim="validate.order_number.$model"
						id="order_number"
						type="text"
						name="order_number"
						class="form-control"
						:class="{ 'border-danger': validate.order_number.$error }"
					/>
					<template v-if="validate.order_number.$error">
						<div v-for="(error, index) in validate.order_number.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="description" class="form-label w-full">
						{{ $t("description") }}
					</label>
					<input
						v-model.trim="validate.description.$model"
						id="description"
						type="text"
						name="description"
						class="form-control"
						:class="{ 'border-danger': validate.description.$error }"
					/>
					<template v-if="validate.description.$error">
						<div v-for="(error, index) in validate.description.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
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


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
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
	import useActionsTasks from '@/composables/actions_tasks';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { actionTask, getActionTask } = useActionsTasks();
	const { t } = useI18n();
	const props = defineProps(['actionTaskId']);
	const emit = defineEmits(['cancelEdit', 'updateActionTaskForm']);

	const rules = {
		task_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		action_type_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		company_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		employee_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		order_number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		description: {
			required: helpers.withMessage(t("form.required"), required),
		},
		started_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
		finished_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		task_id: "",
		action_type_id: "",
		company_id: "",
		employee_id: "",
		order_number: "",
		description: "",
		started_at: "",
		finished_at: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateActionTaskForm', actionTask.value.id, formData);
		}
	};

	onMounted(async () => {
		await getActionTask(props.actionTaskId);
		formData.task_id = actionTask.value.task_id;
		formData.action_type_id = actionTask.value.action_type_id;
		formData.company_id = actionTask.value.company_id;
		formData.employee_id = actionTask.value.employee_id;
		formData.order_number = actionTask.value.order_number;
		formData.description = actionTask.value.description;
		formData.started_at = actionTask.value.started_at;
		formData.finished_at = actionTask.value.finished_at;
	});

</script>
