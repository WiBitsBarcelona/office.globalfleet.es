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
                @click.prevent="onClickAll()"
                :class="[classBtnFilter === classBtnAll && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                {{ $t('trip_all') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_all }}</span
                >
              </button> <!-- button -->


              <button
                type="button"
                @click.prevent="onClickCreated()"
                :class="[classBtnFilter === classBtnCreated && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
              {{ $t('trip_created') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_created }}</span
                >
              </button> <!-- button -->



              <button
                type="button"
                @click.prevent="onClickPending()"
                :class="[classBtnFilter === classBtnPending && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
              {{ $t('trip_pending') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_pending }}</span
                >
              </button>


              <button
                type="button"
                @click.prevent="onClickProgress()"
                :class="[classBtnFilter === classBtnProgress && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                {{ $t('trip_progress') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_progress }}</span
                >
              </button>
              <button
                type="button"
                @click.prevent="onClickCompleted()"
                :class="[classBtnFilter === classBtnCompleted && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
                {{ $t('trip_completed') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_completed }}</span
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
                  >{{ $t('trip') }}</label
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
                  >{{ $t('vehicle') }}</label
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
                  >{{ $t('driver') }}</label
                >
              </div>
            </div>
          </div>


          <!-- SEARCH INPUT -->
          <div class="col-span-12 xl:col-span-6 intro-y">
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <div class="relative text-slate-500">
                <input
                  v-model="filter"
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
        
        <div v-if="searchedTrips.length > 0">
          <TripCard
            v-for="trip in searchedTrips"
            :key="trip.id"
            :trip="trip"
            :classBtnFilter="classBtnFilter"
          />
        </div>
        <div v-else>
          <!-- <div class="pb-6 pt-6">
            <p class="text-md text-gray-500">{{ $t("no_display_data") }}</p>
          </div> -->
          
          <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary">
            <div class="grid gap-y-8 bg-gray-100">
              <div
                class="flex text-left pt-10 pb-10 pl-5">
                <div
                  class="flex rounded-md  text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  <!-- alert -->
                  
                    
                    <p class="text-md">{{ $t("no_display_data") }}</p>
                  
                </div>
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
              <button class="page-link" href="#" :disabled="pageStart <= 0">
                <ChevronsLeftIcon class="w-4 h-4" />
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" href="#" @click.prevent="previus" :disabled="pageStart <= 0">
                <ChevronLeftIcon class="w-4 h-4" />
              </button>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">{{ currentPage }}</a>
            </li>
            <!-- <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li> -->
            <!--                         <li class="page-item">
                            <a class="page-link" href="#">3</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="#">...</a>
                        </li> -->
            <li class="page-item">
              <button class="page-link" href="#" @click.prevent="next" :disabled="pageEnd >= trips.length">
                <ChevronRightIcon class="w-4 h-4" />
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" href="#" :disabled="pageEnd >= trips.length">
                <ChevronsRightIcon class="w-4 h-4" />
              </button>
            </li>
          </ul>
        </nav>
        <select class="w-20 form-select box mt-3 sm:mt-0" v-model="postXpage" :onChange="onChangeSelect">
          <option>5</option>
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
      </div>
      
      <!-- END: Pagination -->


    </div>
    <FleetFooter/>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import useTrips from "@/composables/trips";
  import TripCard from '@/components/trips/TripCard.vue';
  import FleetFooter from "@/components/fleet-footer/Main.vue"; 
  // import useCompanyDocument from '@/composables/company_documents';
  // const { companyDocuments, getCompanyDocuments } = useCompanyDocument();

  const { trips, getTrips } = useTrips();


  // Btn
  const classBtnAll = 'class_btn_all';
  const classBtnCreated = 'class_btn_created';
  const classBtnPending = 'class_btn_pending';
  const classBtnProgress = 'class_btn_progress';
  const classBtnCompleted = 'class_btn_completed';

  const classBtnFilter = ref(classBtnAll);





  //Paginate
  const postXpage = ref(5);
  const pageStart = ref(0);
  const pageEnd = ref(postXpage.value);
  const totalPage = ref(0);
  const currentPage = ref(1);

  const filter = ref('');
  
  const trip_completed = ref(0);
  const trip_created = ref(0);
  const trip_pending = ref(0);
  const trip_progress = ref(0);
  const trip_all = ref(0);






  /**
  * Paginate
  */
  const next = () =>{
    pageStart.value = parseInt(pageStart.value) + parseInt(postXpage.value);
    pageEnd.value = parseInt(pageEnd.value) + parseInt(postXpage.value);
    currentPage.value = parseInt(currentPage.value) + 1;
  }

  const previus = () =>{
    pageStart.value = parseInt(pageStart.value) - parseInt(postXpage.value);
    pageEnd.value = parseInt(pageEnd.value) - parseInt(postXpage.value);
    currentPage.value = parseInt(currentPage.value) - 1;
  }


  const onChangeSelect = () => {
    pageStart.value = 0;
    pageEnd.value = parseInt(postXpage.value);
    currentPage.value = 1;
  }


  const searchedTrips = computed(() => {


      let q = trips.value.filter((trip) => {
          return (
            //trip.reference_number.toLowerCase().indexOf(filter.value.toLowerCase()) != -1
            trip.reference_number.toLowerCase().indexOf(filter.value.toLowerCase()) != -1 ||
            trip.vehicle.plate.toLowerCase().indexOf(filter.value.toLowerCase()) != -1 ||
            trip.driver.name.toLowerCase().indexOf(filter.value.toLowerCase()) != -1 
          );
      });

      // if(filter.value != ''){
      //   return q;
      // }

      //console.log(classBtnFilter.value);



      q = q.sort((a, b) => {
        //return a.vehicle.plate.localeCompare(b.vehicle.plate);
        return b.vehicle.plate.localeCompare(a.vehicle.plate);
      });




      if(classBtnFilter.value === classBtnCreated){
        return q.filter((trip) => {
          return (
            trip.trip_status_id == 1 || trip.trip_status_id == 2
          );
        });
      }


      if(classBtnFilter.value === classBtnPending){
        return q.filter((trip) => {
          return (
            trip.trip_status_id == 3 || trip.trip_status_id == 4
          );
        });
      }


      if(classBtnFilter.value === classBtnProgress){
        return q.filter((trip) => {
          return (
            trip.trip_status_id == 5
          );
        });
      }


      if(classBtnFilter.value === classBtnCompleted){
        return q.filter((trip) => {
          return (
            trip.trip_status_id == 6
          );
        });
      }




      



      
      return q.slice(pageStart.value, pageEnd.value);
  });





  const onClickAll = () => {
    classBtnFilter.value = classBtnAll;
  }
  
  const onClickCreated = () => {
    classBtnFilter.value = classBtnCreated;
  }

  const onClickPending = () => {
    classBtnFilter.value = classBtnPending;
  }

  const onClickProgress = () => {
    classBtnFilter.value = classBtnProgress;
  }


  const onClickCompleted = () => {
    classBtnFilter.value = classBtnCompleted;
  }

  







  onMounted(async() => {
    await getTrips();
    totalPage.value = trips.value.length / postXpage.value;

    trips.value.forEach(element => {

      if(element.trip_status_id == 1 || element.trip_status_id == 2){
        trip_created.value++;
      }

      if(element.trip_status_id == 3 || element.trip_status_id == 4){
        trip_pending.value++;
      }

      if(element.trip_status_id == 5){
        trip_progress.value++;
      }

      if(element.trip_status_id == 6){
        trip_completed.value++;
      }
      
    });

    trip_all.value = trips.value.length;


    // await getCompanyDocuments();
    // console.log(companyDocuments);
    

  });

</script>





<style>
.selected {
  background-color: rgb(0, 150, 178, 0.6);
}
.selected:hover {
  background-color: rgb(0, 150, 178, 0.6);
}
</style>
