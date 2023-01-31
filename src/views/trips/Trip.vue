<template>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Viajes</h2>
    </div>
    

    <!-- BEGIN: Weekly Top Products -->
    <div class="col-span-12 mt-6">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">
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
                  <th class="whitespace-nowrap">Viaje</th>
                  <th class="text-center whitespace-nowrap">Acciones</th>
                </tr>
              </thead>
              <tbody>

                <tr
                  v-for="trip in tripStore.trips.slice(current_page, last_page)"
                  :key="trip.id"
                  class="intro-x"
                >
                  <td>
                    <a href="" class="font-medium whitespace-nowrap">
                      {{ trip.reference_number}}
                    </a>
                  </td>
                  
                  <!-- <td class="w-40">
                    <div
                      class="flex items-center justify-center"
                      :class="{
                        'text-success': trip.destination_address,
                        'text-danger': !trip.destination_address,
                      }"
                    >
                      <CheckSquareIcon class="w-4 h-4 mr-2" />
                      {{ trip.destination_address ? "Active" : "Inactive" }}
                    </div>
                  </td> -->
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
                <!-- <li class="page-item">
                  <a class="page-link" href="#">
                    <ChevronsLeftIcon class="w-4 h-4" />
                  </a>
                </li> -->
                <li class="page-item">
                  <button class="page-link" @click.prevent="previus" :disabled="current_page === 0">
                    <ChevronLeftIcon class="w-4 h-4" />
                  </button>
                </li>

                <li class="page-item active">
                  <a class="page-link" href="javascript:void(0)">{{ pageSelected }} - {{ pageN }}</a>
                </li>

                <!-- <li class="page-item" :class="pageSelected === page ? 'active':''" v-for="page in pageN" :key="page">
                  <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li> -->

                <!-- <li class="page-item active">
                  <a class="page-link" href="#" @click.prevent="changePage">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#" @click.prevent="changePage">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="" @click.prevent="changePage">3</a>
                </li>  -->

                <!-- <li class="page-item">
                  <a class="page-link" href="#">...</a>
                </li>-->
                <li class="page-item">
                  <button class="page-link" @click.prevent="next" :disabled="last_page >= tripStore.trips.length">
                    <ChevronRightIcon class="w-4 h-4" />
                  </button>
                </li>
                <!-- <li class="page-item">
                  <a class="page-link" href="javascript:void(0)" @click="next">
                    <ChevronsRightIcon class="w-4 h-4" />
                  </a>
                </li> -->
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
      <!-- END: Weekly Top Products -->


</template>
  

<script setup>
  import { ref } from 'vue';
  import { useTripStore } from "../../stores/trips/useTripStore";


  const postXpage = 10;
  const current_page = ref(0);
  const last_page = ref(postXpage);


  const pageN = ref(1);
  const pageSelected = ref(1);



  const tripStore = useTripStore();
  //tripStore.getTripsFECTHHHH();




  /**
   * Paginate
   */

  const next = () =>{
    current_page.value = current_page.value + postXpage;
    last_page.value = last_page.value + postXpage;
    pageSelected.value = pageSelected.value+1;
  }

  const previus = () =>{
    current_page.value = current_page.value - postXpage;
    last_page.value = last_page.value - postXpage;
    pageSelected.value = pageSelected.value-1;

  }




  const findData = async() => {
    await tripStore.getTrips();

    // trips.value = tripStore.trips.value;
    // console.log("vaaaaa" , toRefs(tripStore.trips));
    // console.log("triiops" , trips);

    const { trips } = tripStore;
    console.log([ trips[0] ] );

    if(trips.length > 0){
      pageN.value = Math.ceil(trips.length / postXpage);
    }


  }

  
  findData();


</script>
