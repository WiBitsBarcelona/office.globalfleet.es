<template>
    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <form class="validate-form" @submit.prevent="save">
            <div class="input-form">
                <label for="validation-form-1" class="form-label w-full flex flex-col sm:flex-row">
                    Name
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Required, at least 2 characters</span>
                </label>
                <input id="validation-form-1" v-model.trim="validate.name.$model" type="text" name="name"
                    class="form-control" :class="{ 'border-danger': validate.name.$error }" placeholder="John Legend" />
                <template v-if="validate.name.$error">
                    <div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <button type="submit" class="btn btn-primary mt-5">
                Register
            </button>
            <button 
                @click.prevent="emit('cancelCreate')"
                class="btn btn-danger mt-5"
            >
                {{ $t("cancel") }}
            </button>
        </form>


    </div>
</template>

<script setup>

import { reactive, toRefs } from "vue";
import {
  required,
  minLength,
  maxLength,
  email,
  url,
  integer,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from '@vuelidate/validators';
import Toastify from "toastify-js";
import { useI18n } from "vue-i18n"; 


const { t } = useI18n();

const emit = defineEmits(['cancelCreate', 'createTripForm'])




const formData = reactive({
  name: "",
});


const rules = {
  name: {
    required: helpers.withMessage(t("form.required"), required),
    minLength: minLength(2),
  },
};


const validate = useVuelidate(rules, toRefs(formData));


const save = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    Toastify({
      node: dom("#failed-notification-content")
        .clone()
        .removeClass("hidden")[0],
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  } else {
    Toastify({
      node: dom("#success-notification-content")
        .clone()
        .removeClass("hidden")[0],
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();
  }
};
</script>