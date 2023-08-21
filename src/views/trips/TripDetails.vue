<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-3">
          <div class="box p-5 m-5 intro-x overflow-y-auto shadow">
            <!--             <a @click="headerFooterSlideOverPreview = false" class="absolute top-0 right-0 left-auto mt-6 mr-5 hover:cursor-pointer"
              href="javascript:;">
              <XIcon class="w-8 h-8 text-white" />
            </a> -->
            <div class="w-full text-center">
              <h2 class="p-5 m-0 bg-primary rounded text-white font-bold text-2xl">{{ trip_name }}</h2>
            </div>
            <div class="grid grid-cols-4 gap-2 mb-5 border-b-[1px] p-5 border-slate-200">
              <div class="col-span-2 px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_reference_number }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_status") }}:</h5>
                <span :class="trip_status_class">{{ trip_status }}</span>
              </div>
              <div class="relative px-2 ml-auto">
                <AlertTriangleIcon @click="incidencesModal = true" class="ml-auto md:w-18 hover:cursor-pointer"
                  :class="trip_incidences_class" />
                <div
                  class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white border-2 rounded-full -top-2 -right-3 dark:border-gray-900"
                  :class="trip_badge_incidences_class">{{ total_new_trip_incidences }}/{{ total_trip_incidences }}</div>
              </div>

              <div class="col-span-2 px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("driver") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_driver }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("plate") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_plate }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("tow") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_tow }}
                </p>
              </div>
              <div class="col-span-2 px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("origin") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_origin }}
                </p>
              </div>
              <div class="col-span-2 px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("destination") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_destination }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("sended_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_sended_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("receptioned_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_receptioned_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("readed_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_readed_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("confirmed_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_confirmed_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_executed_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("started_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_started_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("finished_at") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ trip_finished_at }}
                </p>
              </div>
              <div class="px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("stages") }}:</h5>
                <p class="text-md font-normal leading-6 text-gray-500">
                  {{ countStage }}
                </p>
              </div>
            </div>
            <div
              class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[5.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              <!-- ACTIONS AND STAGES -->
              <div class="relative" v-for="element in trip_elements_array" :key="element.id">
                <div class="md:flex items-center md:space-x-4 mb-3">
                  <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    <!-- Icon -->
                    <div :class="element.class">
                      <checkIcon v-if="element.has_icon == 1" class="text-success" />
                    </div>
                    <!-- Incidence -->
                    <div class="relative text-warning md:w-14" style="text-align: -moz-right;">
                      <AlertTriangleIcon :class="element.stage_incidences_class" />
                      <div v-if="element.element_type == 'Stage'"
                        class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white border-2 rounded-full -top-7 -right-4 dark:border-gray-900 p-3"
                        :class="element.stage_badge_incidences_class">{{ element.total_new_stage_incidences }}/{{
                          element.total_stage_incidences }}</div>
                    </div>
                  </div>
                  <!-- Action Card -->
                  <div v-if="element.element_type == 'Action'"
                    class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44"
                    :class="element.box_size">
                    <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                      <div class="col-span-2">
                        <p class="text-md font-normal leading-6 text-gray-500"><span
                            class="text-xs font-light text-gray-400">{{ $t("action") }}:</span> {{ element.name }}</p>
                      </div>
                      <div class="text-end">
                        <span :class="element.status_class">{{ element.element_status }}</span>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("value") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                          {{ element.value }}
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("started_at") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ element.started_at }}
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("finished_at") }}:</h5>
                        <p class="text-xs font-normal leading-6 text-gray-500">
                          {{ element.finished_at }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <!-- End of Action Card -->
                  <!-- Stage Card -->
                  <div v-if="element.element_type == 'Stage'"
                    class="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44"
                    :class="element.box_size">
                    <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                      <div class="col-span-2">
                        <p class="text-md font-normal leading-6 text-gray-500"><span
                            class="text-xs font-light text-gray-400">{{ $t("stage") }}:</span> {{ element.name }}</p>
                      </div>
                      <div class="text-end">
                        <span :class="element.status_class">{{ element.element_status }}</span>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                          {{ element.activity }}
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("started_at") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                          {{ element.started_at }}
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("finished_at") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                          {{ element.finished_at }}
                        </p>
                      </div>
                      <div class="px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
                        <p class="text-md font-normal leading-6 text-gray-500">
                          {{ element.executed_at }}
                        </p>
                      </div>
                      <div class="col-span-2 px-2">
                        <h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
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
                              <div :class="task.task_icon_class">
                                <checkIcon v-if="task.has_check_icon == 1" class="text-success" />
                              </div>
                              <!-- Incidence -->
                              <div class="relative text-warning md:w-4 " style="text-align: -moz-right;">
                                <AlertTriangleIcon class="mr-2" :class="task.task_incidences_class" />
                                <div
                                  class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white border-2 rounded-full -top-7 -right-4 dark:border-gray-900 p-3"
                                  :class="task.task_badge_incidences_class">{{ task.total_new_task_incidences }}/{{
                                    task.total_task_incidences }}</div>
                              </div>
                            </div>
                            <div
                              class="w-full bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
                              <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                                <div class="col-span-2">
                                  <p class="text-md font-normal leading-6 text-gray-500"><span
                                      class="text-xs font-light text-gray-400">{{ $t("task") }}:</span> {{ task.task_name
                                      }}</p>
                                </div>
                                <div class="text-end">
                                  <span :class="task.status_class">{{ task.task_status }}</span>
                                </div>
                                <div class="px-2">
                                  <h5 class="text-xs font-light text-gray-400">{{ $t("action") }}:</h5>
                                  <p class="text-xs font-normal leading-6 text-gray-500">
                                    {{ task.task_type }}
                                  </p>
                                </div>
                                <div class="px-2">
                                  <h5 class="text-xs font-light text-gray-400">{{ $t("started_at") }}:</h5>
                                  <p class="text-md font-normal leading-6 text-gray-500">
                                    {{ task.task_started_at }}
                                  </p>
                                </div>
                                <div class="px-2">
                                  <h5 class="text-xs font-light text-gray-400">{{ $t("finished_at") }}:</h5>
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
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- BEGIN: Incidences Modal Content -->
  <Modal id="incidencesModal" size="modal-xl" backdrop="static" :show="incidencesModal" @hidden="incidencesModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium  ml-5">{{ $t("trip_details.title") }}</h2>
      <p>{{ trip_name }}</p>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
        @click="hideIncidencesModal">
      </XIcon>
      <div v-for="incidence in incidences_array" :key="incidence.id" class="grid grid-cols-6 gap-6 mx-3 mt-5 text-left">
        <div v-if="incidence.level == 'trip'" class="col-span-6">
          <table class="table table-report -mt-5">
            <thead>
              <tr>
                <th></th>
                <th class="whitespace-nowrap">Tipo Incidencia</th>
                <th class="text-center whitespace-nowrap">Enviada</th>
                <th class="text-center whitespace-nowrap">Recibida</th>
                <th class="text-center whitespace-nowrap">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="intro-x" :class="{'text-primary': incidence.has_seen == 0}">
                <td>
                  <PaperclipIcon class="w-4 h-4 mr-1" />
                </td>
                <td class="w-60">
                  <a href="" class="font-medium whitespace-nowrap">{{ incidence.type }}</a>
                </td>
                <td class="text-center">{{ incidence.sended_at }}</td>
                <td class="text-center">{{ incidence.receptioned_at }}</td>
                <td class="table-report__action w-30">
                  <div class="flex justify-center items-center">
                    <a class="flex items-center mr-3" href="javascript:;">
                      <EyeIcon class="w-4 h-4 mr-1" /> Ver
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="incidence.level == 'stage'" class="col-span-6">
          <p class="font-medium">Etapa: <span class="font-normal">{{ incidence.level_name }}</span></p>
          <table class="table table-report -mt-5">
            <thead>
              <tr>
                <th></th>
                <th class="whitespace-nowrap">Tipo Incidencia</th>
                <th class="text-center whitespace-nowrap">Enviada</th>
                <th class="text-center whitespace-nowrap">Recibida</th>
                <th class="text-center whitespace-nowrap">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="intro-x" :class="{'text-primary': incidence.has_seen == 0}">
                <td>
                  <PaperclipIcon class="w-4 h-4 mr-1" />
                </td>
                <td class="w-60">
                  <a href="" class="font-medium whitespace-nowrap">{{ incidence.type }}</a>
                </td>
                <td class="text-center">{{ incidence.sended_at }}</td>
                <td class="text-center">{{ incidence.receptioned_at }}</td>
                <td class="table-report__action w-30">
                  <div class="flex justify-center items-center">
                    <a class="flex items-center mr-3" href="javascript:;">
                      <EyeIcon class="w-4 h-4 mr-1" /> Ver
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="incidence.level == 'task'" class="col-span-6 pl-5">
          <p class="font-medium">Tarea: <span class="font-normal">{{ incidence.level_name }}</span></p>
          <table class="table table-report -mt-5">
            <thead>
              <tr>
                <th></th>
                <th class="whitespace-nowrap">Tipo Incidencia</th>
                <th class="text-center whitespace-nowrap">Enviada</th>
                <th class="text-center whitespace-nowrap">Recibida</th>
                <th class="text-center whitespace-nowrap">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr class="intro-x" :class="{'text-primary': incidence.has_seen == 0}">
                <td>
                  <PaperclipIcon class="w-4 h-4 mr-1" />
                </td>
                <td class="w-60">
                  <a href="" class="font-medium whitespace-nowrap">{{ incidence.type }}</a>
                </td>
                <td class="text-center">{{ incidence.sended_at }}</td>
                <td class="text-center">{{ incidence.receptioned_at }}</td>
                <td class="table-report__action w-30">
                  <div class="flex justify-center items-center">
                    <a class="flex items-center mr-3" href="javascript:;">
                      <EyeIcon class="w-4 h-4 mr-1" /> Ver
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import useTrips from "@/composables/trips";

const { getTrip, trip } = useTrips();
const { t } = useI18n();
const route = useRoute();

const incidencesModal = ref(false);

/**
 * CODE SECTION FOR TRIP DETAILS
 */
const headerFooterSlideOverPreview = ref(false);
const trip_reference_number = ref('');
const trip_status = ref('');
let trip_status_class = '';
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
let trip_incidences_class = 'text-gray-300';
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
let stage_incidences_class = 'hidden';
let task_incidences_class = 'hidden';
let total_trip_incidences = 0;
let total_new_trip_incidences = 0;
let trip_badge_incidences_class = '';
let total_stage_incidences = 0;
let total_new_stage_incidences = 0;
let stage_badge_incidences_class = '';
let total_task_incidences = 0;
let total_new_task_incidences = 0;
let task_badge_incidences_class = '';
let incidences_array = [];
let incidence_sended_at = '';
let incidence_receptioned_at = '';


const TripDetails = async (id) => {
  countStage = 0;
  trip_elements_array = [];
  task_array = [];
  incidences_array = [];
  total_trip_incidences = 0;
  element_value = '--';
  await getTrip(id);
  console.log(trip.value);
  trip_reference_number.value = trip.value.reference_number;
  trip_status.value = trip.value.status.name;
  switch (trip.value.status.id) {
    case 1:
    case 2:
    case 3:
      trip_status_class = status_pending_class;
      break;
    case 4:
      trip_status_class = status_pending_class;
      break;
    case 5:
      trip_status_class = status_active_class;
      break;
    case 6:
      trip_status_class = status_success_class;
      break;
  }
  trip_name.value = trip.value.name;
  trip_driver.value = trip.value.driver.name + ' ' + trip.value.driver.surname;
  trip_plate.value = trip.value.vehicle.plate;
  if (trip.value.tows.length > 0) {
    trip_tow.value = trip.value.tows[0].tow.plate;
  }
  let find = trip.value.stages.find(element => element.activity !== null);
  trip_origin.value = find.name;
  if (trip.value.incident !== null) {
    //TRIP WITH INCIDENCES
    trip_incidences_class = 'text-gray-300';
    trip_badge_incidences_class = 'bg-gray-300 border-gray-300';
    trip.value.incidents.forEach(incident => {
      total_trip_incidences++;
      if (incident.has_seen == 0) {
        trip_incidences_class = 'text-warning';
        trip_badge_incidences_class = 'bg-orange-200 border-orange-300';
        total_new_trip_incidences++;
      }
      if (incident.sended_at) {
        incidence_sended_at = $h.formatDate(incident.sended_at, 'DD/MM/YYYY HH:mm');
      } else {
        incidence_sended_at = '--';
      }
      if (incident.receptioned_at) {
        incidence_receptioned_at = $h.formatDate(incident.receptioned_at, 'DD/MM/YYYY HH:mm');
      } else {
        incidence_receptioned_at = '--';
      }

      incidences_array.push({id: incident.id, level: 'trip', type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at});
    });
  } else {
    trip_incidences_class = 'hidden';
    trip_badge_incidences_class = 'hidden';
  };

  console.log(incidences_array);

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
    switch (element.stage_status_id) {
      case 1:
        current_element_icon_class = icon_pending_class;
        current_element_status_class = status_pending_class;
        has_check_icon = 0;
        break;
      case 2:
      case 3:
      case 4:
      case 5:
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
    if (element.started_at) {
      started_at = $h.formatDate(element.started_at, 'DD/MM/YYYY HH:mm');
    } else {
      started_at = '--';
    }
    if (element.finished_at) {
      finished_at = $h.formatDate(element.finished_at, 'DD/MM/YYYY HH:mm');
    } else {
      finished_at = '--';
    }

    if (element.activity == null) {
      //THIS STAGE IS AN ACTION
      //Asign action specific values
      element_type = 'Action';
      box_size = 'w-2/4';
      stage_incidences_class = 'hidden' //Actions don't have incidences
      //SET action value from actions array
      if (element.actions.action_cameras != null) {
        // Is a Photo action
        // TODO
      }
      if (element.actions != null) {
        // Is a Form action
        if (element.actions[0].action_forms[0].value != null) {
          element_value = element.actions[0].action_forms[0].value;
        }
      }
      if (element.actions.action_scanners != null) {
        // Is a Scan action
        // TODO
      }

      trip_elements_array.push({ id: element.id, element_type: element_type, class: current_element_icon_class, has_icon: has_check_icon, status_class: current_element_status_class, name: element_name, element_status: element_status, value: element_value, started_at: started_at, finished_at: finished_at, box_size: box_size, activity: element_activity, client: element_client, executed_at: executed_at, stage_incidences_class: stage_incidences_class });
    } else {
      //THIS STAGE IS AN TRIP STAGE
      //Asign stage specific values
      element_type = 'Stage';
      box_size = 'w-3/4';
      element_activity = element.activity.type.name;
      element_client = element.client_name;
      if (element.executed_at_at) {
        executed_at = $h.formatDate(element.executed_at, 'DD/MM/YYYY HH:mm');
      } else {
        executed_at = '--';
      }

      //Find Incidences of this Stage.
      if (element.incidents !== null) {
        //STAGE WITH INCIDENCES
        stage_incidences_class = 'text-gray-300 hover:cursor-pointer';
        stage_badge_incidences_class = 'bg-gray-300 border-gray-300';
        total_new_stage_incidences = 0;
        total_stage_incidences = 0;
        element.incidents.forEach(incident => {
          if (incident.stage_id == element.id) {
            total_stage_incidences++;
            if (incident.has_seen == 0) {
              stage_incidences_class = 'text-warning hover:cursor-pointer';
              stage_badge_incidences_class = 'bg-orange-200 border-orange-300';
              total_new_stage_incidences++;
            } else {
              stage_incidences_class = 'text-gray-300 hover:cursor-pointer';
              stage_badge_incidences_class = 'bg-gray-300 border-gray-300';
            };
          }
          if (incident.sended_at) {
            incidence_sended_at = $h.formatDate(incident.sended_at, 'DD/MM/YYYY HH:mm');
          } else {
            incidence_sended_at = '--';
          }
          if (incident.receptioned_at) {
            incidence_receptioned_at = $h.formatDate(incident.receptioned_at, 'DD/MM/YYYY HH:mm');
          } else {
            incidence_receptioned_at = '--';
          }

          incidences_array.push({id: incident.id, level: 'stage', level_name: element.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at});

        });
      } else {
        stage_incidences_class = 'hidden';
        stage_badge_incidences_class = 'hidden';
      };

      trip_elements_array.push({ id: element.id, element_type: element_type, class: current_element_icon_class, has_icon: has_check_icon, status_class: current_element_status_class, name: element_name, element_status: element_status, value: element_value, started_at: started_at, finished_at: finished_at, box_size: box_size, activity: element_activity, client: element_client, executed_at: executed_at, stage_incidences_class: stage_incidences_class, total_stage_incidences: total_stage_incidences, total_new_stage_incidences: total_new_stage_incidences, stage_badge_incidences_class: stage_badge_incidences_class });

      //Search all tasks in this stage
      element.tasks.forEach(task => {
        stage_id = task.stage_id;
        task_name = task.name;
        task_status = task.status.name;
        task_type = task.actions[0].type.name;
        task_started_at = '--';
        task_finished_at = '--';
        switch (task.status.id) {
          case 1:
            current_element_icon_class = icon_pending_class;
            current_element_status_class = status_pending_class;
            has_check_icon = 0;
            break;
          case 2:
            current_element_icon_class = icon_active_class;
            current_element_status_class = status_active_class;
            has_check_icon = 0;
            break;
          case 3:
            current_element_icon_class = icon_success_class;
            current_element_status_class = status_success_class;
            has_check_icon = 1;
            break;
        }

        //Find Incidences of this Task.
        if (task.incidents !== null) {
          //TASK WITH INCIDENCES
          task_incidences_class = 'text-gray-300 hover:cursor-pointer';
          task_badge_incidences_class = 'bg-gray-300 border-gray-300';
          total_new_task_incidences = 0;
          total_task_incidences = 0;
          task.incidents.forEach(incident => {
            if (incident.task_id == task.id) {
              total_task_incidences++;
              if (incident.has_seen == 0) {
                task_incidences_class = 'text-warning hover:cursor-pointer';
                task_badge_incidences_class = 'bg-orange-200 border-orange-300';
                total_new_task_incidences++;
              } else {
                task_incidences_class = 'text-gray-300 hover:cursor-pointer';
                task_badge_incidences_class = 'bg-gray-300 border-gray-300';
              };
            }
            if (incident.sended_at) {
              incidence_sended_at = $h.formatDate(incident.sended_at, 'DD/MM/YYYY HH:mm');
            } else {
              incidence_sended_at = '--';
            }
            if (incident.receptioned_at) {
              incidence_receptioned_at = $h.formatDate(incident.receptioned_at, 'DD/MM/YYYY HH:mm');
            } else {
              incidence_receptioned_at = '--';
            }

            incidences_array.push({id: incident.id, level: 'task', level_name: task.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at});
          });
        } else {
          task_incidences_class = 'hidden';
          task_badge_incidences_class = 'hidden';
        };

        task_array.push({ id: task.id, stage_id: stage_id, task_name: task_name, task_status: task_status, status_class: current_element_status_class, task_type: task_type, task_started_at: task_started_at, task_finished_at: task_finished_at, task_icon_class: current_element_icon_class, task_status_class: current_element_status_class, has_check_icon: has_check_icon, task_incidences_class: task_incidences_class, total_task_incidences: total_task_incidences, total_new_task_incidences: total_new_task_incidences, task_badge_incidences_class: task_badge_incidences_class });
      });

    }
  });

  if (trip.value.sended_at) {
    trip_sended_at.value = $h.formatDate(trip.value.sended_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_sended_at.value = '--';
  }
  if (trip.value.receptioned_at) {
    trip_receptioned_at.value = $h.formatDate(trip.value.receptioned_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_receptioned_at.value = '--';
  }
  if (trip.value.confirmed_at) {
    trip_confirmed_at.value = $h.formatDate(trip.value.confirmed_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_confirmed_at.value = '--';
  }
  if (trip.value.readed_at) {
    trip_readed_at.value = $h.formatDate(trip.value.readed_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_readed_at.value = '--';
  }
  if (trip.value.executed_at) {
    trip_executed_at.value = $h.formatDate(trip.value.executed_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_executed_at.value = '--';
  }
  if (trip.value.started_at) {
    trip_started_at.value = $h.formatDate(trip.value.started_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_started_at.value = '--';
  }
  if (trip.value.finished_at) {
    trip_finished_at.value = $h.formatDate(trip.value.finished_at, 'DD/MM/YYYY HH:mm');
  } else {
    trip_finished_at.value = '--';
  }

}

const closeTrip = {
  //TODO close window onclick.
}

const hideIncidencesModal = async () => {
  incidencesModal.value = false;
};

//Function to refresh data every minute.
const autoRefresh = setInterval(() => {
  TripDetails(route.params.id);
}, 15000);

onMounted(() => {
  dom("body").removeClass("main").removeClass("login").addClass("error-page");
  TripDetails(route.params.id);
  autoRefresh;
});

onUnmounted(() => {
  clearInterval(autoRefresh);
});

</script>
