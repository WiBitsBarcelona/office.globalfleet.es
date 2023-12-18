<template>
  <div class="relative">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 intro-y">
        <!-- HEADER -->

        <div class="grid grid-cols-12 gap-1 mt-8">

          <div class="col-span-10 intro-y mb-5">
            <h2 class="text-lg font-medium truncate mr-5 mb-5">{{ $t("trips") }} <span class="text-xl font-bold">{{ useAuthentication.getUser?.employee.company.name }}</span></h2>
          </div>
          
          <div class="col-span-2 intro-y mb-5 text-end">
            <router-link :to="`/trips/create`" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("btn_create") }}
            </router-link>
          </div>

        </div>
        



        <div class="grid grid-cols-12 gap-6 mb-5">
          <!-- FILTERS -->
          <div class="col-span-12 intro-y text-center">
            <div class="inline-flex rounded-md shadow-sm">
              <button type="button" @click.prevent="onClickAll()" :class="[classBtnFilter === classBtnAll && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                {{ $t('trip_all') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white">{{
                    trip_all }}</span>
              </button> <!-- button -->


              <button type="button" @click.prevent="onClickCreated()"
                :class="[classBtnFilter === classBtnCreated && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                {{ $t('trip_created') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white">{{
                    trip_created }}</span>
              </button> <!-- button -->



              <button type="button" @click.prevent="onClickPending()"
                :class="[classBtnFilter === classBtnPending && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                {{ $t('trip_pending') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white">{{
                    trip_pending }}</span>
              </button>


              <button type="button" @click.prevent="onClickProgress()"
                :class="[classBtnFilter === classBtnProgress && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                {{ $t('trip_progress') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white">{{
                    trip_progress }}</span>
              </button>
              <button type="button" @click.prevent="onClickCompleted()"
                :class="[classBtnFilter === classBtnCompleted && 'selected']"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-100 focus:z-10 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                {{ $t('trip_completed') }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary text-white">{{
                    trip_completed }}</span>
              </button>
            </div>
          </div>

          <!-- ORDER OPTIONS -->
          <div class="col-span-12 xl:col-span-6 intro-y">
            <div class="flex flex-col sm:flex-row mt-2">
              <div class="ml-2 mr-5 font-light text-gray-600">{{ $t("order_by") }}</div>
              <div class="form-check mr-2">
                <input v-model="radio_order_by" id="radio-trip-date" class="form-check-input" type="radio" checked
                  value="radio-trip-date" @change="onClickRadioTripDate" />
                <label class="form-check-label font-normal text-gray-600" for="radio-trip-date">{{ $t('trip_date')
                }}</label>
              </div>
              <div class="form-check mr-2">
                <input v-model="radio_order_by" id="radio-trip-id" class="form-check-input" type="radio"
                  value="radio-trip-id" @change="onClickRadioTripDate" />
                <label class="form-check-label font-normal text-gray-600" for="radio-trip-id">{{ $t('trip_id') }}</label>
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input v-model="radio_order_by" id="radio-vehicle" class="form-check-input" type="radio"
                  value="radio-vehicle" @change="onClickRadioTripDate" />
                <label class="form-check-label font-normal text-gray-600" for="radio-vehicle">{{ $t('vehicle') }}</label>
              </div>
              <div class="form-check mr-2 mt-2 sm:mt-0">
                <input v-model="radio_order_by" id="radio-driver" class="form-check-input" type="radio"
                  value="radio-driver" @change="onClickRadioTripDate" />
                <label class="form-check-label font-normal text-gray-600" for="radio-driver">{{ $t('driver') }}</label>
              </div>
            </div>
          </div>


          <!-- SEARCH INPUT -->
          <div class="col-span-12 xl:col-span-6 intro-y">
            <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
              <div class="relative text-slate-500">
                <input v-model="filter" type="text" class="form-control box pr-10" :placeholder="$t('find_by')" />
                <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
              </div>
            </div>
          </div>

        </div>
        <!-- END HEADER -->


        

        <!-- DATA BEGINS -->
        <!-- Element 1 -->

        <div v-if="searchedTrips.length > 0">
            <TripCard v-for="trip in searchedTrips" :key="trip.id" :trip="trip" :classBtnFilter="classBtnFilter" />
        </div>
        <div v-else>
          <div class="box p-1 mb-2 intro-x hover:cursor-pointer hover:ring-2 hover:ring-primary">
            <div class="grid gap-y-8 bg-gray-100">
              <div class="pt-10 pb-10 pl-5">
                <div class="flex rounded-md text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                  <!-- alert -->
                  <p class="text-md w-full !text-center">{{ $t("no_display_data") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BEGIN: Pagination -->
      <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
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
import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
import useTrips from "@/composables/trips";
import TripCard from '@/components/trips/TripCard.vue';
import { helper as $h } from "@/utils/helper";
import { useI18n } from 'vue-i18n';
import { useAuthenticationStore } from '@/stores/auth/authentications';


const { trips, getTrips, getTrip, trip } = useTrips();
const { t } = useI18n();

const useAuthentication = useAuthenticationStore();

const classBtnFilter = ref(classBtnAll);







//Paginate
const postXpage = ref(5);
const pageStart = ref(0);
const pageEnd = ref(postXpage.value);
const totalPage = ref(0);
const currentPage = ref(1);

const filter = ref('');

/**
 * Menu Buttons
 */
const classBtnAll = 'class_btn_all';
const classBtnCreated = 'class_btn_created';
const classBtnPending = 'class_btn_pending';
const classBtnProgress = 'class_btn_progress';
const classBtnCompleted = 'class_btn_completed';

const trip_completed = ref(0);
const trip_created = ref(0);
const trip_pending = ref(0);
const trip_progress = ref(0);
const trip_all = ref(0);



/**
 * Order by
 */
const radioTripDate = 'radio-trip-date';
const radioTripId = 'radio-trip-id';
const radioVehicle = 'radio-vehicle';
const radioDriver = 'radio-driver';

const radio_order_by = ref('radio-trip-date');


const interval = ref('');




/**
* Paginate
*/
const next = () => {
  pageStart.value = parseInt(pageStart.value) + parseInt(postXpage.value);
  pageEnd.value = parseInt(pageEnd.value) + parseInt(postXpage.value);
  currentPage.value = parseInt(currentPage.value) + 1;
}

const previus = () => {
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

  if (radio_order_by.value == radioTripDate) {
    q = q.sort((a, b) => {
      return b.execution_at.localeCompare(a.execution_at);
    });
  } else if (radio_order_by.value == radioTripId) {
    q = q.sort((a, b) => {
      return b.reference_number.localeCompare(a.reference_number);
    });
  } else if (radio_order_by.value == radioVehicle) {
    q = q.sort((a, b) => {
      return b.vehicle.plate.localeCompare(a.vehicle.plate);
    });
  } else if (radio_order_by.value == radioDriver) {
    q = q.sort((a, b) => {
      return b.driver.name.localeCompare(a.driver.name);
    });
  }



  /**
   * Menu buttons
   */
  if (classBtnFilter.value === classBtnCreated) {
    return q.filter((trip) => {
      return (
        trip.trip_status_id == 1 || trip.trip_status_id == 2
      );
    });
  }


  if (classBtnFilter.value === classBtnPending) {
    return q.filter((trip) => {
      return (
        trip.trip_status_id == 3 || trip.trip_status_id == 4
      );
    });
  }


  if (classBtnFilter.value === classBtnProgress) {
    return q.filter((trip) => {
      return (
        trip.trip_status_id == 5
      );
    });
  }


  if (classBtnFilter.value === classBtnCompleted) {
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



  interval.value = setInterval(async () => {
    await find();
  }, import.meta.env.VITE_AUTOREFRESH_VALUE);





const find = async() => {

  await getTrips();

  totalPage.value = trips.value.length / postXpage.value;


  trip_created.value = 0;
  trip_pending.value = 0;
  trip_progress.value = 0;
  trip_completed.value = 0;


  trips.value.forEach(element => {

    if (element.trip_status_id == 1 || element.trip_status_id == 2) {
      trip_created.value++;
    }

    if (element.trip_status_id == 3 || element.trip_status_id == 4) {
      trip_pending.value++;
    }

    if (element.trip_status_id == 5) {
      trip_progress.value++;
    }

    if (element.trip_status_id == 6) {
      trip_completed.value++;
    }

  });

  trip_all.value = trips.value.length;
}


onBeforeUnmount(() => {
  clearInterval(interval.value);
});


onMounted(async () => {
  await find();
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
