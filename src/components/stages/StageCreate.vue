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
                    <input v-model.trim="validate.name.$model" id="name" type="text" name="name" class="form-control"
                        :class="{ 'border-danger': validate.name.$error }" />
                    <template v-if="validate.name.$error">
                        <div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.reference_number.$model" id="reference_number" type="text"
                        name="reference_number" class="form-control"
                        :class="{ 'border-danger': validate.reference_number.$error }" />
                    <template v-if="validate.reference_number.$error">
                        <div v-for="(error, index) in validate.reference_number.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>



            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <div class="input-form">
                    <label for="activity_type_id" class="form-label w-full">
                        {{ $t("activity") }}
                    </label>

                    <TomSelect 
                        v-model.trim="validate.activity_type_id.$model" 
                        id="activity_type_id" 
                        name="activity_type_id" 
                        :options="{ placeholder: $t('message.select'),}" 
                        class="form-control w-full" 
                        :class="{ 'border-danger': validate.activity_type_id.$error }"
                    >

                        <option v-for="item in selectActivityTypes" :value="item.id">
                            {{ item.name }}
                        </option>

					</TomSelect>

                    <template v-if="validate.activity_type_id.$error">
                        <div v-for="(error, index) in validate.activity_type_id.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>

            <div class="col-span-12 md:col-span-4 lg:col-span-3">
                <div class="input-form">
                    <label for="stage_type_id" class="form-label w-full">
                        {{ $t("stage_type") }}
                    </label>

                    <TomSelect 
                        v-model.trim="validate.stage_type_id.$model"
                        id="stage_type_id" 
                        name="stage_type_id" 
                        :options="{
                            placeholder: $t('message.select'),
                        }" 
                        class="form-control w-full"
                        :class="{ 'border-danger': validate.stage_type_id.$error }">

                        <option v-for="item in selectStageTypes" :value="item.id">
                            {{ item.name }}
                        </option>

					</TomSelect>

                    <template v-if="validate.stage_type_id.$error">
                        <div v-for="(error, index) in validate.stage_type_id.$errors" :key="index"
                            class="text-danger mt-2">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </div>


            <div class="col-span-12 md:col-span-4 lg:col-span-3">
                <div class="input-form">
                    <label for="driver_id" class="form-label w-full">
                    {{ $t("trip_tow") }}
                    </label>

                    <TomSelect v-model.trim="validate.tow_id.$model" id="tow_id" name="tow_id" :options="{
                    placeholder: $t('message.select'),
                    }" class="form-control w-full" :class="{ 'border-danger': validate.tow_id.$error }">

                    <option v-for="item in selectTows" :value="item.id">
                        {{ item.name }} {{ item.plate }}
                    </option>

                    </TomSelect>


                    <template v-if="validate.tow_id.$error">
                    <div v-for="(error, index) in validate.tow_id.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.order_number.$model" id="order_number" type="number"
                        name="order_number" class="form-control"
                        :class="{ 'border-danger': validate.order_number.$error }" />
                    <template v-if="validate.order_number.$error">
                        <div v-for="(error, index) in validate.order_number.$errors" :key="index"
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
                    <input v-model.trim="validate.client_name.$model" id="client_name" type="text" name="client_name"
                        class="form-control" :class="{ 'border-danger': validate.client_name.$error }" />
                    <template v-if="validate.client_name.$error">
                        <div v-for="(error, index) in validate.client_name.$errors" :key="index"
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
                    <input v-model.trim="validate.address.$model" id="address" type="text" name="address"
                        class="form-control" :class="{ 'border-danger': validate.address.$error }" />
                    <template v-if="validate.address.$error">
                        <div v-for="(error, index) in validate.address.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.phone.$model" id="phone" type="text" name="phone"
                        class="form-control" :class="{ 'border-danger': validate.phone.$error }" />
                    <template v-if="validate.phone.$error">
                        <div v-for="(error, index) in validate.phone.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.zip_code.$model" id="zip_code" type="text" name="zip_code"
                        class="form-control" :class="{ 'border-danger': validate.zip_code.$error }" />
                    <template v-if="validate.zip_code.$error">
                        <div v-for="(error, index) in validate.zip_code.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.latitude.$model" id="latitude" type="text" name="latitude"
                        class="form-control" :class="{ 'border-danger': validate.latitude.$error }" />
                    <template v-if="validate.latitude.$error">
                        <div v-for="(error, index) in validate.latitude.$errors" :key="index" class="text-danger mt-2">
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
                    <input v-model.trim="validate.longitude.$model" id="longitude" type="text" name="longitude"
                        class="form-control" :class="{ 'border-danger': validate.longitude.$error }" />
                    <template v-if="validate.longitude.$error">
                        <div v-for="(error, index) in validate.longitude.$errors" :key="index"
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
                    <input v-model.trim="validate.route_code.$model" id="route_code" type="text" name="route_code"
                        class="form-control" :class="{ 'border-danger': validate.route_code.$error }" />
                    <template v-if="validate.route_code.$error">
                        <div v-for="(error, index) in validate.route_code.$errors" :key="index"
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
                    <input v-model.trim="validate.route_name.$model" id="route_name" type="text" name="route_name"
                        class="form-control" :class="{ 'border-danger': validate.route_name.$error }" />
                    <template v-if="validate.route_name.$error">
                        <div v-for="(error, index) in validate.route_name.$errors" :key="index"
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
                    <input 
                        v-model.trim="validate.execution_at.$model" 
                        id="execution_at" 
                        type="datetime-local"
                        name="execution_at" 
                        class="form-control"
                        :class="{ 'border-danger': validate.execution_at.$error }" 
                    />
                        
                    <template v-if="validate.execution_at.$error">
                        <div v-for="(error, index) in validate.execution_at.$errors" :key="index"
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


                    <textarea v-model.trim="validate.description.$model" id="description" name="description" class="form-control">
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
import useTow from '@/composables/tows.js';
import useActivityType from '@/composables/activity_types.js';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import { v4 as uuidv4 } from 'uuid';


const { t } = useI18n();
const { stageTypes, getStageTypes } = useStageType();
const { tows, getTows } = useTow();
const { activityTypes, getActivityTypes } = useActivityType();


const emit = defineEmits(['addStageForm', 'cancelStageForm']);
const props = defineProps(['arrStages', 'trip_tow_selected']);


const selectStageTypes = ref([]);
const selectActivityTypes = ref([]);
const selectTows = ref([]);


const rulesStage = {
    activity_type_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    stage_type_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    tow_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    tow_plate: {
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


// Only test

const formDataStage = reactive({
    uuid: uuidv4(),
    activity_type_id: "",
    activity_type_name: "",
    tow_id: "",
    tow_plate: "",
    stage_type_id: "3",
    stage_type_name: "",
    reference_number: "1000",
    name: "Etapa Hannover",
    order_number: "",
    client_name: "Pepito",
    address: "Calle hambrosio 2-4",
    phone: "890890890",
    zip_code: "08029",
    latitude: "67.899978",
    longitude: "78.90099",
    route_code: "Route 678678",
    route_name: "Nombre Route",
    description: "Descripcion para la Etapa",
    execution_at: $h.nowTimestamp('-').substr(0,16),
});






// const formDataStage = reactive({
//     uuid: uuidv4(),
//     activity_type_id: "",
//     activity_type_name: "",
//     tow_id: "",
//     tow_plate: "",
//     stage_type_id: "",
//     stage_type_name: "",
//     reference_number: "",
//     name: "",
//     order_number: "",
//     client_name: "",
//     address: "",
//     phone: "",
//     zip_code: "",
//     latitude: "",
//     longitude: "",
//     route_code: "",
//     route_name: "",
//     description: "",
//     execution_at: $h.nowTimestamp('-').substr(0,16),
// });






const validate = useVuelidate(rulesStage, toRefs(formDataStage));

const saveStage = () => {

    validate.value.$touch();    
    if (validate.value.$invalid) {
        //TODO
    } else {

        //Find element activity
        const selectedActivity = selectActivityTypes.value.find(elem => elem.id === parseInt(formDataStage.activity_type_id));
        formDataStage.activity_type_name = selectedActivity.name;



        const selectedStageType = selectStageTypes.value.find(elem => elem.id === parseInt(formDataStage.stage_type_id));
        formDataStage.stage_type_name = selectedStageType.name;





        const selectedStageTow = selectTows.value.find(elem => elem.id === parseInt(formDataStage.tow_id));
        formDataStage.tow_plate = selectedStageTow.plate;


        emit('addStageForm', { ...formDataStage });
        
    }
};





onMounted(async () => {

    //Load stage types
    await getStageTypes();
    selectStageTypes.value = stageTypes.value;


    //Load activity types
    await getActivityTypes();
    selectActivityTypes.value = activityTypes.value;


    //Load stage types
    await getTows();
    selectTows.value = tows.value;



    if(props.arrStages.length === 0){
        formDataStage.order_number = 1;
    }else{
        formDataStage.order_number = props.arrStages.length + 1;
    }



    if(props.trip_tow_selected > 0){

        formDataStage.tow_id = props.trip_tow_selected.toString();
        
    }


    

});

</script>
