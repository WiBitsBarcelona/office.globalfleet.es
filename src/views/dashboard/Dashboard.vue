<template>

    <!-- BEGIN: Page Layout -->
    <div class="intro-y box mt-5">

  

      <!-- BEGIN table -->
      <!-- <div class="col-span-12 mt-6">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate ml-5">
              Viajes
            </h2>
            <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
              <button
                class="btn box flex items-center text-slate-600 dark:text-slate-300"
              >
                <FileTextIcon class="hidden sm:block w-4 h-4 mr-2" />
                Export to Excel
              </button>
              <button
                class="ml-3 btn box flex items-center text-slate-600 dark:text-slate-300"
              >
                <FileTextIcon class="hidden sm:block w-4 h-4 mr-2" />
                Export to PDF
              </button>
            </div>
          </div>
          <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
            <table class="table table-report sm:mt-2">
              <thead>
                <tr>
                  <th class="whitespace-nowrap">Nombre</th>
                  <th class="whitespace-nowrap">Referencia</th>
                  <th class="whitespace-nowrap">Fecha</th>
                  <th class="whitespace-nowrap">Vehículo</th>
                  <th class="whitespace-nowrap">Etapas</th>
                  <th class="whitespace-nowrap">Estatus</th>
                  <th class="text-center whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody>

                <tr
                  v-for="trip in tripStore.trips.slice(current_page, last_page)"
                  :key="trip.id"
                  class="intro-x"
                >
                  <td>{{ trip.name }}</td>
                  <td>
                    <a href="" class="font-medium whitespace-nowrap">
                      {{ trip.reference_number}}
                    </a>
                  </td>
                  <td>{{ trip.started_at }}</td>
                  <td>{{ trip.vehicle.plate }}</td>
                  <td>
                    {{ formatStages(trip.stages) }}
                  </td>
                  <td>{{ trip.status.name }}</td>

                  
                  <td class="table-report__action w-56">
                    <div class="flex justify-center items-center">
                      <a class="flex items-center mr-3" href="#">
                        <CheckSquareIcon class="w-4 h-4 mr-1" />
                        Ver
                      </a>
                    </div>
                  </td>
                </tr>


                
              </tbody>
            </table>
          </div>

          <div
            class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3"
          >
            <nav class="w-full sm:w-auto sm:mr-auto">
              <ul class="pagination">
                
                <li class="page-item">
                  <button class="page-link" @click.prevent="previus" :disabled="current_page === 0">
                    <ChevronLeftIcon class="w-4 h-4" />
                  </button>
                </li>

                <li class="page-item active">
                  <a class="page-link" href="javascript:void(0)">{{ pageSelected }} - {{ pageN }}</a>
                </li>

                
                <li class="page-item">
                  <button class="page-link" @click.prevent="next" :disabled="last_page >= tripStore.trips.length">
                    <ChevronRightIcon class="w-4 h-4" />
                  </button>
                </li>
                
              </ul>
            </nav>
            <select class="w-20 form-select box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div>
      </div> -->
      <!-- END table -->

    </div>
    <!-- END: Page Layout -->
    
</template>

<script setup>



</script>
