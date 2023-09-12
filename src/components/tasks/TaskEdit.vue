<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="stage_id" class="form-label w-full">
						{{ $t("stage_id") }}
					</label>
					<input
						v-model.trim="validate.stage_id.$model"
						id="stage_id"
						type="text"
						name="stage_id"
						class="form-control"
						:class="{ 'border-danger': validate.stage_id.$error }"
					/>
					<template v-if="validate.stage_id.$error">
						<div v-for="(error, index) in validate.stage_id.$errors" :key="index" class="text-danger mt-2">
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
					<label for="task_type_id" class="form-label w-full">
						{{ $t("task_type_id") }}
					</label>
					<input
						v-model.trim="validate.task_type_id.$model"
						id="task_type_id"
						type="text"
						name="task_type_id"
						class="form-control"
						:class="{ 'border-danger': validate.task_type_id.$error }"
					/>
					<template v-if="validate.task_type_id.$error">
						<div v-for="(error, index) in validate.task_type_id.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="task_status_id" class="form-label w-full">
						{{ $t("task_status_id") }}
					</label>
					<input
						v-model.trim="validate.task_status_id.$model"
						id="task_status_id"
						type="text"
						name="task_status_id"
						class="form-control"
						:class="{ 'border-danger': validate.task_status_id.$error }"
					/>
					<template v-if="validate.task_status_id.$error">
						<div v-for="(error, index) in validate.task_status_id.$errors" :key="index" class="text-danger mt-2">
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
	import useTasks from '@/composables/tasks';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { task, getTask } = useTasks();
	const { t } = useI18n();
	const props = defineProps(['taskId']);
	const emit = defineEmits(['cancelEdit', 'updateTaskForm']);

	const rules = {
		stage_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		task_type_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		task_status_id: {
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
		started_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
		finished_at: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		stage_id: "",
		name: "",
		task_type_id: "",
		task_status_id: "",
		company_id: "",
		employee_id: "",
		order_number: "",
		started_at: "",
		finished_at: "",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			emit('updateTaskForm', task.value.id, formData);
		}
	};

	onMounted(async () => {
		await getTask(props.taskId);
		formData.stage_id = task.value.stage_id;
		formData.name = task.value.name;
		formData.task_type_id = task.value.task_type_id;
		formData.task_status_id = task.value.task_status_id;
		formData.company_id = task.value.company_id;
		formData.employee_id = task.value.employee_id;
		formData.order_number = task.value.order_number;
		formData.started_at = task.value.started_at;
		formData.finished_at = task.value.finished_at;
	});

</script>
