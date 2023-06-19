<template>
    <!-- DATA BEGINS -->
    <!-- Element 1 -->
    <!-- <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary">
        <div class="grid gap-y-8">
            <div
                class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
                <div
                    class="flex items-end gap-2 rounded-md bg-gray-100 p-2 pb-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                     alert 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                   message 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                     document 
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p class="text-sm">-</p>
                    </div>
                </div>
                <div class="rounded-md bg-blue-100 p-2 pb-1">
                    <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">2023056219</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">1234LMT</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">R1234BDB</p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Aitor Menta</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">01-06-23 09:13</p>
                </div>
                <div class="grid grid-cols-2 justify-items-stretch gap-1">
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">M</p>
                    </div>
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">2</p>
                    </div>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Confirmado</p>
                </div>
                <div class="rounded-md bg-blue-100 p-2 pb-1">
                    <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                    <p class="text-md font-bold leading-6 text-gray-500">En Curso</p>
                </div>
                <div class="grid grid-cols-2 justify-items-stretch gap-1">
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Status</h5>
                        <Tippy tag="button" class="tooltip primary ml-4 mr-2" content="Conduciendo"
                            :options="{ theme: 'dark' }">
                            <p class="text-md font-normal leading-6 text-gray-500">C</p>
                        </Tippy>
                    </div>
                    <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                        <h5 class="text-xs font-light text-gray-400">Veloc.</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">78</p>
                    </div>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Tacógrafo Restante</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Origen</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        Zaragoza plaza <span class="font-bold"> (ES)</span>
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Destino</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        Hannover<span class="font-bold"> (DE)</span>
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">
                        21 Km. SE Tours, Francia
                    </p>
                </div>
                <div class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                    <p class="text-md font-normal uppercase leading-6 text-gray-500">
                        Descarga Hannover
                    </p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">01-06-23 18:15</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">F/H Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Status Etapa Actual</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">Pendiente R.</p>
                </div>
                <div class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Km Etapa Siguiente</h5>
                    <p class="text-md font-normal leading-6 text-gray-500">--</p>
                </div>
            </div>
        </div>
    </div> -->

    <!-- DATA BEGINS -->
    <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
    >
          <div class="grid gap-y-8">
            <div
              class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12"
            >
              <div
                class="flex items-end gap-2 rounded-md bg-gray-100 p-2 pb-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              >
                <!-- alert -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
                <!-- message -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
                <!-- document -->
                <div class="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <p class="text-sm">-</p>
                </div>
              </div>
              <!-- trip number-->
              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500 ">{{ reference_number }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("vehicle") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ vehicle_plate }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("tow") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{tow_plate }}</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("driver") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">{{ driver_name }}</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">-</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">-</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">{{ $t("stages") }}</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_comm_status") }}</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Leido</p>
              </div>


              <!--    TODO   -->

              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_status") }}</h5>
                <p class="text-md font-bold leading-6 text-gray-500">Creado</p>
              </div>


              <!--    TODO   -->

              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Status</h5>
                  <Tippy
                    tag="button"
                    class="tooltip primary ml-4 mr-2"
                    content="Conduciendo"
                    :options="{ theme: 'dark' }"
                  >
                    <p class="text-md font-normal leading-6 text-gray-500">C</p>
                  </Tippy>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Veloc.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">78</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Tacógrafo Restante</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Origen</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  Zaragoza plaza <span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Destino</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  Hannover<span class="font-bold"> (DE)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  21 Km. SE Tours, Francia
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">
                  Descarga Hannover
                </p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 18:15</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Pendiente R.</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Km Etapa Siguiente</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
            </div>
          </div>
        </div>

</template>

<script setup>
    const props = defineProps([
        'reference_number',
        'vehicle_plate',
        'tow_plate',
        'driver_name'
    ]);

    


</script>

<style scoped>

</style>