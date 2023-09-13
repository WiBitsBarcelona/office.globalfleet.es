<template>
    <div
        class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[5.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        <!-- ACTIONS AND STAGES -->
        <div class="relative" v-for="element in trip_elements_array" :key="element.id">
            <div class="md:flex items-center md:space-x-4 mb-3">
                <div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                    <!-- Icon -->
                    <div :class="element.class">
                        <checkIcon v-if="element.has_icon == 1" class="text-success dark:text-white" />
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
                                    class="text-xs font-light text-gray-400">{{ $t("action") }}:</span> {{ element.name }}
                            </p>
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
                    <div class="grid grid-cols-5 gap-2 mb-5pb-2">
                        <div class="col-span-3">
                            <p class="text-md font-normal leading-6 text-gray-500"><span
                                    class="text-xs font-light text-gray-400">{{ $t("stage") }}:</span> {{ element.name }}
                            </p>
                        </div>
                        <div class="flex justify-end col-span-2">
                            <span :class="element.status_class">{{ element.element_status }} {{ element.activity }}</span>
                        </div>
                        <div class="px-2 col-span-2">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
                            <p class="text-md font-normal leading-6 text-gray-500">
                                {{ element.activity }}
                            </p>
                        </div>
                        <div class="col-span-3 px-2">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
                            <p class="text-md font-normal leading-6 text-gray-500">
                                {{ element.client }}
                            </p>
                        </div>
                        <div class="px-2">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
                            <p class="text-md font-normal leading-6 text-gray-500">
                                {{ element.executed_at }}
                            </p>
                        </div>
                        <div class="px-2">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("arrived_at") }}:</h5>
                            <p class="text-md font-normal leading-6 text-gray-500">
                                --
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
                            <h5 class="text-xs font-light text-gray-400">{{ $t("departured_at") }}:</h5>
                            <p class="text-md font-normal leading-6 text-gray-500">
                                --
                            </p>
                        </div>
                    </div>
                </div>
                <!-- End of Stage Card -->
            </div>
        </div>
    </div>
      <!-- BEGIN: Incidences Modal Content -->
  <Modal id="incidencesModal" size="modal-xl" backdrop="static" :show="incidencesModal" @hidden="incidencesModal = false">
    <ModalBody class="px-2 py-5 text-center text-gray-500">
      <h2 class="text-lg font-medium  ml-5">{{ $t("trip_details.title") }}</h2>
      <p></p>
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
            <tr v-if="incidence.level == 'trip'" class="intro-y" :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
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
            <tr v-if="incidence.level == 'stage'" class="intro-y" :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
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
            <tr v-if="incidence.level == 'task'" class="intro-y" :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
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
import { ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";

const props = defineProps([
    'stages'
]);

const { t } = useI18n();
const incidencesModal = ref(false);
const incidenceDetails = ref(false);

const stages = ref('');
const trip_elements_array = ref([]);
let element_status = '';
let icon_pending_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700';
let icon_active_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-white border-4 border-info shadow md:order-1 dark:bg-darkmode-600 dark:border-info';
let icon_success_class = 'flex items-center justify-center w-10 h-10 rounded-full bg-green-100 border border-success shadow md:order-1 dark:bg-darkmode-600 dark:border-success';
let current_element_icon_class = '';
let has_check_icon = 0;
let box_size = '';
let status_pending_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-gray-100 border border-gray-300 dark:border-gray-500 dark:text-white dark:bg-transparent';
let status_active_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-blue-100 border border-primary dark:border-primary dark:text-white dark:bg-transparent';
let status_success_class = 'inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium bg-green-100 border border-green-500 dark:border-green-500 dark:text-white dark:bg-transparent';
let current_element_status_class = '';
let element_value = '--';
let element_activity = '';
let element_client = '';
let executed_at = '';
let stage_incidences_class = 'hidden';
let currentElement = [];
let stage_badge_incidences_class = '';
let total_stage_incidences = 0;
let total_new_stage_incidences = 0;
let incidence_sended_at = '';
let incidence_receptioned_at = '';
let incidence_readed_at = '';
let incidences_images_array = [];
const incidences_array = ref([]);
let currentIncidence = [];
let currentIncId = '';
let currentIncName = '';
let currentIncLevel = '';
let currentIncType = '';
let currentIncDescription = '';
let currentIncSended = '';
let currentIncReceptioned = '';
let currentIncReaded = '--';

watchEffect(() => {
    stages.value = props.stages;
    setTimeout(() => {
        stages.value.forEach(element => {
            // FIND TRIP STAGES & ACTIONS
            //Common variables inicialization
            let element_type = '';
            let started_at = '';
            let finished_at = '';
            // Asign common values 
            //Set icon, icon color, status and status color of this element in timeline.
            switch (element.stage_status_id) {
                case 1:
                    element_status = element.status.name;
                    current_element_icon_class = icon_pending_class;
                    current_element_status_class = status_pending_class;
                    has_check_icon = 0;
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                    if (element.activity == null) {
                        element_status = t('trip_details.status_active');
                    } else {
                        element_status = element.status.name;
                    }
                    current_element_icon_class = icon_active_class;
                    current_element_status_class = status_active_class;
                    has_check_icon = 0;
                    break;
                case 6:
                    element_status = element.status.name;
                    current_element_icon_class = icon_success_class;
                    current_element_status_class = status_success_class;
                    has_check_icon = 1;
                    break;
            }
            let element_name = element.name;
            if (element.execution_at) {
                executed_at = $h.formatDate(element.execution_at, 'DD/MM/YYYY HH:mm');
            } else {
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
                            stage_incidences_class: stage_incidences_class
                        });
                    } else {
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
                    stage_incidences_class = 'text-gray-300 hover:cursor-pointer dark:text-gray-500';
                    stage_badge_incidences_class = 'bg-gray-300 border-gray-300';
                    total_new_stage_incidences = 0;
                    total_stage_incidences = 0;
                    element.incidents.forEach(incident => {
                        if (incident.stage_id == element.id) {
                            total_stage_incidences++;
                            if (incident.has_seen == 0) {
                                stage_incidences_class = 'text-primary hover:cursor-pointer dark:text-white';
                                stage_badge_incidences_class = 'bg-blue-300 border-primary';
                                total_new_stage_incidences++;
                            } else {
                                stage_incidences_class = 'text-gray-300 hover:cursor-pointer dark:text-gray-500';
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
                            } else {
                                currentIncidence[0].has_seen = incident.has_seen;
                                currentIncidence[0].readed_at = incident.readed_at;
                            }
                        } else {
                            incidences_array.value.push({ id: incident.id, level: 'stage', level_name: element.name, type: incident.type.name, has_seen: incident.has_seen, sended_at: incidence_sended_at, receptioned_at: incidence_receptioned_at, readed_at: incidence_readed_at });
                        }
                    });
                } else {
                    stage_incidences_class = 'hidden';
                    stage_badge_incidences_class = 'hidden';
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
                        });
                    } else {
                        currentElement[0].class = current_element_icon_class;
                        currentElement[0].has_icon = has_check_icon;
                        currentElement[0].status_class = current_element_status_class;
                        currentElement[0].element_status = element_status;
                        currentElement[0].value = element_value;
                        currentElement[0].started_at = started_at;
                        currentElement[0].finished_at = finished_at;
                        currentElement[0].stage_incidences_class = stage_incidences_class;
                        currentElement[0].total_stage_incidences = total_stage_incidences;
                        currentElement[0].total_new_stage_incidences = total_new_stage_incidences;
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
                    });
                }

            }

        });
    }, 500);
});

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

</script>