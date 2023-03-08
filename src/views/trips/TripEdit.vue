<template>
    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">



        <!-- <form class="validate-form" @submit.prevent="save">
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
            <div class="input-form mt-3">
                <label for="validation-form-2" class="form-label w-full flex flex-col sm:flex-row">
                    Email
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Required, email address format</span>
                </label>
                <input id="validation-form-2" v-model.trim="validate.email.$model" type="email" name="email"
                    class="form-control" :class="{ 'border-danger': validate.email.$error }"
                    placeholder="example@gmail.com" />
                <template v-if="validate.email.$error">
                    <div v-for="(error, index) in validate.email.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <div class="input-form mt-3">
                <label for="validation-form-3" class="form-label w-full flex flex-col sm:flex-row">
                    Password
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Required, at least 6 characters</span>
                </label>
                <input id="validation-form-3" v-model.trim="validate.password.$model" type="password" name="password"
                    class="form-control" :class="{ 'border-danger': validate.password.$error }" placeholder="secret" />
                <template v-if="validate.password.$error">
                    <div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <div class="input-form mt-3">
                <label for="validation-form-4" class="form-label w-full flex flex-col sm:flex-row">
                    Age
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Required, integer only & maximum 3
                        characters</span>
                </label>
                <input id="validation-form-4" v-model.trim="validate.age.$model" type="number" name="age"
                    class="form-control" :class="{ 'border-danger': validate.age.$error }" placeholder="21" />
                <template v-if="validate.age.$error">
                    <div v-for="(error, index) in validate.age.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <div class="input-form mt-3">
                <label for="validation-form-5" class="form-label w-full flex flex-col sm:flex-row">
                    Profile URL
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Optional, URL format</span>
                </label>
                <input id="validation-form-5" v-model.trim="validate.url.$model" type="url" name="url" class="form-control"
                    :class="{ 'border-danger': validate.url.$error }" placeholder="https://google.com" />
                <template v-if="validate.url.$error">
                    <div v-for="(error, index) in validate.url.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <div class="input-form mt-3">
                <label for="validation-form-6" class="form-label w-full flex flex-col sm:flex-row">
                    Comment
                    <span class="sm:ml-auto mt-1 sm:mt-0 text-xs text-slate-500">Required, at least 10 characters</span>
                </label>
                <textarea id="validation-form-6" v-model.trim="validate.comment.$model" class="form-control"
                    :class="{ 'border-danger': validate.comment.$error }" name="comment"
                    placeholder="Type your comments"></textarea>
                <template v-if="validate.comment.$error">
                    <div v-for="(error, index) in validate.comment.$errors" :key="index" class="text-danger mt-2">
                        {{ error.$message }}
                    </div>
                </template>
            </div>
            <button type="submit" class="btn btn-primary mt-5">
                Register
            </button>
        </form> -->




        <div class="grid grid-cols-12 gap-6">

            <form class="space-y-6" @submit.prevent="$emit('updateTripForm', trip)">

                <div class="col-span-12 md:col-span-12 lg:col-span-12">
                    <label for="name" class="form-label">
                        Email
                    </label>
                    <input v-model="trip.name" id="name" type="text" class="form-control w-full" required />
                </div>

                <div class="col-span-12 md:col-span-12 lg:col-span-12">
                    <label for="vertical-form-2" class="form-label">Password</label>
                    <input id="vertical-form-2" type="text" class="form-control" />
                </div>

                <div class="col-span-12 md:col-span-12 lg:col-span-12">

                    <div class="flex flex-row gap-4">

                        <button 
                            class="btn btn-primary mt-5"
                        >
                            {{ $t("save") }}
                        </button>
                        
                        <button 
                            @click.prevent="emit('cancelEdit')"
                            class="btn btn-danger mt-5"
                        >
                            {{ $t("cancel") }}
                        </button>

                    </div>

                </div>

            </form>

        </div>

        <!-- END: Page Layout -->
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import useTrips from '@/composables/trips';

const { trip, getTrip } = useTrips();

const props = defineProps(['tripId'])

const emit = defineEmits(['cancelEdit', 'updateTripForm'])

onMounted(async () => {
    await getTrip(props.tripId);
});
</script>



