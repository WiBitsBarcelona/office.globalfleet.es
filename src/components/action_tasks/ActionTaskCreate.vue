<template>

	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">


		{{  taskIndex }}



		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-8 lg:col-span-8">
                <div class="input-form">
                    <label for="action_type_id" class="form-label w-full">
                        {{ $t("action_type_id") }}
                    </label>

                    <select 
                        v-model.trim="validate.action_type_id.$model" 
                        id="action_type_id"          
                        name="action_type_id"
                        class="form-control" 
                        :class="{ 'border-danger': validate.action_type_id.$error }">

                        <option value="" selected>Seleccione</option>
                        <option v-for="item in selectActionTypes" :value="item.id">
                            {{ item.name }}
                        </option>

                    </select>



                    <template v-if="validate.action_type_id.$error">
                        <div v-for="(error, index) in validate.action_type_id.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>





			<div class="col-span-12 md:col-span-4 lg:col-span-4">
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


			<div class="col-span-12 md:col-span-12 lg:col-span-12">
				<div class="input-form">
					<label for="description" class="form-label w-full">
						{{ $t("description") }}
					</label>
					
                    <textarea v-model.trim="validate.description.$model" id="description" name="description" class="form-control">
                    </textarea>

					<template v-if="validate.description.$error">
						<div v-for="(error, index) in validate.description.$errors" :key="index" class="text-danger mt-2">
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
					<button @click.prevent="emit('cancelActionTaskForm')" class="btn btn-danger">
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
	//import useActionsTasks from '@/composables/action_tasks';
	import useActionType from '@/composables/action_types';
	import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';
	import { helpers } from '@vuelidate/validators';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const { actionTypes, getActionTypes } = useActionType();
	
	const emit = defineEmits(['cancelActionTaskForm', 'addActionTaskForm']);
	const props = defineProps(['stageIndex', 'taskIndex']);



	const selectActionTypes = ref([]);




	const rules = {
		action_type_id: {
			required: helpers.withMessage(t("form.required"), required),
		},
		order_number: {
			required: helpers.withMessage(t("form.required"), required),
		},
		description: {
			
		},
	};

	const formData = reactive({
		action_type_id: "",
		action_type_name: "",
		order_number: "1",
		description: "Descripcion Action Tasks",
	});

	const validate = useVuelidate(rules, toRefs(formData));

	const save = () => {


		//Find element action
		const selectedAction = selectActionTypes.value.find(elem => elem.id === formData.action_type_id);
    	formData.action_type_name = selectedAction.name;


		emit('addActionTaskForm', props.stageIndex, props.taskIndex, {...formData});

		// validate.value.$touch();
		// if (validate.value.$invalid) {
		// 	//TODO
		// } else {
		// 	//emit('saveActionTaskForm', formData);
		// 	//
		// }
	};

	onMounted(async () => {
		
		await getActionTypes();
		selectActionTypes.value = actionTypes.value;


	});

</script>
