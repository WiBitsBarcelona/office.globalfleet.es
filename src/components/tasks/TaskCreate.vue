<template>
	<h2 class="text-lg font-medium mb-5">
		{{ $t("task") }}
	</h2>

	<!-- BEGIN: Form -->
	<form class="validate-form1" @submit.prevent="saveTask">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-6 lg:col-span-4">
				<div class="input-form">
					<label for="name" class="form-label w-full">
						{{ $t("name") }}
					</label>
					<input v-model.trim="validateTask.name.$model" id="name" type="text" name="name" class="form-control"
						:class="{ 'border-danger': validateTask.name.$error }" />
					<template v-if="validateTask.name.$error">
						<div v-for="(error, index) in validateTask.name.$errors" :key="index" class="text-danger mt-2">
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
					<input v-model.trim="validateTask.order_number.$model" id="order_number" type="text" name="order_number"
						class="form-control" :class="{ 'border-danger': validateTask.order_number.$error }" />
					<template v-if="validateTask.order_number.$error">
						<div v-for="(error, index) in validateTask.order_number.$errors" :key="index"
							class="text-danger mt-2">
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
					<button @click.prevent="emit('cancelTaskForm')" class="btn btn-danger">
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
//import useTasks from '@/composables/tasks';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';

const { t } = useI18n();
const emit = defineEmits(['cancelTaskForm', 'addTaskForm']);

const props = defineProps(['stageIndex']);



const rulesTask = {
	name: {
		required: helpers.withMessage(t("form.required"), required),
	},
	order_number: {
		required: helpers.withMessage(t("form.required"), required),
	},
};

const formDataTask = reactive({
	uuid: uuidv4(),
	name: "ALBARÁN 520",
	order_number: "1",
});





const validateTask = useVuelidate(rulesTask, toRefs(formDataTask));

const saveTask = () => {


	emit('addTaskForm', props.stageIndex, { ...formDataTask });


	// validateTask.value.$touch();
	// if (validateTask.value.$invalid) {
	// 	//TODO
	// } else {
	// 	//emit('saveTaskForm', formDataTask);
	// }
};

onMounted(async () => {
	// TODO here implements...
});

</script>
