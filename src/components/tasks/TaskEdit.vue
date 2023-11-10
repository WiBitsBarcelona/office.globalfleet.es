<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-6">
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


			<div class="col-span-12 md:col-span-6 lg:col-span-2">
				<div class="input-form">
					<label for="order_number" class="form-label w-full">
						{{ $t("order_number") }}
					</label>
					<input
						v-model.trim="validate.order_number.$model"
						id="order_number"
						type="number"
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
						<label for="task_status_id" class="form-label w-full">
							{{ $t("status") }}
						</label>

						<TomSelect v-model.trim="validate.task_status_id.$model" id="task_status_id" name="task_status_id" :options="{
							placeholder: $t('message.select'),
						}" class="form-control w-full" :class="{ 'border-danger': validate.task_status_id.$error }">

							<option v-for="item in selectTaskStatuses" :value="item.id">
								{{ item.name }}
							</option>

						</TomSelect>


						<template v-if="validate.task_status_id.$error">
							<div v-for="(error, index) in validate.task_status_id.$errors" :key="index" class="text-danger mt-2">
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
					<button @click.prevent="emit('cancelTaskEditForm')" class="btn btn-danger">
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
	import useTasks from '@/composables/tasks';
	import useTaskStatus from '@/composables/task_statuses';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { task, getTask } = useTasks();
	const { taskStatuses, getTaskStatuses } = useTaskStatus();


	const { t } = useI18n();
	const props = defineProps(['taskId']);
	const emit = defineEmits(['cancelTaskEditForm', 'updateTaskForm']);

	const selectTaskStatuses = ref([]);


	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		order_number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		task_status_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		order_number: "",
		task_status_id: ""
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {
		validate.value.$touch();
		if (validate.value.$invalid) {
			//TODO
		} else {
			formData.stage_id = task.value.stage_id;
			emit('updateTaskForm', task.value.id, formData);
		}
	};

	onMounted(async () => {

		await getTaskStatuses();
		selectTaskStatuses.value = taskStatuses.value;


		await getTask(props.taskId);
		console.log({...task.value});

		formData.name = task.value.name;
		formData.order_number = task.value.order_number;
		formData.task_status_id = task.value.task_status_id.toString();

		console.log(task.value.task_status_id);

	});

</script>
