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
                {{ $t('trip_all') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_all }}</span
                >
              </button>
              <button
                type="button"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400"
              >
              {{ $t('trip_created') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white"
                  >{{ trip_created }}</span
                >
              </button>
              <button
                type="button"
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
        
        <TripCard
          v-for="trip in searchedTrips.slice(pageStart, pageEnd)"
          :key="trip.id"
          :trip="trip"

        />



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
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import useTrips from "@/composables/trips";
  import TripCard from '@/components/trips/TripCard.vue';

  const { trips, getTrips } = useTrips();

  const postXpage = ref(5);
  const pageStart = ref(0);
  const pageEnd = ref(postXpage.value);
  const totalPage = ref(0);
  const currentPage = ref(1);

  const filter = ref('');

  const onlineFilter = "";

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
    return trips.value.filter((trip) => {
          return (
            trip.reference_number.toLowerCase().indexOf(filter.value.toLowerCase()) != -1
          );
      });
  });





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

  });

</script>





<style>
.selected {
  background-color: rgb(0, 150, 178, 0.6);
}
</style>
