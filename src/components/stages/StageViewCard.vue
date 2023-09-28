<template>
    <div class="relative">
        <div class="md:flex items-center md:space-x-4 mb-3">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse"><!-- Icon -->
                <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                </div>
            </div>

            <div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-3/4">
                <div class="grid grid-cols-5 gap-2 mb-5pb-2">
                    <div class="col-span-3">
                        <p class="text-md font-normal leading-6 text-gray-500">
                            <span class="text-xs font-light text-gray-400">Etapa:</span> ZARAGOZA PLAZA</p>
                    </div>


                    <!-- Stage -->

                    <div class="col-span-12 text-right">
                        <a href="#" @click.prevent="emit('showTaskForm', stage)"
                            class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
                            <PlusCircleIcon class="w-4 h-4" /> {{ $t("add_task") }}
                        </a>
                        <a href="#" @click.prevent="emit('deleteStageForm', stage.uuid)"
                            class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
                            <TrashIcon class="w-4 h-4" />
                        </a>
                    </div>

                    <div class="col-span-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("stage") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                            {{ stage.name }}
                        </p>
                    </div>

                    <div class="col-span-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("reference_number") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                            {{ stage.reference_number }}
                        </p>
                    </div>

                    <div class="col-span-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                            {{ stage.activity_type_name }}
                        </p>
                    </div>

                    <div class="col-span-3">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                            {{ stage.client_name }}
                        </p>
                    </div>
                    <div class="col-span-3">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                            {{ stage.execution_at }}
                        </p>
                    </div>


                    <!-- End Stage -->


                </div>




                <!-- Task 1 Stage 1 -->
                <div
                    class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.20rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">



                    <div class="relative">
                        <div class="md:flex items-center md:space-x-4 mb-3">
                            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                                </div>
                            </div>
                            <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
                                <div class="grid grid-cols-4 gap-2 mb-5pb-2">
                                    <div class="col-span-2">
                                        <p class="text-md font-normal leading-6 text-gray-500"><span
                                                class="text-xs font-light text-gray-400">Tarea:</span> ALBARÁN 874271 -
                                            PLAZA - CLIENTE CARGA</p>
                                    </div>
                                    <div class="col-span-2 text-end"><span
                                            class="inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent">Pendiente
                                            realizar</span></div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Acción:</h5>
                                        <p class="text-xs font-normal leading-6 text-gray-500">Tomar foto albaran</p>
                                    </div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Fecha inicio:</h5>
                                        <p class="text-md font-normal leading-6 text-gray-500">--</p>
                                    </div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Fecha fin:</h5>
                                        <p class="text-md font-normal leading-6 text-gray-500">--</p>
                                    </div>
                                    <div class="px-2 -my-2"><!--v-if--></div>
                                </div>
                            </div>
                        </div><!-- Card -->
                    </div>


                    <div class="relative">
                        <div class="md:flex items-center md:space-x-4 mb-3">


                            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse"><!-- Icon -->
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                                </div><!-- Incidence -->

                            </div>

                            <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
                                <div class="grid grid-cols-4 gap-2 mb-5pb-2">
                                    <div class="col-span-2">
                                        <p class="text-md font-normal leading-6 text-gray-500"><span
                                                class="text-xs font-light text-gray-400">Tarea:</span> ALBARÁN 874298 -
                                            PLAZA - CLIENTE CARGA</p>
                                    </div>
                                    <div class="col-span-2 text-end"><span
                                            class="inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent">Pendiente
                                            realizar</span></div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Acción:</h5>
                                        <p class="text-xs font-normal leading-6 text-gray-500">Tomar foto albaran</p>
                                    </div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Fecha inicio:</h5>
                                        <p class="text-md font-normal leading-6 text-gray-500">--</p>
                                    </div>
                                    <div class="px-2">
                                        <h5 class="text-xs font-light text-gray-400">Fecha fin:</h5>
                                        <p class="text-md font-normal leading-6 text-gray-500">--</p>
                                    </div>
                                    <div class="px-2 -my-2"><!--v-if--></div>
                                </div>
                            </div>
                        </div><!-- Card -->
                    </div>


                </div>
                <!-- End of Stage Card -->


            </div>
            


        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';



const emit = defineEmits(['showTaskForm', 'deleteStageForm']);
const props = defineProps(['stage']);


const stage = ref('');

stage.value = props.stage;

</script>

<style lang="scss" scoped></style>