<template>
    
<!-- BEGIN: Form -->
<form class="validate-form" @submit.prevent="save">

<!-- BEGIN: container -->
<div class="grid grid-cols-12 gap-6">

    <div class="col-span-12 md:col-span-12 lg:col-span-12">

        <div class="input-form">
            <label for="user_id" class="form-label w-full">
                {{ $t("user_id") }}
            </label>
            <input
                v-model.trim="validate.user_id.$model"
                id="user_id"
                type="text"
                name="user_id"
                class="form-control"
                :class="{ 'border-danger': validate.user_id.$error }"
            />
            <template v-if="validate.user_id.$error">
                <div v-for="(error, index) in validate.user_id.$errors" :key="index" class="text-danger mt-2">
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
            <button @click.prevent="cancelEdit" class="btn btn-danger">
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


</script>
  