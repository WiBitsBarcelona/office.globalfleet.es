<template>
    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">


        <h2 class="text-lg font-medium mb-5">
            {{ $t("stage") }}
        </h2>

        

        <div class="mb-10" v-if="arrStages.length > 0">
            <ul>
                <li v-for="item in arrStages" :key="item.id">
                    {{ item.reference_number }} - {{ item.name }}
                </li>
            </ul>
        </div>


        <!-- BEGIN: Form -->
        <form class="validate-form" @submit.prevent="saveStage">

            <!-- BEGIN: container -->
            <div class="grid grid-cols-12 gap-6">


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="stage_type_id" class="form-label w-full">
                            {{ $t("stage_type_id") }}
                        </label>
                        
                        <select
                        v-model.trim="validate.stage_type_id.$model"
                        id="stage_type_id"
                        name="stage_type_id"
                        class="form-control"
                        :class="{ 'border-danger': validate.stage_type_id.$error }"
                        >

                        <option value="" selected>Seleccione</option>
                        <option v-for="item in selectStageTypes" :value="item.id">
                            {{ item.name }}
                        </option>

                        </select>



                        <template v-if="validate.stage_type_id.$error">
                            <div v-for="(error, index) in validate.stage_type_id.$errors" :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="order_number" class="form-label w-full">
                            {{ $t("order_number") }}
                        </label>
                        <input v-model.trim="validate.order_number.$model" id="order_number" type="text" name="order_number"
                            class="form-control" :class="{ 'border-danger': validate.order_number.$error }" />
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="phone" class="form-label w-full">
                            {{ $t("phone") }}
                        </label>
                        <input v-model.trim="validate.phone.$model" id="phone" type="text" name="phone" class="form-control"
                            :class="{ 'border-danger': validate.phone.$error }" />
                        <template v-if="validate.phone.$error">
                            <div v-for="(error, index) in validate.phone.$errors" :key="index" class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="longitude" class="form-label w-full">
                            {{ $t("longitude") }}
                        </label>
                        <input v-model.trim="validate.longitude.$model" id="longitude" type="text" name="longitude"
                            class="form-control" :class="{ 'border-danger': validate.longitude.$error }" />
                        <template v-if="validate.longitude.$error">
                            <div v-for="(error, index) in validate.longitude.$errors" :key="index" class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="description" class="form-label w-full">
                            {{ $t("description") }}
                        </label>
                        <input v-model.trim="validate.description.$model" id="description" type="text" name="description"
                            class="form-control" :class="{ 'border-danger': validate.description.$error }" />
                        <template v-if="validate.description.$error">
                            <div v-for="(error, index) in validate.description.$errors" :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-4">
                    <div class="input-form">
                        <label for="execution_at" class="form-label w-full">
                            {{ $t("execution_at") }}
                        </label>
                        <input v-model.trim="validate.execution_at.$model" id="execution_at" type="text" name="execution_at"
                            class="form-control" :class="{ 'border-danger': validate.execution_at.$error }" />
                        <template v-if="validate.execution_at.$error">
                            <div v-for="(error, index) in validate.execution_at.$errors" :key="index"
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
                        <!-- <button @click.prevent="emit('cancelCreate')" class="btn btn-danger">
                            {{ $t("cancel") }}
                        </button> -->
                    </div>
                </div>
                <!-- END: Buttons -->

            </div>
            <!-- END: container -->

        </form>
        <!-- END: Form -->

    </div>
    <!-- END: Page Layout -->
</template>
<script setup>

import { onMounted, reactive, toRefs, ref } from 'vue';
import useStage from '@/composables/stages';
import useStageType from '@/composables/stage_types.js';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();
const { stageTypes, getStageTypes } = useStageType();



const emit = defineEmits(['addStageArr']);
const props = defineProps(['arrStages']);



console.log(props.arrStages.value);




const selectStageTypes = ref([]);



const rules = {
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
        required: helpers.withMessage(t("form.required"), required),
    },
    execution_at: {
        required: helpers.withMessage(t("form.required"), required),
    }
};

const formData = reactive({
    stage_type_id: "",
    reference_number: "",
    name: "",
    order_number: "",
    client_name: "",
    address: "",
    phone: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    route_code: "",
    route_name: "",
    description: "",
    execution_at: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const saveStage = () => {
    validate.value.$touch();
    if (validate.value.$invalid) {
        //TODO
    } else {
        
        console.log("Guarda Stage");

        emit('addStageArr', {...formData});

        //TODO reset fields

    }
};

onMounted(async () => {
    
    await getStageTypes();
    selectStageTypes.value = stageTypes.value;



});

</script>
