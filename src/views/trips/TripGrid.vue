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
          <TripCard v-for="trip in searchedTrips" :key="trip.id" :trip="trip" :classBtnFilter="classBtnFilter"
            @click="onClickTrip(trip.id)" />
        </div>
        <div v-else>
          <!-- <div class="pb-6 pt-6">
            <p class="text-md text-gray-500">{{ $t("no_display_data") }}</p>
          </div> -->

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
    <FleetFooter />
  </div>

  <Modal size="modal-xl" :slideOver="true" :show="headerFooterSlideOverPreview"
    @hidden="headerFooterSlideOverPreview = false">
    <a @click="headerFooterSlideOverPreview = false" class="absolute top-0 right-0 left-auto mt-4 mr-3"
      href="javascript:;">
      <XIcon class="w-8 h-8 text-white" />
    </a>
    <!-- BEGIN: Slide Over Header -->
    <ModalHeader class="p-5 bg-primary text-white">
      <div class="w-full text-center">
        <h2 class="font-bold text-2xl">{{ trip_name }}</h2>
      </div>
    </ModalHeader>
    <!-- END: Slide Over Header -->
    <!-- BEGIN: Slide Over Body -->
    <ModalBody>
      <div class="grid grid-cols-4 gap-2 mb-5 border-b-[1px] pb-2 border-slate-200">
        <div class="col-span-2 px-2">
          <h5 class="text-xs font-light text-gray-400">Viaje:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_reference_number }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Status:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_status }}
          </p>
        </div>
        <div class="px-2 ml-auto">
          <AlertTriangleIcon class="md:w-18" :class="trip_incidences_class" />
        </div>

        <div class="col-span-2 px-2">
          <h5 class="text-xs font-light text-gray-400">Conductor:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_driver }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Matrícula:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_plate }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Remolque:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_tow }}
          </p>
        </div>
        <div class="col-span-2 px-2">
          <h5 class="text-xs font-light text-gray-400">Origen:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_origin }}
          </p>
        </div>
        <div class="col-span-2 px-2">
          <h5 class="text-xs font-light text-gray-400">Destino:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_destination }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Enviado:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_sended_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Recibido:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_receptioned_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Confirmado:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_confirmed_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Leido:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_readed_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Fecha ETA:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_executed_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Fecha Inicio:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_started_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Fecha Fin:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ trip_finished_at }}
          </p>
        </div>
        <div class="px-2">
          <h5 class="text-xs font-light text-gray-400">Etapas:</h5>
          <p class="text-md font-normal leading-6 text-gray-500">
            {{ countStage }}
          </p>
        </div>
      </div>

      <div class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[5.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        <!-- ACTIONS AND STAGES -->
        <div class="relative" v-for="element in trip_elements_array" :key="element.id">
          <div class="md:flex items-center md:space-x-4 mb-3">
            <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
              <!-- Icon -->
              <div
                :class="element.class">
                <checkIcon v-if="element.has_icon == 1" class="text-success" />
              </div>
              <!-- Warning -->
              <div class="text-warning md:w-14" style="text-align: -moz-right;">

              </div>
            </div>
            <!-- AQUI TENGO QUE PONER EL IF PARA CONTROLAR SI ES ACCIÓN O ETAPA -->
            <!-- Action Card -->
            <div v-if="element.element_type == 'Action'" class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44" :class="element.box_size">
              <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                <div class="col-span-2">
                  <p class="text-md font-normal leading-6 text-gray-500"><span
                      class="text-xs font-light text-gray-400">Acción:</span> {{ element.name }}</p>
                </div>
                <div class="text-end">
                  <span
                    :class="current_element_status_class">{{ element.element_status }}</span>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Valor:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.value }}
                  </p>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Fecha Inicio:</h5>
                  <p class="text-xs font-normal leading-6 text-gray-500">
                    {{ element.started_at }}
                  </p>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Fecha Fin:</h5>
                  <p class="text-xs font-normal leading-6 text-gray-500">
                    {{ element.finished_at }}
                  </p>
                </div>
              </div>
            </div>
            <!-- End of Action Card -->
            <!-- Stage Card -->
            <div v-if="element.element_type == 'Stage'" class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44" :class="element.box_size">
              <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                <div class="col-span-2">
                  <p class="text-md font-normal leading-6 text-gray-500"><span
                      class="text-xs font-light text-gray-400">Etapa:</span> {{ element.name }}</p>
                </div>
                <div class="text-end">
                  <span
                    :class="current_element_status_class">{{ element.element_status }}</span>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Actividad:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.activity }}
                  </p>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Fecha Inicio:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.started_at }}
                  </p>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Fecha Fin:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.finished_at }}
                  </p>
                </div>
                <div class="px-2">
                  <h5 class="text-xs font-light text-gray-400">Fecha ETA:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.executed_at }}
                  </p>
                </div>
                <div class="col-span-2 px-2">
                  <h5 class="text-xs font-light text-gray-400">Cliente:</h5>
                  <p class="text-md font-normal leading-6 text-gray-500">
                    {{ element.client }}
                  </p>
                </div>
              </div>

              <div
                class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <!-- Task 1 Stage 1 -->
                <div class="relative" v-for="task in task_array" :key="task.id">
                  <template v-if="task.stage_id == element.id">
                    <div class="md:flex items-center md:space-x-4 mb-3">
                    <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                      <!-- Icon -->
                      <div
                        :class="task.task_icon_class">
                        <checkIcon v-if="task.has_check_icon == 1" class="text-success" />
                      </div>
                      <!-- Date -->
                      <time class="font-caveat font-medium text-xl text-indigo-500 md:w-4"></time>
                    </div>
                    <!-- Title -->
                    <!-- <div class="text-slate-500 ml-14"><span class="text-slate-900 font-bold">Mark Mikrol</span> opened the request</div> -->
                    <div class="w-full bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
                      <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                        <div class="col-span-2">
                          <p class="text-md font-normal leading-6 text-gray-500"><span
                              class="text-xs font-light text-gray-400">Tarea:</span> {{ task.task_name }}</p>
                        </div>
                        <div class="text-end">
                          <span
                            :class="current_element_status_class">{{ task.task_status }}</span>
                        </div>
                        <div class="px-2">
                          <h5 class="text-xs font-light text-gray-400">Acción:</h5>
                          <p class="text-xs font-normal leading-6 text-gray-500">
                            {{ task.task_type }}
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="text-xs font-light text-gray-400">Fecha Inicio:</h5>
                          <p class="text-md font-normal leading-6 text-gray-500">
                            {{ task.task_started_at }}
                          </p>
                        </div>
                        <div class="px-2">
                          <h5 class="text-xs font-light text-gray-400">Fecha Fin:</h5>
                          <p class="text-md font-normal leading-6 text-gray-500">
                            {{ task.task_finished_at }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </template>

                  <!-- Card -->
                </div>

              </div>



            </div>
            <!-- End of Stage Card -->
          </div>
        </div>



      </div>


    </ModalBody>
    <!-- END: Slide Over Body -->
    <!-- BEGIN: Slide Over Footer -->
    <!--     <ModalFooter class="w-full absolute bottom-0">
      <button type="button" @click="headerFooterSlideOverPreview = false" class="btn btn-outline-secondary w-20 mr-1">
        CERRAR
      </button>
    </ModalFooter> -->
    <!-- END: Slide Over Footer -->
  </Modal>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import useTrips from "@/composables/trips";
import TripCard from '@/components/trips/TripCard.vue';
import FleetFooter from "@/components/fleet-footer/Main.vue";
import { helper as $h } from "@/utils/helper";
import { Cpu } from 'lucide';
// import useCompanyDocument from '@/composables/company_documents';
// const { companyDocuments, getCompanyDocuments } = useCompanyDocument();

const { trips, getTrips, getTrip, trip } = useTrips();




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

  // if(filter.value != ''){
  //   return q;
  // }

  //console.log(classBtnFilter.value);

  // q = q.sort((a, b) => {
  //   //return a.vehicle.plate.localeCompare(b.vehicle.plate);
  //   return b.vehicle.plate.localeCompare(a.vehicle.plate);
  // });



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

/**
 * CODE SECTION FOR TRIP MODAL
 */
const headerFooterSlideOverPreview = ref(false);
const trip_reference_number = ref('');
const trip_status = ref('');
const trip_name = ref('');
const trip_driver = ref('');
const trip_plate = ref('');
const trip_tow = ref('');
const trip_origin = ref('');
const trip_destination = ref('');
const trip_sended_at = ref('');
const trip_receptioned_at = ref('');
const trip_confirmed_at = ref('');
const trip_readed_at = ref('');
const trip_executed_at = ref('');
const trip_started_at = ref('');
const trip_finished_at = ref('');
let countStage = 0;
let trip_elements_array = [];
let trip_incidences_array = [];
let trip_incidences_class = 'text-gray-300';
let trip_actions_array = [];
let trip_actions_incidences_class = 'text-gray-300';
let icon_pending_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1';
let icon_active_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-info shadow md:order-1';
let icon_success_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-green-100 border border-success shadow md:order-1';
let current_element_icon_class = '';
let has_check_icon = 0;
let box_size = '';
let status_pending_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300';
let status_active_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-blue-100 border border-primary';
let status_success_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-green-100 border border-green-500';
let current_element_status_class = '';
let element_value = '--'; 
let element_activity = '';
let element_client = '';
let executed_at = '';
let stage_id = 0;
let task_name = '';
let task_status = '';
let task_type = '';
let task_started_at = '';
let task_finished_at = '';
let task_array = [];

const onClickTrip = async (id) => {
  countStage = 0;
  trip_elements_array = [];
  task_array = [];
  await getTrip(id);
  console.log(trip.value);
  trip_reference_number.value = trip.value.reference_number;
  trip_status.value = trip.value.status.name;
  trip_name.value = trip.value.name;
  trip_driver.value = trip.value.driver.name + ' ' + trip.value.driver.surname;
  trip_plate.value = trip.value.vehicle.plate;
  if (trip.value.tows.length > 0) {
    trip_tow.value = trip.value.tows[0].tow.plate;
  }
  let find = trip.value.stages.find(element => element.activity !== null);
  trip_origin.value = find.name;
  if(trip.value.incident !== null){
    //TRIP WITH INCIDENCES
    trip_incidences_class = 'text-gray-300';
    trip.value.incidents.forEach( incident => {
      if(incident.has_seen == 0){
        trip_incidences_class = 'text-warning';
      }
    });
  }else{
    trip_incidences_class = 'hidden';
  };
  trip.value.stages.forEach(element => {
    //FIND TRIP DESTINATION
    if (element.activity !== null) {
      trip_destination.value = element.name;
      countStage++;
    }
    // FIND TRIP STAGES & ACTIONS
    //Common variables inicialization
    let element_type = '';
    let started_at = '';
    let finished_at = '';
    // Asign common values 
    //Set icon, icon color, status and status color of this element in timeline.
    switch(element.stage_status_id){
      case 1:
        current_element_icon_class = icon_pending_class;
        current_element_status_class = status_pending_class;
        has_check_icon = 0;
        break;
      case 2,3,4,5:
        current_element_icon_class = icon_active_class;
        current_element_status_class = status_active_class;
        has_check_icon = 0;
        break;
      case 6:
        current_element_icon_class = icon_success_class;
        current_element_status_class = status_success_class;
        has_check_icon = 1;
        break;
    }
    let element_name = element.name;
    let element_status = element.status.name;
    if(element.started_at){
      started_at = $h.formatDate(element.started_at, 'DD/MM/YYYY HH:mm');
    }else{
      started_at = '--';
    }
    if(element.finished_at){
      finished_at = $h.formatDate(element.finished_at, 'DD/MM/YYYY HH:mm');
    }else{
      finished_at = '--';
    }

    if (element.activity == null){
        //THIS STAGE IS AN ACTION
        //Asign action specific values
        element_type = 'Action';
        box_size = 'w-2/4';
        //SET action value from actions array
        if(element.actions.action_cameras != null){
          // Is a Photo action
          // TODO
        }
        if(element.actions.action_forms != null){
          // Is a Form action
          if(element.actions.action_forms[0].value != null){
            element_value = element.actions.action_forms[0].value;
          }
        }
        if(element.actions.action_scanners != null){
          // Is a Scan action
          // TODO
        }
        
        trip_elements_array.push({id: element.id , element_type: element_type, class: current_element_icon_class, has_icon: has_check_icon, name: element_name, element_status: element_status, value: element_value, started_at: started_at, finished_at: finished_at, box_size: box_size, activity: element_activity, client: element_client, executed_at: executed_at});
    }else{
      //THIS STAGE IS AN TRIP STAGE
      //Asign stage specific values
      element_type = 'Stage';
      box_size = 'w-3/4';
      element_activity = element.activity.type.name;
      element_client = element.client_name;
      if(element.executed_at_at){
        executed_at = $h.formatDate(element.executed_at, 'DD/MM/YYYY HH:mm');
      }else{
        executed_at = '--';
      }
      trip_elements_array.push({id: element.id , element_type: element_type, class: current_element_icon_class, has_icon: has_check_icon, name: element_name, element_status: element_status, value: element_value, started_at: started_at, finished_at: finished_at, box_size: box_size, activity: element_activity, client: element_client, executed_at: executed_at});

      //Search all tasks in this stage
      element.tasks.forEach( task => {
          stage_id = task.stage_id;
          task_name = task.name;
          task_status = task.status.name;
          task_type = task.actions[0].type.name;
          task_started_at = '--';
          task_finished_at = '--';

          switch(task.status.id){
            case 1:
              current_element_icon_class = icon_pending_class;
              current_element_status_class = status_pending_class;
              has_check_icon = 0;
              break;
            case 2,3,4,5:
              current_element_icon_class = icon_active_class;
              current_element_status_class = status_active_class;
              has_check_icon = 0;
              break;
            case 6:
              current_element_icon_class = icon_success_class;
              current_element_status_class = status_success_class;
              has_check_icon = 1;
              break;
          }

          task_array.push({id: task.id, stage_id: stage_id, task_name: task_name, task_status: task_status, task_type: task_type, task_started_at: task_started_at, task_finished_at: task_finished_at, task_icon_class: current_element_icon_class, task_status_class: current_element_status_class, has_check_icon: has_check_icon});
      });

    }

    //FIND TRIP STAGES

    //FIND STAGE TASK

  });

  if(trip.value.sended_at){
    trip_sended_at.value = $h.formatDate(trip.value.sended_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_sended_at.value = '--';
  }
  if(trip.value.receptioned_at){
    trip_receptioned_at.value = $h.formatDate(trip.value.receptioned_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_receptioned_at.value = '--';
  }
  if(trip.value.confirmed_at){
    trip_confirmed_at.value = $h.formatDate(trip.value.confirmed_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_confirmed_at.value = '--';
  }
  if(trip.value.readed_at){
    trip_readed_at.value = $h.formatDate(trip.value.readed_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_readed_at.value = '--';
  }
  if(trip.value.executed_at){
    trip_executed_at.value = $h.formatDate(trip.value.executed_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_executed_at.value = '--';
  }
  if(trip.value.started_at){
    trip_started_at.value = $h.formatDate(trip.value.started_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_started_at.value = '--';
  }
  if(trip.value.finished_at){
    trip_finished_at.value = $h.formatDate(trip.value.finished_at, 'DD/MM/YYYY HH:mm');
  }else{
    trip_finished_at.value = '--';
  }

  headerFooterSlideOverPreview.value = true;
}
/**
 * END OF CODE SECTION FOR TRIP MODAL
 */

onMounted(async () => {
  await getTrips();
  totalPage.value = trips.value.length / postXpage.value;

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
