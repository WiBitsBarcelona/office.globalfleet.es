<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

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

	import { onMounted, reactive, toRefs } from 'vue';
	import useTasks from '@/composables/tasks';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { task, getTask } = useTasks();
	const { t } = useI18n();
	const props = defineProps(['taskId']);
	const emit = defineEmits(['cancelTaskEditForm', 'updateTaskForm']);

	const rules = {
		name: {
			required: helpers.withMessage(t("form.required"), required),
		},
		order_number: {
			required: helpers.withMessage(t("form.required"), required),
		},
	};

	const formData = reactive({
		name: "",
		order_number: "",
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
		await getTask(props.taskId);

		console.log({...task.value});

		formData.name = task.value.name;
		formData.order_number = task.value.order_number;

	});

</script>
