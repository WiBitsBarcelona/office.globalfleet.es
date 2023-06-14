<template>
  <div class="relative">
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div class="col-span-12 intro-y">
        <!-- HEADER -->
        <h2 class="text-lg font-medium truncate mr-5 mb-5">{{ $t("trips") }}</h2>
        <div class="grid grid-cols-12 gap-6 mb-5">
          <!-- FILTERS -->
          <div class="col-span-12 intro-y text-center">
            <div class="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                :class="[onlineFilter === '' && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                Todos
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >50</span
                >
              </button>
              <button
                type="button"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                Pendientes
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >5</span
                >
              </button>
              <button
                type="button"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                Pendientes de Confirmar
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >2</span
                >
              </button>
              <button
                type="button"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                En curso
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >20</span
                >
              </button>
              <button
                type="button"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                Realizados
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >5</span
                >
              </button>
            </div>
          </div>

          <!-- ORDER OPTIONS -->
          <div class="col-span-12 xl:col-span-6 intro-y">
            <div class="flex flex-col sm:flex-row mt-2">
              <div class="ml-2 mr-5 font-light text-gray-600">Ordenar por:</div>
              <div class="form-check mr-2">
                <input
                  id="radio-switch-4"
                  class="form-check-input"
                  type="radio"
                  checked
                  name="horizontal_radio_button"
                  value="horizontal-radio-chris-evans"
                />
                <label
                  class="form-check-label font-normal text-gray-600"
                  for="radio-switch-4"
                  >ID Viaje</label
                >
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input
                  id="radio-switch-5"
                  class="form-check-input"
                  type="radio"
                  name="horizontal_radio_button"
                  value="horizontal-radio-liam-neeson"
                />
                <label
                  class="form-check-label font-normal text-gray-600"
                  for="radio-switch-5"
                  >Vehículo</label
                >
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input
                  id="radio-switch-6"
                  class="form-check-input"
                  type="radio"
                  name="horizontal_radio_button"
                  value="horizontal-radio-daniel-craig"
                />
                <label
                  class="form-check-label font-normal text-gray-600"
                  for="radio-switch-6"
                  >Conductor</label
                >
              </div>
            </div>
          </div>
          <!-- SEARCH INPUT -->
          <div class="col-span-12 xl:col-span-6 intro-y">
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <div class="relative text-slate-500">
                <input
                  type="text"
                  class="form-control box pr-10"
                  placeholder="Buscar..."
                />
                <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
              </div>
            </div>
          </div>
        </div>
        <!-- END HEADER -->
        <!-- DATA BEGINS -->
        <!-- Element 1 -->
        <div
          class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
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
              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                <p class="text-md font-normal leading-6 text-gray-500">2023056219</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                <p class="text-md font-normal leading-6 text-gray-500">1234LMT</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                <p class="text-md font-normal leading-6 text-gray-500">R1234BDB</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Aitor Menta</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 09:13</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">M</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Confirmado</p>
              </div>
              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                <p class="text-md font-bold leading-6 text-gray-500">En Curso</p>
              </div>
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
        <!-- Element 2 -->
        <div
          class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
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
                  <p class="text-sm">2</p>
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
                  <p class="text-sm">1</p>
                </div>
              </div>
              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                <p class="text-md font-normal leading-6 text-gray-500">20233764701</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                <p class="text-md font-normal leading-6 text-gray-500">6642KGY</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                <p class="text-md font-normal leading-6 text-gray-500">R556BCC</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Vlad Manescu</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 09:15</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">M</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                <p class="text-md font-normal leading-6 text-gray-500">confirmado</p>
              </div>
              <div class="rounded-md bg-blue-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                <p class="text-md font-bold leading-6 text-gray-500">En Curso</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Status</h5>
                  <Tippy
                    tag="button"
                    class="tooltip primary ml-4 mr-2"
                    content="Parado"
                    :options="{ theme: 'dark' }"
                  >
                    <p class="text-md font-normal leading-6 text-gray-500">P</p>
                  </Tippy>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Veloc.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">0</p>
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
                  Galdakao <span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Destino</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  Martorelles<span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  0.1 km. Galdakao
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">etapa actual</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">
                  Carga Galdakao
                </p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">ETA etapa actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 10:30</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H etapa actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 08:48</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status etapa actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Llegada Carga</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Km etapa siguiente</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Element 3 -->
        <div
          class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
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
                  <p class="text-sm">1</p>
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
                  <p class="text-sm">2</p>
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
              <div class="rounded-md bg-orange-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                <p class="text-md font-normal leading-6 text-gray-500">2023267110</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                <p class="text-md font-normal leading-6 text-gray-500">4592LMT</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                <p class="text-md font-normal leading-6 text-gray-500">R3434BDZ</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Catalín Chivu</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H Telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 08:59</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">M</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Enviado</p>
              </div>
              <div class="rounded-md bg-orange-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                <p class="text-md font-bold leading-6 text-gray-500">Pendiente</p>
              </div>
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
                  <p class="text-md font-normal leading-6 text-gray-500">86</p>
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
                  Algeciras <span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Destino</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  Dordon <span class="font-bold"> (DE)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  60 km. SE Florencia, Italia
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">
                  Carga Algeciras
                </p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">02-06-23 16:00</p>
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
        <!-- Element 4 -->
        <div
          class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
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
                  <p class="text-sm">1</p>
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
              <div class="rounded-md bg-gray-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                <p class="text-md font-normal leading-6 text-gray-500">2023888188</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                <p class="text-md font-normal leading-6 text-gray-500">1614FYR</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                <p class="text-md font-normal leading-6 text-gray-500">R3290BDB</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Carmen Báez</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H Telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">15-05-23 22:55</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">M</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div class="rounded-md bg-gray-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                <p class="text-md font-bold leading-6 text-gray-500">--</p>
              </div>
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
                  <p class="text-md font-normal leading-6 text-gray-500">92</p>
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
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Destino</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  10 Km. NO Leper, Bélgica
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">--</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
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
                <p class="text-md font-normal leading-6 text-gray-500">--</p>
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
        <!-- Element 5 -->
        <div
          class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary"
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
              <div class="rounded-md bg-green-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Viaje</h5>
                <p class="text-md font-normal leading-6 text-gray-500">2023641561</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Vehículo</h5>
                <p class="text-md font-normal leading-6 text-gray-500">2567JYR</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                <p class="text-md font-normal leading-6 text-gray-500">R1001BCH</p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Ramiro Puig</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H Telemática</h5>
                <p class="text-md font-normal leading-6 text-gray-500">01-06-23 09:13</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Telem.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">M</p>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">2</p>
                </div>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Comunicación</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Confirmado</p>
              </div>
              <div class="rounded-md bg-green-100 p-2 pb-1">
                <h5 class="text-xs font-light text-gray-400">Status Viaje</h5>
                <p class="text-md font-bold leading-6 text-gray-500">Completado</p>
              </div>
              <div class="grid grid-cols-2 justify-items-stretch gap-1">
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Status</h5>
                  <Tippy
                    tag="button"
                    class="tooltip primary ml-4 mr-2"
                    content="Parado"
                    :options="{ theme: 'dark' }"
                  >
                    <p class="text-md font-normal leading-6 text-gray-500">P</p>
                  </Tippy>
                </div>
                <div
                  class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
                >
                  <h5 class="text-xs font-light text-gray-400">Veloc.</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">0</p>
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
                  Requena <span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Destino</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  Vilamalla <span class="font-bold"> (ES)</span>
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  40 Km. NO Kortnijk, Bélgica
                </p>
              </div>
              <div
                class="col-span-2 rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Etapa Actual</h5>
                <p class="text-md font-normal uppercase leading-6 text-gray-500">
                  Descarga Vilamalla
                </p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">ETA Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">31-05-23 16:30</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">F/H Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">31-05-23 19:47</p>
              </div>
              <div
                class="rounded-md bg-gray-100 p-2 pb-1 dark:bg-gray-800 dark:text-gray-400"
              >
                <h5 class="text-xs font-light text-gray-400">Status Etapa Actual</h5>
                <p class="text-md font-normal leading-6 text-gray-500">Completada</p>
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
      </div>
      <!-- BEGIN: Pagination -->
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <nav class="w-full sm:w-auto sm:mr-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <!--                         <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">...</a>
                        </li> -->
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronRightIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsRightIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
        <select class="w-20 form-select box mt-3 sm:mt-0">
          <option>5</option>
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
          <option>Todos</option>
        </select>
      </div>
      <!-- END: Pagination -->
    </div>
  </div>
</template>

<script setup>
const onlineFilter = "";
</script>

<style>
.selected {
  background-color: rgb(0, 150, 178, 0.6);
}
</style>
