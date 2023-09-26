<template>
    <!-- BEGIN: Page Layout -->
    <h2 class="text-lg font-medium mb-5">
        {{ $t("stage") }}
    </h2>



    <!-- BEGIN: Form -->
    <form class="validate-form2">

        <!-- BEGIN: container -->
        <div class="grid grid-cols-12 gap-6">

            <div class="col-span-12 md:col-span-8 lg:col-span-8">
                <div class="input-form">
                    <label for="name" class="form-label w-full">
                        {{ $t("name") }}
                    </label>
                    <input v-model.trim="validateStage.name.$model" id="name" type="text" name="name" class="form-control"
                        :class="{ 'border-danger': validateStage.name.$error }" />
                    <template v-if="validateStage.name.$error">
                        <div v-for="(error, index) in validateStage.name.$errors" :key="index" class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>

            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <div class="input-form">
                    <label for="reference_number" class="form-label w-full">
                        {{ $t("reference_number") }}
                    </label>
                    <input v-model.trim="validateStage.reference_number.$model" id="reference_number" type="text"
                        name="reference_number" class="form-control"
                        :class="{ 'border-danger': validateStage.reference_number.$error }" />
                    <template v-if="validateStage.reference_number.$error">
                        <div v-for="(error, index) in validateStage.reference_number.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>



            <div class="col-span-12 md:col-span-6 lg:col-span-5">
                <div class="input-form">
                    <label for="activity_type_id" class="form-label w-full">
                        {{ $t("activity") }}
                    </label>

                    <select 
                        v-model.trim="validateStage.activity_type_id.$model" 
                        id="activity_type_id"          
                        name="activity_type_id"
                        class="form-control" 
                        :class="{ 'border-danger': validateStage.activity_type_id.$error }">

                        <option value="" selected>Seleccione</option>
                        <option v-for="item in selectActivityTypes" :value="item.id">
                            {{ item.name }}
                        </option>

                    </select>



                    <template v-if="validateStage.activity_type_id.$error">
                        <div v-for="(error, index) in validateStage.activity_type_id.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 lg:col-span-5">
                <div class="input-form">
                    <label for="stage_type_id" class="form-label w-full">
                        {{ $t("stage_type") }}
                    </label>

                    <select 
                        v-model.trim="validateStage.stage_type_id.$model" 
                        id="stage_type_id" 
                        name="stage_type_id"
                        class="form-control" 
                        :class="{ 'border-danger': validateStage.stage_type_id.$error }">

                        <option value="" selected>Seleccione</option>
                        <option v-for="item in selectStageTypes" :value="item.id">
                            {{ item.name }}
                        </option>

                    </select>



                    <template v-if="validateStage.stage_type_id.$error">
                        <div v-for="(error, index) in validateStage.stage_type_id.$errors" :key="index"
                            class="text-danger mt-2">
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
                    <input v-model.trim="validateStage.order_number.$model" id="order_number" type="number"
                        name="order_number" class="form-control"
                        :class="{ 'border-danger': validateStage.order_number.$error }" />
                    <template v-if="validateStage.order_number.$error">
                        <div v-for="(error, index) in validateStage.order_number.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>



            <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <div class="input-form">
                    <label for="client_name" class="form-label w-full">
                        {{ $t("client_name") }}
                    </label>
                    <input v-model.trim="validateStage.client_name.$model" id="client_name" type="text" name="client_name"
                        class="form-control" :class="{ 'border-danger': validateStage.client_name.$error }" />
                    <template v-if="validateStage.client_name.$error">
                        <div v-for="(error, index) in validateStage.client_name.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-8">
                <div class="input-form">
                    <label for="address" class="form-label w-full">
                        {{ $t("address") }}
                    </label>
                    <input v-model.trim="validateStage.address.$model" id="address" type="text" name="address"
                        class="form-control" :class="{ 'border-danger': validateStage.address.$error }" />
                    <template v-if="validateStage.address.$error">
                        <div v-for="(error, index) in validateStage.address.$errors" :key="index" class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="phone" class="form-label w-full">
                        {{ $t("phone") }}
                    </label>
                    <input v-model.trim="validateStage.phone.$model" id="phone" type="text" name="phone"
                        class="form-control" :class="{ 'border-danger': validateStage.phone.$error }" />
                    <template v-if="validateStage.phone.$error">
                        <div v-for="(error, index) in validateStage.phone.$errors" :key="index" class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="zip_code" class="form-label w-full">
                        {{ $t("zip_code") }}
                    </label>
                    <input v-model.trim="validateStage.zip_code.$model" id="zip_code" type="text" name="zip_code"
                        class="form-control" :class="{ 'border-danger': validateStage.zip_code.$error }" />
                    <template v-if="validateStage.zip_code.$error">
                        <div v-for="(error, index) in validateStage.zip_code.$errors" :key="index" class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="latitude" class="form-label w-full">
                        {{ $t("latitude") }}
                    </label>
                    <input v-model.trim="validateStage.latitude.$model" id="latitude" type="text" name="latitude"
                        class="form-control" :class="{ 'border-danger': validateStage.latitude.$error }" />
                    <template v-if="validateStage.latitude.$error">
                        <div v-for="(error, index) in validateStage.latitude.$errors" :key="index" class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="longitude" class="form-label w-full">
                        {{ $t("longitude") }}
                    </label>
                    <input v-model.trim="validateStage.longitude.$model" id="longitude" type="text" name="longitude"
                        class="form-control" :class="{ 'border-danger': validateStage.longitude.$error }" />
                    <template v-if="validateStage.longitude.$error">
                        <div v-for="(error, index) in validateStage.longitude.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="route_code" class="form-label w-full">
                        {{ $t("route_code") }}
                    </label>
                    <input v-model.trim="validateStage.route_code.$model" id="route_code" type="text" name="route_code"
                        class="form-control" :class="{ 'border-danger': validateStage.route_code.$error }" />
                    <template v-if="validateStage.route_code.$error">
                        <div v-for="(error, index) in validateStage.route_code.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <div class="input-form">
                    <label for="route_name" class="form-label w-full">
                        {{ $t("route_name") }}
                    </label>
                    <input v-model.trim="validateStage.route_name.$model" id="route_name" type="text" name="route_name"
                        class="form-control" :class="{ 'border-danger': validateStage.route_name.$error }" />
                    <template v-if="validateStage.route_name.$error">
                        <div v-for="(error, index) in validateStage.route_name.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


           


            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="input-form">
                    <label for="execution_at" class="form-label w-full">
                        {{ $t("execution_at") }}
                    </label>
                    <input v-model.trim="validateStage.execution_at.$model" id="execution_at" type="text"
                        name="execution_at" class="form-control"
                        :class="{ 'border-danger': validateStage.execution_at.$error }" />
                        
                    <template v-if="validateStage.execution_at.$error">
                        <div v-for="(error, index) in validateStage.execution_at.$errors" :key="index"
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


                    <textarea v-model.trim="validateStage.description.$model" id="description" name="description" class="form-control">
                    </textarea>
                    
                    
                </div>
            </div>


            <!-- BEGIN: Buttons -->
            <div class="col-span-12 md:col-span-12 lg:col-span-12">
                <div class="flex justify-center">
                    <button type="button" class="btn btn-primary mr-5" @click.prevent="saveStage">
                        {{ $t("save") }}
                    </button>
                    <button @click.prevent="emit('cancelStageForm')" class="btn btn-danger">
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
//import useStage from '@/composables/stages';
import useStageType from '@/composables/stage_types.js';
import useActivityType from '@/composables/activity_types.js';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';


import { v4 as uuidv4 } from 'uuid';



const { t } = useI18n();
const { stageTypes, getStageTypes } = useStageType();
const { activityTypes, getActivityTypes } = useActivityType();



const emit = defineEmits(['addStageForm', 'cancelStageForm']);

//const props = defineProps(['arrStages']);




const selectStageTypes = ref([]);
const selectActivityTypes = ref([]);



const rulesStage = {
    activity_type_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    stage_type_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    reference_number: {
        required: helpers.withMessage(t("form.required"), required),
    },
    name: {
        required: helpers.withMessage(t("form.required"), required),
    },
    order_number: {
        required: helpers.withMessage(t("form.required"), required),
    },
    client_name: {
        required: helpers.withMessage(t("form.required"), required),
    },
    address: {
        required: helpers.withMessage(t("form.required"), required),
    },
    phone: {
        required: helpers.withMessage(t("form.required"), required),
    },
    zip_code: {
        required: helpers.withMessage(t("form.required"), required),
    },
    latitude: {
        required: helpers.withMessage(t("form.required"), required),
    },
    longitude: {
        required: helpers.withMessage(t("form.required"), required),
    },
    route_code: {
        required: helpers.withMessage(t("form.required"), required),
    },
    route_name: {
        required: helpers.withMessage(t("form.required"), required),
    },
    description: {
    },
    execution_at: {
        required: helpers.withMessage(t("form.required"), required),
    }
};

const formDataStage = reactive({
    uuid: uuidv4(),
    activity_type_id: "",
    activity_type_name: "",
    stage_type_id: "3",
    reference_number: "1000",
    name: "Viaje Nuevo Hannover",
    order_number: "1",
    client_name: "Pepito",
    address: "Calle hambrosio 2-4",
    phone: "890890890",
    zip_code: "08029",
    latitude: "67.899978",
    longitude: "78.90099",
    route_code: "Route 678678",
    route_name: "Nombre Route",
    description: "Descripcion para la Etapa",
    execution_at: "2023-10-10",
});

const validateStage = useVuelidate(rulesStage, toRefs(formDataStage));

const saveStage = () => {

    


    validateStage.value.$touch();    
    if (validateStage.value.$invalid) {
        //TODO
    } else {


        //Find element activity
        const selectedActivity = selectActivityTypes.value.find(elem => elem.id === formDataStage.activity_type_id);
        formDataStage.activity_type_name = selectedActivity.name;

        emit('addStageForm', { ...formDataStage });

        console.log("Guarda Stage");
        //TODO reset fields
        
    }
};





onMounted(async () => {

    //Load stage types
    await getStageTypes();
    selectStageTypes.value = stageTypes.value;


    //Load activity types
    await getActivityTypes();
    selectActivityTypes.value = activityTypes.value;


});

</script>
