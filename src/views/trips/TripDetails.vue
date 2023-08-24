<template>
  <div>
    <DarkModeSwitcher />
    <div class="container sm:px-10">
      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-3">
          <div class="box p-5 m-5 intro-x overflow-y-auto shadow">
            <div v-for="trip_documents in total_trip_documents_array" :key="trip_documents.index"
              class="flex absolute top-5 right-10 left-auto mt-6 mr-5 hover:cursor-pointer">
              <Tippy tag="icon" class="mr-5" variant="primary" :options="{
                theme: 'translucent',
              }" :content="`${total_new_trip_documents}/${total_trip_documents}`">
                <FileTextIcon class="w-8 h-8 ml-auto hover:cursor-pointer" :class="trip_documents_class" />
              </Tippy>
            </div>
            <div v-for="trip_incidences in total_trip_incidences_array" :key="trip_incidences.index"
              class="flex absolute top-5 right-5 left-auto mt-6 mr-5 hover:cursor-pointer">
              <Tippy v-if="trip_incidences.total == total_trip_incidences_array.length" tag="icon" variant="primary"
                :options="{
                  theme: 'translucent',
                }" :content="`${trip_incidences.new}/${trip_incidences.total}`">
                <AlertTriangleIcon @click="incidencesModal = true" class="w-8 h-8 ml-auto hover:cursor-pointer"
                  :class="trip_incidences_class" />
              </Tippy>
            </div>
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
              <div class="col-span-2 px-2">
                <h5 class="text-xs font-light text-gray-400">{{ $t("trip_status") }}:</h5>
                <span :class="trip_status_class">{{ trip_status }}</span>
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
                      <Tippy tag="icon" variant="primary" :options="{
                        theme: 'translucent',
                      }" :content="`${element.total_new_stage_incidences}/${element.total_stage_incidences}`">
                        <AlertTriangleIcon @click="incidencesModal = true" :class="element.stage_incidences_class" />
                      </Tippy>
                    </div>
                  </div>
                  <!-- Action Card -->
                  <div v-if="element.element_type == 'Action'"
                    class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44"
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
                    class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44"
                    :class="element.box_size">
                    <div class="grid grid-cols-3 gap-2 mb-5pb-2">
                      <div class="col-span-2">
                        <p class="text-md font-normal leading-6 text-gray-500"><span
                            class="text-xs font-light text-gray-400">{{ $t("stage") }}:</span> {{ element.name }}</p>
                      </div>
                      <div class="flex justify-end">
                        <Tippy tag="icon" class="mr-5 mt-1" variant="primary" :options="{
                          theme: 'translucent',
                        }" :content="`${element.total_new_stage_documents}/${element.total_stage_documents}`">
                          <FileTextIcon :class="element.stage_documents_class" />
                        </Tippy>
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
                      class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[3.20rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
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
                              <div class="relative" style="text-align: -moz-right;">
                                <Tippy tag="icon" variant="primary" :options="{
                                  theme: 'translucent',
                                }" :content="`${task.total_new_task_incidences}/${task.total_task_incidences}`">
                                  <AlertTriangleIcon @click="incidencesModal = true"
                                    :class="task.task_incidences_class" />
                                </Tippy>
                              </div>
                            </div>
                            <div class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
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
    <ModalBody class="px-2 py-5 text-center text-gray-500">
      <h2 class="text-lg font-medium  ml-5">{{ $t("trip_details.title") }}</h2>
      <p>{{ trip_name }}</p>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
        @click="hideIncidencesModal">
      </XIcon>
      <table class="table table-report mt-5">
        <thead>
          <tr>
            <th></th>
            <th class="whitespace-nowrap w-300">{{ $t("incidences.Tabulator.type") }}</th>
            <th class="text-center whitespace-nowrap">{{ $t("incidences.Tabulator.sended_at") }}</th>
            <th class="text-center whitespace-nowrap">{{ $t("incidences.Tabulator.received_at") }}</th>
            <th class="text-center whitespace-nowrap">{{ $t("trip_details.options") }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="incidence in incidences_array" :key="incidence.id">
            <tr v-if="incidence.level == 'trip'" class="intro-y" :class="{ 'text-primary': incidence.has_seen == 0 }">
              <td>
                <PaperclipIcon class="w-4 h-4 mr-1" />
              </td>
              <td>
                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                  {{ $t('trip') }}: <span class="font-light">{{ incidence.level_name }}</span>
                </div>
              </td>
              <td class="text-center">{{ incidence.sended_at }}</td>
              <td class="text-center">{{ incidence.receptioned_at }}</td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="javascript:;" @click="showIncidenceDetailModal(incidence.id)">
                    <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                  </a>
                </div>
              </td>
            </tr>
            <tr v-if="incidence.level == 'stage'" class="intro-y" :class="{ 'text-primary': incidence.has_seen == 0 }">
              <td>
                <PaperclipIcon class="w-4 h-4 mr-1" />
              </td>
              <td>
                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                  {{ $t('stage') }}: <span class="font-light">{{ incidence.level_name }}</span>
                </div>
              </td>
              <td class="text-center">{{ incidence.sended_at }}</td>
              <td class="text-center">{{ incidence.receptioned_at }}</td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="javascript:;" @click="showIncidenceDetailModal(incidence.id)">
                    <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                  </a>
                </div>
              </td>
            </tr>
            <tr v-if="incidence.level == 'task'" class="intro-y" :class="{ 'text-primary': incidence.has_seen == 0 }">
              <td>
                <PaperclipIcon class="w-4 h-4 mr-1" />
              </td>
              <td>
                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                  {{ $t('task') }}: <span class="font-light">{{ incidence.level_name }}</span>
                </div>
              </td>
              <td class="text-center">{{ incidence.sended_at }}</td>
              <td class="text-center">{{ incidence.receptioned_at }}</td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <a class="flex items-center mr-3" href="javascript:;" @click="showIncidenceDetailModal(incidence.id)">
                    <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                  </a>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <Modal :show="incidenceDetails" @hidden="incidenceDetails = false" backdrop="static">
        <ModalBody class="text-center">
          <h2 class="text-lg font-medium text-left ml-5">{{ $t("incidences.Modal.title") }}</h2>
          <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
            @click="hideIncidenceDetailModal">
          </XIcon>
          <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
            <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-center dark:bg-gray-800 dark:text-gray-400">
              <p class="text-md text-l font-bold leading-5 text-gray-500">{{ currentIncName }}</p>
            </div>
            <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.type") }}</h5>
              <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncType }}</p>
            </div>
            <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.comment") }}</h5>
              <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncDescription }}</p>
            </div>
            <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.sended_at") }}</h5>
              <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncSended }}</p>
            </div>
            <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.received_at") }}</h5>
              <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncReceptioned }}</p>
            </div>
            <div class="col-span-3"></div>
            <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
              <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.readed_at") }}</h5>
              <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncReaded }}</p>
            </div>
            <div class="col-span-3"></div>
            <div class="col-span-12">
              <table class="table table-report">
                <tbody>
                  <template v-for="incidence_image in incidences_images_array" :key="incidence_image.id">
                    <tr v-if="incidence_image.parent_id == currentIncId" class="intro-x"
                      :class="{ 'text-primary': incidence_image.has_seen == 0 }">
                      <td>
                        <PaperclipIcon class="w-4 h-4 mr-1" />
                      </td>
                      <td>
                        <span class="font-medium whitespace-nowrap">{{ incidence_image.name }}</span>
                      </td>
                      <td class="table-report__action w-30">
                        <div class="flex justify-right items-end">
                          <a class="flex items-end mr-3" href="javascript:;"
                            @click="incidenceFile(incidence_image.id, incidence_image.path, incidence_image.has_seen, incidence_image.name, 0, currentIncLevel)">
                            <Tippy tag="icon" variant="primary" :options="{
                              theme: 'translucent',
                              zIndex: 99999,
                            }" :content="$t('trip_details.view')">
                              <EyeIcon class="w-4 h-4 mr-1" />
                            </Tippy>
                          </a>
                          <a class="flex items-end mr-3" href="javascript:;"
                            @click="incidenceFile(incidence_image.id, incidence_image.path, incidence_image.has_seen, incidence_image.name, 1, currentIncLevel)">
                            <Tippy tag="icon" variant="primary" :options="{
                              theme: 'translucent',
                              zIndex: 99999,
                            }" :content="$t('trip_details.download')">
                              <DownloadIcon class="w-4 h-4 mr-1" />
                            </Tippy>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
            <div class="col-span-12 flex mt-5 justify-center">
              <button type="button" @click="hideIncidenceDetailModal" class="btn btn-secondary w-60 mr-5">
                {{ $t("incidences.Modal.btn_close") }}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </ModalBody>
  </Modal>
  <!-- END: Incidences Modal Content -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import useTrips from "@/composables/trips";
import Swal from "sweetalert2";
import useTripIncident from "@/composables/trip_incidents";
import useStageIncident from "@/composables/stage_incidents";
import useTaskIncident from "@/composables/task_incidents";
import useTripIncidentImage from "@/composables/trip_incident_images";
import useStageIncidentImage from "@/composables/stage_incident_images";
import useTaskIncidentImage from "@/composables/task_incident_images";
import useDownloadDocument from "@/composables/download_documents";

const { getTrip, trip } = useTrips();
const { t } = useI18n();
const route = useRoute();

const { updateTripIncident } = useTripIncident();
const { updateStageIncident } = useStageIncident();
const { updateTaskIncident } = useTaskIncident();
const { updateTripIncidentImage } = useTripIncidentImage();
const { updateStageIncidentImage } = useStageIncidentImage();
const { updateTaskIncidentImage } = useTaskIncidentImage();
const { downloadDocument, documentData } = useDownloadDocument();

const incidencesModal = ref(false);
const incidenceDetails = ref(false);
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
const trip_elements_array = ref([]);
let trip_incidences_class = 'text-gray-300';
let icon_pending_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1';
let icon_active_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-info shadow md:order-1';
let icon_success_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-green-100 border border-success shadow md:order-1';
let current_element_icon_class = '';
let has_check_icon = 0;
let box_size = '';
let status_pending_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300';
let status_not_confirmed_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-orange-100 border border-orange-300';
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
const task_array = ref([]);
let stage_incidences_class = 'hidden';
let task_incidences_class = 'hidden';
let total_trip_incidences = 0;
let total_new_trip_incidences = 0;
let total_trip_incidences_array = [];
let trip_badge_incidences_class = '';
let total_stage_incidences = 0;
let total_new_stage_incidences = 0;
let stage_badge_incidences_class = '';
let total_task_incidences = 0;
let total_new_task_incidences = 0;
let task_badge_incidences_class = '';
const incidences_array = ref([]);
let incidence_sended_at = '';
let incidence_receptioned_at = '';
let incidence_readed_at = '';
let auto_refresh = import.meta.env.VITE_AUTOREFRESH_VALUE;
let currentIncId = '';
let currentIncName = '';
let currentIncLevel = '';
let currentIncType = '';
let currentIncDescription = '';
let currentIncSended = '';
let currentIncReceptioned = '';
let currentIncReaded = '';
let incidences_images_array = [];
const total_trip_documents_array = ref([]);
let total_trip_documents = 0;
let total_new_trip_documents = 0;
let trip_documents_class = 'text-gray-300';
let stage_documents_class = 'hidden';
let total_stage_documents = 0;
let total_new_stage_documents = 0;
let task_documents_class = 'hidden';
let total_task_documents = 0;
let total_new_task_documents = 0;
const documents_array = ref([]);
let currentIncidence = [];
let currentElement = [];
let currentTask = [];

const TripDetails = async (id) => {
  countStage = 0;
  incidences_images_array = [];
  total_trip_incidences_array = [];
  total_trip_incidences = 0;
  element_value = '--';
  total_new_trip_incidences = 0;
  await getTrip(id);
  trip_reference_number.value = trip.value.reference_number;
  trip_status.value = trip.value.status.name;
  switch (trip.value.status.id) {
    case 1:
    case 2:
    case 4:
      trip_status_class = status_pending_class;
      break;
    case 3:
      trip_status_class = status_not_confirmed_class;
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
        trip_incidences_class = 'text-white';
        trip_badge_incidences_class = 'bg-blue-300 border-primary';
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
        let dateNowTmp = new Date();
        let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
        let dateData = { receptioned_at: dateNow };
        updateTripIncident(incident.id, dateData);
      }
      if (incident.readed_at) {
        incidence_readed_at = $h.formatDate(incident.readed_at, 'DD/MM/YYYY HH:mm');
      } else {
        incidence_readed_at = '--';
      }

      incident.images.forEach(image => {
        incidences_images_array.push({ id: image.id, parent_id: image.trip_incident_id, name: image.file_name, has_seen: image.has_seen, path: image.path });
      })

      total_trip_incidences_array.push({ new: total_new_trip_incidences, total: total_trip_incidences });

      if (incidences_array.value.length > 0) {
        currentIncidence = incidences_array.value.filter(obj => obj.id === incident.id);
        if (currentIncidence.length == 0) {
          //INCIDENCE DON'T EXIST ON ARRAY. ADDED
          incidences_array.value.push({ id: incident.id, level: 'trip', level_name: trip_name.value, type: incident.type.name, description: incident.description, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
        }
      } else {
        incidences_array.value.push({ id: incident.id, level: 'trip', level_name: trip_name.value, type: incident.type.name, description: incident.description, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
      }
    });
  } else {
    trip_incidences_class = 'hidden';
    trip_badge_incidences_class = 'hidden';
  };

  if (trip.value.documents !== null) {
    //TRIP WITH DOCUMENTS
    trip_documents_class = 'text-gray-300';
    trip.value.documents.forEach(document => {
      total_trip_documents++;
      if (document.has_seen == 0) {
        trip_documents_class = 'text-white';
        total_new_trip_documents++;
      }
      /* if (document.sended_at) {
        incidence_sended_at = $h.formatDate(incident.sended_at, 'DD/MM/YYYY HH:mm');
      } else {
        incidence_sended_at = '--';
      }
      if (incident.receptioned_at) {
        incidence_receptioned_at = $h.formatDate(incident.receptioned_at, 'DD/MM/YYYY HH:mm');
      } else {
        let dateNowTmp = new Date();
        let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
        let dateData = { receptioned_at: dateNow};
        updateTripIncident(incident.id, dateData);
      }
      if (incident.readed_at) {
        incidence_readed_at = $h.formatDate(incident.readed_at, 'DD/MM/YYYY HH:mm');
      } else {
        incidence_readed_at = '--';
      } */

      total_trip_documents_array.value.push({ new: total_new_trip_documents, total: total_trip_documents });
      //incidences_array.value.push({ id: incident.id, level: 'trip', level_name: trip_name.value, type: incident.type.name, description: incident.description, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
    });
  } else {
    trip_documents_class = 'hidden';
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
    if (element.execution_at){
      executed_at = $h.formatDate(element.execution_at, 'DD/MM/YYYY HH:mm');
    }else{
      executed_at = '--';
    }

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
      element_value = '';
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

      if (trip_elements_array.value.length > 0) {
        currentElement = trip_elements_array.value.filter(obj => obj.id === element.id);
        if (currentElement.length == 0) {
          //ELEMENT DON'T EXIST ON ARRAY. ADDED
          trip_elements_array.value.push({ 
            id: element.id, 
            element_type: element_type, 
            class: current_element_icon_class, 
            has_icon: has_check_icon, 
            status_class: current_element_status_class, 
            name: element_name, 
            element_status: element_status, 
            value: element_value, 
            started_at: started_at, 
            finished_at: finished_at, 
            box_size: box_size, 
            activity: element_activity, 
            client: element_client, 
            executed_at: executed_at, 
            stage_incidences_class: stage_incidences_class });
        }else{
          currentElement[0].class = current_element_icon_class;
          currentElement[0].has_icon = has_check_icon;
          currentElement[0].status_class = current_element_status_class;
          currentElement[0].element_status = element_status;
          currentElement[0].value = element_value;
          currentElement[0].executed_at = executed_at;
          currentElement[0].started_at = started_at;
          currentElement[0].finished_at = finished_at;
          currentElement[0].stage_incidences_class = stage_incidences_class;
        }
      } else {
        trip_elements_array.value.push({ id: element.id, element_type: element_type, class: current_element_icon_class, has_icon: has_check_icon, status_class: current_element_status_class, name: element_name, element_status: element_status, value: element_value, started_at: started_at, finished_at: finished_at, box_size: box_size, activity: element_activity, client: element_client, executed_at: executed_at, stage_incidences_class: stage_incidences_class });
      }

    } else {
      //THIS STAGE IS AN TRIP STAGE
      //Asign stage specific values
      element_type = 'Stage';
      box_size = 'w-3/4';
      element_activity = element.activity.type.name;
      element_client = element.client_name;


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
              stage_incidences_class = 'text-primary hover:cursor-pointer';
              stage_badge_incidences_class = 'bg-blue-300 border-primary';
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
            let dateNowTmp = new Date();
            let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
            let dateData = { receptioned_at: dateNow };
            updateStageIncident(incident.id, dateData);
          }
          if (incident.readed_at) {
            incidence_readed_at = $h.formatDate(incident.readed_at, 'DD/MM/YYYY HH:mm');
          } else {
            incidence_readed_at = '--';
          }

          incident.images.forEach(image => {
            incidences_images_array.push({ id: image.id, parent_id: image.stage_incident_id, name: image.file_name, has_seen: image.has_seen, path: image.path });
          });

          if (incidences_array.value.length > 0) {
            currentIncidence = incidences_array.value.filter(obj => obj.id === incident.id);
            if (currentIncidence.length == 0) {
              //ELEMENT DON'T EXIST ON ARRAY ADDED
              incidences_array.value.push({ id: incident.id, level: 'stage', level_name: element.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
            }
          } else {
            incidences_array.value.push({ id: incident.id, level: 'stage', level_name: element.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
          }
        });
      } else {
        stage_incidences_class = 'hidden';
        stage_badge_incidences_class = 'hidden';
      };

      //Find Documents of this Stage.
      if (element.documents !== null) {
        //STAGE WITH DOCUMENTS
        stage_documents_class = 'text-gray-300 hover:cursor-pointer';
        total_new_stage_documents = 0;
        total_stage_documents = 0;
        element.documents.forEach(document => {
          if (document.stage_id == element.id) {
            total_stage_documents++;
            if (document.has_seen == 0) {
              stage_documents_class = 'text-primary hover:cursor-pointer';
              total_new_stage_documents++;
            } else {
              stage_documents_class = 'text-gray-300 hover:cursor-pointer';
            };
          }
          /* if (incident.sended_at) {
            incidence_sended_at = $h.formatDate(incident.sended_at, 'DD/MM/YYYY HH:mm');
          } else {
            incidence_sended_at = '--';
          }
          if (incident.receptioned_at) {
            incidence_receptioned_at = $h.formatDate(incident.receptioned_at, 'DD/MM/YYYY HH:mm');
          } else {
            let dateNowTmp = new Date();
            let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
            let dateData = { receptioned_at: dateNow};
            updateStageIncident(incident.id, dateData);
          }
          if (incident.readed_at) {
            incidence_readed_at = $h.formatDate(incident.readed_at, 'DD/MM/YYYY HH:mm');
          } else {
            incidence_readed_at = '--';
          } */


          //documents_array.value.push({ id: incident.id, level: 'stage', level_name: element.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });

        });
      } else {
        stage_documents_class = 'hidden';
      };

      if (trip_elements_array.value.length > 0) {
        currentElement = trip_elements_array.value.filter(obj => obj.id === element.id);
        if (currentElement.length == 0) {
          //ELEMENT DON'T EXIST ON ARRAY. ADDED
          trip_elements_array.value.push({
            id: element.id,
            element_type: element_type,
            class: current_element_icon_class,
            has_icon: has_check_icon,
            status_class: current_element_status_class,
            name: element_name,
            element_status: element_status,
            value: element_value,
            started_at: started_at,
            finished_at: finished_at,
            box_size: box_size, activity:
              element_activity,
            client: element_client,
            executed_at: executed_at,
            stage_incidences_class: stage_incidences_class,
            total_stage_incidences: total_stage_incidences,
            total_new_stage_incidences: total_new_stage_incidences,
            stage_badge_incidences_class: stage_badge_incidences_class,
            stage_documents_class: stage_documents_class,
            total_stage_documents: total_stage_documents,
            total_new_stage_documents: total_new_stage_documents
          });
        }else{
          currentElement[0].class = current_element_icon_class;
          currentElement[0].has_icon = has_check_icon;
          currentElement[0].status_class = current_element_status_class;
          currentElement[0].element_status = element_status;
          currentElement[0].value = element_value;
          currentElement[0].started_at = started_at;
          currentElement[0].finished_at = finished_at;
          currentElement[0].stage_incidences_class = stage_incidences_class;
        }
      } else {
        trip_elements_array.value.push({
          id: element.id,
          element_type: element_type,
          class: current_element_icon_class,
          has_icon: has_check_icon,
          status_class: current_element_status_class,
          name: element_name,
          element_status: element_status,
          value: element_value,
          started_at: started_at,
          finished_at: finished_at,
          box_size: box_size, activity:
            element_activity,
          client: element_client,
          executed_at: executed_at,
          stage_incidences_class: stage_incidences_class,
          total_stage_incidences: total_stage_incidences,
          total_new_stage_incidences: total_new_stage_incidences,
          stage_badge_incidences_class: stage_badge_incidences_class,
          stage_documents_class: stage_documents_class,
          total_stage_documents: total_stage_documents,
          total_new_stage_documents: total_new_stage_documents
        });
      }

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

        if (task.started_at) {
          task_started_at = $h.formatDate(task.started_at, 'DD/MM/YYYY HH:mm');
        } else {
          task_started_at = '--';
        }
        if (task.finished_at) {
          task_finished_at = $h.formatDate(task.finished_at, 'DD/MM/YYYY HH:mm');
        } else {
          task_finished_at = '--';
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
                task_incidences_class = 'text-primary hover:cursor-pointer';
                task_badge_incidences_class = 'bg-blue-300 border-primary';
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
              let dateNowTmp = new Date();
              let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
              let dateData = { receptioned_at: dateNow };
              updateTaskIncident(incident.id, dateData);
            }
            if (incident.readed_at) {
              incidence_readed_at = $h.formatDate(incident.readed_at, 'DD/MM/YYYY HH:mm');
            } else {
              incidence_readed_at = '--';
            }

            incident.images.forEach(image => {
              incidences_images_array.push({ id: image.id, parent_id: image.task_incident_id, name: image.file_name, has_seen: image.has_seen, path: image.path });
            });

            if (incidences_array.value.length > 0) {
              currentIncidence = incidences_array.value.filter(obj => obj.id === incident.id);
              if (currentIncidence.length == 0) {
                //INCIDENCE DON'T EXIST ADDED
                incidences_array.value.push({ id: incident.id, level: 'task', level_name: task.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
              }
            } else {
              incidences_array.value.push({ id: incident.id, level: 'task', level_name: task.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
            }

          });
        } else {
          task_incidences_class = 'hidden';
          task_badge_incidences_class = 'hidden';
        };



        if (task_array.value.length > 0) {
          currentTask = task_array.value.filter(obj => obj.id === task.id);
          if (currentTask.length == 0) {
            //TASK DON'T EXIST ON ARRAY. ADDED
            task_array.value.push({ 
              id: task.id, 
              stage_id: stage_id, 
              task_name: task_name, 
              task_status: task_status, 
              status_class: current_element_status_class, 
              task_type: task_type, 
              task_started_at: task_started_at, 
              task_finished_at: task_finished_at, 
              task_icon_class: current_element_icon_class, 
              task_status_class: current_element_status_class, 
              has_check_icon: has_check_icon, 
              task_incidences_class: task_incidences_class, 
              total_task_incidences: total_task_incidences, 
              total_new_task_incidences: total_new_task_incidences, 
              task_badge_incidences_class: task_badge_incidences_class 
            });
          }else{
            currentTask[0].task_status = task_status;
            currentTask[0].status_class = current_element_status_class;
            currentTask[0].task_started_at = task_started_at;
            currentTask[0].finished_at = finished_at;
            currentTask[0].task_icon_class = current_element_icon_class;
            currentTask[0].task_status_class = current_element_status_class;
            currentTask[0].has_check_icon = has_check_icon;
            currentTask[0].task_incidences_class = task_incidences_class;
          }
        } else {
          task_array.value.push({ id: task.id, stage_id: stage_id, task_name: task_name, task_status: task_status, status_class: current_element_status_class, task_type: task_type, task_started_at: task_started_at, task_finished_at: task_finished_at, task_icon_class: current_element_icon_class, task_status_class: current_element_status_class, has_check_icon: has_check_icon, task_incidences_class: task_incidences_class, total_task_incidences: total_task_incidences, total_new_task_incidences: total_new_task_incidences, task_badge_incidences_class: task_badge_incidences_class });

        }

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
  if (trip.value.execution_at) {
    trip_executed_at.value = $h.formatDate(trip.value.execution_at, 'DD/MM/YYYY HH:mm');
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

const showIncidenceDetailModal = async (id) => {
  let foundInc = incidences_array.value.filter(obj => obj.id === id);
  currentIncId = foundInc[0].id;
  currentIncName = foundInc[0].level_name;
  currentIncLevel = foundInc[0].level;
  currentIncType = foundInc[0].type;
  currentIncDescription = foundInc[0].description;
  currentIncSended = foundInc[0].sended_at;
  currentIncReceptioned = foundInc[0].receptioned_at;
  currentIncReaded = foundInc[0].readed_at;
  incidenceDetails.value = true;
}

const hideIncidenceDetailModal = async () => {
  if (currentIncReaded == '--') {
    Swal.fire({
      icon: 'info',
      iconColor: 'rgb(0,150,178)',
      title: t("incidences.Swal.title"),
      html: '<span class="font-medium">' + t("incidences.Swal.text") + '</div>',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
        cancelButton: 'btn btn-secondary shadow-md ml-3',
        container: 'markAsSeen'
      },
      confirmButtonText: t("incidences.Swal.yes"),
      cancelButtonText: t("documents.swal.no"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        let dateNowTmp = new Date();
        let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
        let dateData = { readed_at: dateNow, has_seen: 1 };
        switch (currentIncLevel) {
          case 'trip':
            await updateTripIncident(currentIncId, dateData);
            break;
          case 'stage':
            await updateStageIncident(currentIncId, dateData);
            break;
          case 'task':
            await updateTaskIncident(currentIncId, dateData);
            break;
        }
        let foundInc = incidences_array.value.filter(obj => obj.id === currentIncId);
        foundInc[0].readed_at = dateNow;
        foundInc[0].has_seen = 1;
        currentIncId = '';
        currentIncName = '';
        currentIncType = '';
        currentIncDescription = '';
        currentIncSended = '';
        currentIncReceptioned = '';
        currentIncReaded = '';
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("incidences.Swal.set_readed_text"),
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            container: 'markAsSeen'
          },
        });
      }
    });
  }
  incidenceDetails.value = false;
}

const incidenceFile = async (id, path, status, file_name, action, level) => {
  if (status == 0) {
    Swal.fire({
      icon: 'info',
      iconColor: 'rgb(0,150,178)',
      title: t("incidences.Swal.file_title"),
      html: '<span class="font-medium">' + t("incidences.Swal.file_text") + '</div>',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
        cancelButton: 'btn btn-secondary shadow-md ml-3',
        container: 'markAsSeen'
      },
      confirmButtonText: t("incidences.Swal.file_yes"),
      cancelButtonText: t("documents.swal.no"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        let dateNowTmp = new Date();
        let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
        let dateData = { readed_at: dateNow, has_seen: 1 };
        switch (level) {
          case 'trip':
            await updateTripIncidentImage(id, dateData);
            break;
          case 'stage':
            await updateStageIncidentImage(id, dateData);
            break;
          case 'task':
            await updateTaskIncidentImage(id, dateData);
            break;
        }

        //await refreshTripIncidence(trip_incidence_selected_id.value);
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("incidences.Swal.set_readed_file"),
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            container: 'markAsSeen'
          },
        });
        openIncidenceFile(path, file_name, action);
      }
    });
  } else {
    openIncidenceFile(path, file_name, action);
  }
}

const openIncidenceFile = async (path, file_name, action) => {
  switch (action) {
    case 0:
      Swal.fire({
        icon: 'info',
        title: '',
        text: t("documents.swal.document_wait_viewing"),
        position: 'center',
        showConfirmButton: false,
        customClass: {
          container: 'markAsSeen'
        },
      });
      break;
    case 1:
      Swal.fire({
        icon: 'info',
        title: '',
        text: t("documents.swal.document_wait_download"),
        position: 'center',
        showConfirmButton: false,
        customClass: {
          container: 'markAsSeen'
        },
      });
      break;
  }
  await downloadDocument(path);
  if (action == 0) {
    //OPEN DOCUMENT
    Swal.close();
    switch (documentData.value.type) {
      case 'pdf':
        window.open(documentData.value.data);
        break;
      case 'png':
      case 'jpg':
      case 'jpeg':
        window.open(URL.createObjectURL(new Blob(["<img src='" + documentData.value.data + "' />"], { type: "text/html" })));
        break;
      default:
        Swal.fire({
          icon: 'error',
          title: '',
          text: t("documents.swal.document_error_viewing"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary shadow-md',
          },
        });
    }
  } else {
    //DOWNLOAD DOCUMENT
    const linkSource = documentData.value.data;
    const downloadLink = document.createElement("a");
    const fileName = file_name;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    Swal.close();
    downloadLink.click();
  }
}

//Function to refresh data every time asigned on ENV file.
const autoRefresh = setInterval(() => {
  TripDetails(route.params.id);
  console.log("Actualizado");
}, auto_refresh);

onMounted(() => {
  dom("body").removeClass("main").removeClass("login").addClass("error-page");
  TripDetails(route.params.id);
  //autoRefresh;
});

onUnmounted(() => {
  clearInterval(autoRefresh);
});

</script>

<style>
.markAsSeen {
  z-index: 999999;
}
</style>
