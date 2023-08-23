<template>

    <!-- HEADER -->
    <h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
        {{ $t("profile") }}
    </h2>


    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <!-- BEGIN: Form -->
        <form class="validate-form" @submit.prevent="save">

            <!-- BEGIN: container -->
            <div class="grid grid-cols-12 gap-6">

                <div class="col-span-12 md:col-span-6 lg:col-span-3">
                    <div class="input-form">
                        <label for="role_id" class="form-label w-full">
                            {{ $t("role") }}
                        </label>

                        <select v-model.trim="validate.role_id.$model"  
                            id="role_id" name="role_id" class="form-control"
                            :class="{ 'border-danger': validate.role_id.$error }"
                            disabled>

                            <option v-for="role in selectRoles" :value="role.id" :selected="role.id == formData.role_id">
                                {{ role.description }}
                            </option>

                        </select>
                        <template v-if="validate.role_id.$error">
                            <div v-for="(error, index) in validate.role_id.$errors" :key="index" class="text-danger mt-2">
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


                <div class="col-span-12 md:col-span-6 lg:col-span-5">
                    <div class="input-form">
                        <label for="surname" class="form-label w-full">
                            {{ $t("surname") }}
                        </label>
                        <input v-model.trim="validate.surname.$model" id="surname" type="text" name="surname"
                            class="form-control" :class="{ 'border-danger': validate.surname.$error }" />
                        <template v-if="validate.surname.$error">
                            <div v-for="(error, index) in validate.surname.$errors" :key="index" class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-3">
                    <div class="input-form">
                        <label for="fiscal_identification" class="form-label w-full">
                            {{ $t("fiscal_identification") }}
                        </label>
                        <input v-model.trim="validate.fiscal_identification.$model" id="fiscal_identification" type="text"
                            name="fiscal_identification" class="form-control"
                            :class="{ 'border-danger': validate.fiscal_identification.$error }" />
                        <template v-if="validate.fiscal_identification.$error">
                            <div v-for="(error, index) in validate.fiscal_identification.$errors" :key="index"
                                class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-6">
                    <div class="input-form">
                        <label for="email" class="form-label w-full">
                            {{ $t("email") }}
                        </label>
                        <input v-model.trim="validate.email.$model" id="email" type="text" name="email" class="form-control"
                            :class="{ 'border-danger': validate.email.$error }" />
                        <template v-if="validate.email.$error">
                            <div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
                                {{ error.$message }}
                            </div>
                        </template>
                    </div>
                </div>


                <div class="col-span-12 md:col-span-6 lg:col-span-3">
                    <div class="input-form">
                        <label for="password" class="form-label w-full">
                            {{ $t("password") }}
                        </label>

                        <div class="relative sm:flex items-center">
                            <input v-model.trim="validate.password.$model" id="password" :type="passwordFieldType"
                                name="password" class="form-control"
                                :class="{ 'border-danger': validate.password.$error }" />
                            <EyeIcon
                                class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
                                @click="switchVisibility" />
                        </div>

                        <template v-if="validate.password.$error">
                            <div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-2">
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
import useEmployees from '@/composables/employees';
import useRoles from '@/composables/roles';
import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import enumRoles from '@/enums/enum_roles.js';
import { Toast } from '@/utils/toast';
import { useAuthenticationStore } from '@/stores/auth/authentications';




const { employee, getEmployee, updateEmployee } = useEmployees();
const { roles, getRoles } = useRoles();
const { t } = useI18n();

const useAuthentication = useAuthenticationStore();






const selectRoles = ref();


const passwordFieldType = ref("password");
const switchVisibility = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}



const rules = {
    role_id: {
        required: helpers.withMessage(t("form.required"), required),
    },
    name: {
        required: helpers.withMessage(t("form.required"), required),
    },
    surname: {
        required: helpers.withMessage(t("form.required"), required),
    },
    fiscal_identification: {
        required: helpers.withMessage(t("form.required"), required),
    },
    email: {
        required: helpers.withMessage(t("form.required"), required),
        email: helpers.withMessage(t("form.email"), email),
    },
    password: {
        minLength: helpers.withMessage(t("form.min_length"), minLength(2)),
    },
};

const formData = reactive({
    role_id: "",
    name: "",
    surname: "",
    fiscal_identification: "",
    email: "",
    password: "",
});

const validate = useVuelidate(rules, toRefs(formData));

const save = async () => {
    validate.value.$touch();
    if (validate.value.$invalid) {
        //TODO
    } else {

        await updateEmployee(useAuthentication.getUser.employee.id, { ...formData });
        await Toast(t("message.record_updated"), 'success');

    }
};




onMounted(async () => {

    await getEmployee(useAuthentication.getUser.employee.id);
    await getRoles();

    //Select Roles
    const newRoles = roles.value.filter((role) => {
        return role.id == enumRoles.TRAFFIC_CHIEF_ID || role.id == enumRoles.TRAFFIC_MANAGER_ID;
    });
    selectRoles.value = newRoles;

    //Load Data
    formData.role_id = employee.value.user.roles[0].id;
    formData.name = employee.value.name;
    formData.surname = employee.value.surname;
    formData.fiscal_identification = employee.value.fiscal_identification;
    formData.email = employee.value.user.email;
    formData.password = '';
    // formData.phone_prefix = employee.value.phone_prefix;
    // formData.phone = employee.value.phone;
});

</script>



