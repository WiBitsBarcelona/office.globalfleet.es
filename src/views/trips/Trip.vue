<template>
<!-- BEGIN: Page Layout -->

  <div class="intro-y box mt-5">
    <!-- BEGIN table -->
    <div class="col-span-12 mt-6">
      <div class="intro-y block sm:flex items-center h-10">
        <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
          <button class="btn box flex items-center text-slate-600 dark:text-slate-300">
            <FileTextIcon class="hidden sm:block w-4 h-4 mr-2" />
            Export to Excel
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
              <th class="text-center whitespace-nowrap">{{ $t("actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips.slice(current_page, last_page)" :key="trip.id" class="intro-x">
              <td>{{ trip.name }}</td>
              <td>{{ trip.reference_number }}</td>
              <td>{{ trip.started_at }}</td>
              <td>{{ trip.vehicle.plate }}</td>
              <td>{{ formatStages(trip.stages) }}</td>
              <td>{{ trip.status.name }}</td>
              <td class="table-report__action w-10">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="#">
                    <EditIcon class="w-4 h-4 mr-1" />
                    {{ $t("edit") }}
                  </a>

                  <a class="flex items-center mr-3" href="#">
                    <Trash2Icon class="w-4 h-4 mr-1" />
                    {{ $t("delete") }}
                  </a>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
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
              <button class="page-link" @click.prevent="next" :disabled="last_page >= trips.length">
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
    </div>
    <!-- END table -->

  </div>
<!-- END: Page Layout -->
</template>
  

<script setup>
import { ref } from 'vue';
//import { useTripStore } from "../../stores/trips/useTripStore";
import useTrips from "../../composables/trips";


const postXpage = 10;
const current_page = ref(0);
const last_page = ref(postXpage);


const pageN = ref(1);
const pageSelected = ref(1);



//const tripStore = useTripStore();

const { trips, getTrips, destroytrip, storeTrip, updateTrip } = useTrips();



/**
 * Paginate
 */

const next = () => {
  current_page.value = current_page.value + postXpage;
  last_page.value = last_page.value + postXpage;
  pageSelected.value = pageSelected.value + 1;
}

const previus = () => {
  current_page.value = current_page.value - postXpage;
  last_page.value = last_page.value - postXpage;
  pageSelected.value = pageSelected.value - 1;

}



const formatStages = (stage) => {
  let str = '';
  stage.forEach(element => {
    str += ' ' + element.name;
  });
  return str;
}


const findData = async () => {

  await getTrips();

  console.log(trips);

  if (trips.value.length > 0) {
    pageN.value = Math.ceil(trips.value.length / postXpage);
  }

  console.log(pageN);

}

findData();

</script>
