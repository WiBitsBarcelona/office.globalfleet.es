<template>
	<!-- BEGIN: Form -->
	<form class="validate-form" @submit.prevent="save">

		<!-- BEGIN: container -->
		<div class="grid grid-cols-12 gap-6">

			<div class="col-span-12 md:col-span-5 lg:col-span-5">
				<div class="input-form">
					<label for="action_type_id" class="form-label w-full">
						{{ $t("action") }}
					</label>

					<TomSelect 
						v-model.trim="validate.action_type_id.$model"
						id="action_type_id" 
						name="action_type_id" 
						:options="{
							placeholder: $t('message.select'),
						}" 
						class="form-control w-full"
						:class="{ 'border-danger': validate.action_type_id.$error }"
					>

						<option :value="0"></option>
						<option v-for="item in selectActionTypes" :value="item.id">
							{{ item.name }}
						</option>

					</TomSelect>



					<template v-if="validate.action_type_id.$error">
						<div v-for="(error, index) in validate.action_type_id.$errors" :key="index"
							class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-5 lg:col-span-5">
				<div class="input-form">
					<label for="action_type_model" class="form-label w-full">
						{{ $t("action_type") }}
					</label>

					<TomSelect 
						v-model.trim="validate.action_type_model.$model"
						id="action_type_model" 
						name="action_type_model" 
						:options="{
							placeholder: $t('message.select'),
						}" 
						class="form-control w-full"
						:class="{ 'border-danger': validate.action_type_model.$error }"
						@change="onChangeSelectActionModel"	
					>

						<option :value="0"></option>
						<option v-for="item in selectActionTypeModel" :value="item.id">
							{{ item.name }}
						</option>
					</TomSelect>

					<template v-if="validate.action_type_model.$error">
						<div v-for="(error, index) in validate.action_type_model.$errors" :key="index"
							class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>



			<div class="col-span-12 md:col-span-2 lg:col-span-2">
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
						:class="{ 'border-danger': validate.order_number.$error }" />
					<template v-if="validate.order_number.$error">
						<div v-for="(error, index) in validate.order_number.$errors" :key="index" class="text-danger mt-2">
							{{ error.$message }}
						</div>
					</template>
				</div>
			</div>


			<div class="col-span-12 md:col-span-5 lg:col-span-5" v-if="isShowActionFormField">
				<div class="input-form">
					<label for="action_form_field_id" class="form-label w-full">
						{{ $t("form.name") }}
					</label>

					<TomSelect 
						v-model.trim="validate.action_form_field_id.$model"
						id="action_form_field_id" 
						name="action_form_field_id" 
						:options="{
							placeholder: $t('message.select'),
						}" 
						class="form-control w-full"
						:class="{ 'border-danger': validate.action_form_field_id.$error }">

						<option :value="0"></option>
						<option v-for="item in selectActionFormFields" :value="item.id">
							{{ item.name }}
						</option>
					</TomSelect>

					<template v-if="validate.action_form_field_id.$error">
						<div v-for="(error, index) in validate.action_form_field_id.$errors" :key="index"
							class="text-danger mt-2">
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

					<textarea v-model.trim="validate.description.$model" id="description" name="description"
						class="form-control">
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
					<button @click.prevent="emit('cancelActionStageForm')" class="btn btn-danger">
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
import useActionFormField from '@/composables/action_form_fields.js';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { helper as $h } from "@/utils/helper";

import enumActionTask from '@/enums/enum_action_task.js';



const { t } = useI18n();
const { actionTypes, getActionTypes } = useActionType();
const { actionFormFields, getActionFormFields } = useActionFormField();

const emit = defineEmits(['cancelActionStageForm', 'addActionStageForm']);
const props = defineProps(['arrStages']);

//const props = defineProps(['stageIndex']);






const selectActionTypes = ref([]);
const selectActionTypeModel = ref([
	{ id: 0, name: '' },
	{ id: enumActionTask.CAMERA_ID, name: 'Camara' },
	{ id: enumActionTask.SCANNER_ID, name: 'Escaner' },
	{ id: enumActionTask.FORM_ID, name: 'Formulario' },
]);


const selectActionFormFields = ref([]);

const isShowActionFormField = ref(false);


const rules = {
	action_type_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	order_number: {
		required: helpers.withMessage(t("form.required"), required),
	},
	action_type_model: {
		required: helpers.withMessage(t("form.required"), required),
	},
	description: {
	},
	action_form_field_id: {
	},
};




let stageFake = {
	uuid: uuidv4(),
    stage_type_id: "1",
    reference_number: "-",
    name: "",
    order_number: "",
    client_name: "-",
    address: "-",
    phone: "-",
    zip_code: "-",
    latitude: "-",
    longitude: "-",
    route_code: "-",
    route_name: "-",
    description: "",
    execution_at: $h.nowTimestamp('-').substr(0,16),
}




const formData = reactive({
	uuid: uuidv4(),
	action_type_id: "",
	action_type_model: "",
	action_form_field_id: "",
	action_form_field_name: "",
	action_type_name: "",
	order_number: "",
	description: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = () => {

	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {

		//TODO 
		if (parseInt(formData.action_type_model) === enumActionTask.FORM_ID) {
			if(formData.action_form_field_id === '' || formData.action_form_field_id === undefined){
				//TODO alert

				Swal.fire({
					icon: 'warning',
					title: t("Complete el campo del formulario"),
					showCancelButton: false,
					confirmButtonText: t("message.ok"),
					confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
				});

				return;
			}

		}


		//Find element action
		const selectedAction = selectActionTypes.value.find(elem => elem.id === parseInt(formData.action_type_id));
		formData.action_type_name = selectedAction.name;



		//Find element action form field
		if (parseInt(formData.action_type_model) === enumActionTask.FORM_ID) {
			const selectedForm = selectActionFormFields.value.find(elem => elem.id === parseInt(formData.action_form_field_id));
			formData.action_form_field_name = selectedForm.name;
		}

		stageFake.name = selectedAction.name;

		emit('addActionStageForm', stageFake, { ...formData });
	}
};


const onChangeSelectActionModel = () => {
	
	if (parseInt(formData.action_type_model) === enumActionTask.FORM_ID) {

		isShowActionFormField.value = true;

	} else {

		isShowActionFormField.value = false;

	}

}




onMounted(async () => {

	await getActionTypes();
	selectActionTypes.value = actionTypes.value;

	await getActionFormFields();
	selectActionFormFields.value = actionFormFields.value;


	if(props.arrStages.length === 0){
        stageFake.order_number = 1;
		formData.order_number = 1;
    }else{
        stageFake.order_number = props.arrStages.length + 1;
        formData.order_number = props.arrStages.length + 1;
    }

});

</script>
