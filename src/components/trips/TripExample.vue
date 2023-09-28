<template>
    <div class="relative">
        <div class="md:flex items-center md:space-x-4 mb-3">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse"><!-- Icon -->
                <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                    <!--v-if-->
                </div><!-- Incidence -->
                <div class="relative text-warning md:w-14">
                    <icon variant="primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide hidden">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg></icon>
                </div>
            </div><!-- Action Card -->
            <div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-2/4">
                <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                    <div class="col-span-2">
                        <p class="text-md font-normal leading-6 text-gray-500"><span
                                class="text-xs font-light text-gray-400">Acción:</span> Entrada KM</p>
                    </div>
                    <div class="text-end"><span
                            class="inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent">Pendiente
                            realizar</span></div>
                    <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">Valor:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500"></p>
                    </div>
                    <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">Fecha inicio:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">--</p>
                    </div>
                    <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">Fecha fin:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">--</p>
                    </div>
                </div>
            </div><!-- End of Action Card --><!-- Stage Card --><!--v-if--><!-- End of Stage Card -->
        </div>
    </div>






    <div class="relative">
        <div class="md:flex items-center md:space-x-4 mb-3">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse"><!-- Icon -->
                <div
                    class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
                    <!--v-if--></div><!-- Incidence -->
                <div class="relative text-warning md:w-14">
                    <icon variant="primary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" class="lucide text-primary hover:cursor-pointer dark:text-white">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg></icon>
                </div>
            </div><!-- Action Card --><!--v-if--><!-- End of Action Card --><!-- Stage Card -->
            <div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-3/4">
                <div class="grid grid-cols-5 gap-2 mb-5pb-2">
                <div class="col-span-3">
                    <p class="text-md font-normal leading-6 text-gray-500"><span
                            class="text-xs font-light text-gray-400">Etapa:</span> ZARAGOZA PLAZA</p>
                </div>
                <div class="flex justify-end col-span-2"><!--                         <Tippy tag="icon" class="mr-5 mt-1" variant="primary" :options="{
                          theme: 'translucent',
                        }" :content="`${element.total_new_stage_documents}/${element.total_stage_documents}`">
                          <FileTextIcon :class="element.stage_documents_class" />
                        </Tippy> --><span
                        class="inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent">Pendiente
                        realizar Carga</span></div>
                <div class="px-2 col-span-2">
                    <h5 class="text-xs font-light text-gray-400">Actividad:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Carga</p>
                </div>
                <div class="col-span-3 px-2">
                    <h5 class="text-xs font-light text-gray-400">Cliente:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">NOMBRE CLIENTE CARGA</p>
                </div>
                <div class="px-2">
                    <h5 class="text-xs font-light text-gray-400">Fecha ETA:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">23/05/2023 08:30</p>
                </div>
                <div class="px-2">
                    <h5 class="text-xs font-light text-gray-400">Fecha llegada:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="px-2">
                    <h5 class="text-xs font-light text-gray-400">Fecha inicio:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="px-2">
                    <h5 class="text-xs font-light text-gray-400">Fecha fin:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="px-2">
                    <h5 class="text-xs font-light text-gray-400">Fecha salida:</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
            </div>

            
            <div
                class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.20rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <!-- Task 1 Stage 1 -->

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
        </div><!-- End of Stage Card -->
    </div>
</div>


</template>

<script setup>

</script>

<style lang="scss" scoped></style>