<template>
  <div class="intro-y box p-5 mt-0 {}" :class="{'hidden' : screen_to_view != ''}">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="trips_filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_trip_placeholder')" @keyup="onTripsFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetTripsFilter" />
        </div>
      </form>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="trips_tabulator" ref="tableTripsRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
   <div class="intro-y box p-5 mt-0 {}" :class="{'hidden' : screen_to_view != 'trip' || screen_to_view == ''}">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="trip_documents_filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_placeholder')" @keyup="onTripDocumentsFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetTripDocumentsFilter" />
        </div>
      </form>
      <div class="flex items-start mt-2 xl:w-[600px]">
        <h2 class="text-lg font-medium text-primary intro-y truncate mr-5"><span class="text-gray-500">{{ $t("documents.trip") }}</span> {{ trip_name_selected }}</h2> 
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addTripFilesModal = true">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("documents.upload_document") }}
            </button>
          </div>
        </div>
        <button id="tabulator-print" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2" @click="returnTrips">
          <CornerUpLeftIcon class="w-4 h-4 mr-2" /> {{ $t("documents.return") }}
        </button>
      </div>
    </div>

    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator_trip_documents" ref="tableTripDocumentsRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div> 

   <div class="intro-y box p-5 mt-0 {}" :class="{'hidden' : screen_to_view != 'stage' || screen_to_view == ''}">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="stage_documents_filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_placeholder')" @keyup="onStageDocumentsFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetStageDocumentsFilter" />
        </div>
      </form>
      <div class="flex items-start mt-2 xl:w-[600px]">
        <h2 class="text-lg font-medium text-primary intro-y truncate mr-5"><span class="text-gray-500">{{ $t("documents.stage") }}</span> {{ stage_name_selected }}</h2> 
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addStageFilesModal = true">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("documents.upload_document") }}
            </button>
          </div>
        </div>
        <button id="tabulator-print" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2" @click="returnTrips">
          <CornerUpLeftIcon class="w-4 h-4 mr-2" /> {{ $t("documents.return") }}
        </button>
      </div>
    </div>

    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator_stage_documents" ref="tableStageDocumentsRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>  

  <!-- BEGIN: Add Trip Documents Modal Content -->
  <Modal backdrop="static" :show="addTripFilesModal" @hidden="addTripFilesModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("Dropzone.modal_title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideTripModal" >
      </XIcon>
      <div @click="dropZoneTripClick" :class="{ 'opacity-25': tripUploading != 0 }"
        class="flex flex-col items-center justify-center upload_file_box mt-2 hover:cursor-pointer">
        <PlusCircleIcon class="w-16 h-16 text-primary"></PlusCircleIcon>
        <p class="mt-5 font-bold text-primary">{{ $t("Dropzone.title") }}</p>
        <p class="mt-2 text-slate-400">{{ $t("Dropzone.subtitle") }}</p>
      </div>
      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
        <div class="col-span-12 text-right" v-if="!trip_selected_file == ''">
          <p class="text-slate-400 text-xs">{{ $t("Dropzone.check_confirmation") }}</p>
        </div>
        <template v-for="tripFile in tripState.tripFiles" :key="tripFile.index">
          <div class="col-span-11">
          <div class="file_container">
            <div class="grid grid-cols-12">
              <div class="col-span-2">
                <FileIcon class="w-10 h-10 text-primary opacity-25"></FileIcon>
              </div>
              <div class="col-span-9 text-left font-bold">
                <p class="text-xs"> {{ $h.cutFileName(tripFile.name, 50) }}</p>
                <p class="text-xs font-light"> {{ $h.formatBytes(tripFile.size) }}</p>
              </div>
              <div class="col-span-1 text-right">
                <XIcon class="w-4 h-4 text-primary ml-3 hover:cursor-pointer" @click="dropZoneTripClearFile(tripFile.name)"
                  :class="{ 'hidden': tripUploading != 0 }"></XIcon>
                  <LoadingIcon icon="oval" color="#0097b2" class="w-4 h-4" :class="{ 'hidden': tripUploading == 0 }" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1" :class="{ 'opacity-25': tripUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" :value="tripFile.name" v-model="checkedFiles" />
            </div>
          </div>
        </template>
        <template v-if="!trip_selected_file == ''">
          <div class="col-span-11 text-right" :class="{ 'opacity-25': tripUploading != 0 }">
            <p class="text-primary text-xs">{{ $t("Dropzone.check_confirmation_all") }}</p>
          </div>
          <div class="col-span-1" :class="{ 'opacity-25': tripUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" value="" @click="selectAllTripFiles" />
            </div>
          </div>
          <div class="col-span-12 flex p-5 bg-orange-100 self-stretch	rounded-md">
            <div class="col-span-1 mr-2" :class="{ 'opacity-25': tripUploading != 0 }">
              <InfoIcon></InfoIcon>
            </div>
            <div class="col-span-11 text-left" :class="{ 'opacity-25': tripUploading != 0 }">
              {{ $t("Dropzone.upload_trip_document") }} <span class="font-bold text-primary">{{ trip_name_selected }}</span>
            </div>
          </div>

          <div class="col-span-12 flex" :class="{ 'opacity-25': tripUploading != 0 }">
            <button type="button" @click="hideTripModal" class="btn btn-secondary w-60 mr-5">
              {{ $t("Dropzone.btn_close") }}
            </button>
            <button type="button" @click="dropZoneTripSendFiles(trip_selected)" class="btn btn-primary text-white w-60">
              {{ $t("Dropzone.btn_upload") }}
            </button>
          </div>
        </template>
      </div>

      <input type="file" id="input_trip_files" ref="file_trip_selected" accept="application/pdf, image/*"
        class="btn btn-primary shadow-md hidden" multiple @change="dropZoneTripAddFiles($event)" />
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->

  

    <!-- BEGIN: Add Stage Documents Modal Content -->
    <Modal backdrop="static" :show="addStageFilesModal" @hidden="addStageFilesModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("Dropzone.modal_title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideStageModal" >
      </XIcon>
      <div @click="dropZoneStageClick" :class="{ 'opacity-25': stageUploading != 0 }"
        class="flex flex-col items-center justify-center upload_file_box mt-2 hover:cursor-pointer">
        <PlusCircleIcon class="w-16 h-16 text-primary"></PlusCircleIcon>
        <p class="mt-5 font-bold text-primary">{{ $t("Dropzone.title") }}</p>
        <p class="mt-2 text-slate-400">{{ $t("Dropzone.subtitle") }}</p>
      </div>
      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
        <div class="col-span-12 text-right" v-if="!stage_selected_file == ''">
          <p class="text-slate-400 text-xs">{{ $t("Dropzone.check_confirmation") }}</p>
        </div>
        <template v-for="stageFile in stageState.stageFiles" :key="stageFile.index">
          <div class="col-span-11">
          <div class="file_container">
            <div class="grid grid-cols-12">
              <div class="col-span-2">
                <FileIcon class="w-10 h-10 text-primary opacity-25"></FileIcon>
              </div>
              <div class="col-span-9 text-left font-bold">
                <p class="text-xs"> {{ $h.cutFileName(stageFile.name, 50) }}</p>
                <p class="text-xs font-light"> {{ $h.formatBytes(stageFile.size) }}</p>
              </div>
              <div class="col-span-1 text-right">
                <XIcon class="w-4 h-4 text-primary ml-3 hover:cursor-pointer" @click="dropZoneStageClearFile(stageFile.name)"
                  :class="{ 'hidden': stageUploading != 0 }"></XIcon>
                  <LoadingIcon icon="oval" color="#0097b2" class="w-4 h-4" :class="{ 'hidden': stageUploading == 0 }" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1" :class="{ 'opacity-25': stageUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" :value="stageFile.name" v-model="checkedFiles" />
            </div>
          </div>
        </template>

        <template v-if="!stage_selected_file == ''">
          <div class="col-span-11 text-right" :class="{ 'opacity-25': stageUploading != 0 }">
            <p class="text-primary text-xs">{{ $t("Dropzone.check_confirmation_all") }}</p>
          </div>
          <div class="col-span-1" :class="{ 'opacity-25': stageUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" value="" @click="selectAllStageFiles" />
            </div>
          </div>
          <div class="col-span-12 flex p-5 bg-orange-100 self-stretch	rounded-md">
            <div class="col-span-1 mr-2" :class="{ 'opacity-25': stageUploading != 0 }">
            <InfoIcon></InfoIcon>
          </div>
          <div class="col-span-11 text-left" :class="{ 'opacity-25': stageUploading != 0 }">
            {{ $t("Dropzone.upload_stage_document") }} <span class="font-bold text-primary">{{ stage_name_selected }}</span>
          </div>
          </div>
          <div class="col-span-12 flex" :class="{ 'opacity-25': stageUploading != 0 }">
            <button type="button" @click="hideStageModal" class="btn btn-secondary w-60 mr-5">
              {{ $t("Dropzone.btn_close") }}
            </button>
            <button type="button" @click="dropZoneStageSendFiles(stage_selected)" class="btn btn-primary text-white w-60">
              {{ $t("Dropzone.btn_upload") }}
            </button>
          </div>
        </template>
      </div>

      <input type="file" id="input_stage_files" ref="file_stage_selected" accept="application/pdf, image/*"
        class="btn btn-primary shadow-md hidden" multiple @change="dropZoneStageAddFiles($event)" />
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script setup>
import { ref, onBeforeMount, reactive, onMounted, computed } from 'vue';
import Tabulator from "tabulator-tables";
import useTrips from "@/composables/trips";
import useTripDocument from "@/composables/trip_documents";
import useStageDocument from "@/composables/stage_documents";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import { createIcons, icons, createElement, MinusSquare, PlusSquare, CornerDownRight } from "lucide";
import Swal from "sweetalert2";

const { t } = useI18n();
const trip_selected = ref(0);
const stage_selected = ref(0);
const trip_name_selected = ref('');
const stage_name_selected = ref('');
const trips_filter = reactive({
  field: "trip",
  type: "like",
  value: "",
});
const trip_documents_filter = reactive({
  field: "file_name",
  type: "like",
  value: "",
});
const stage_documents_filter = reactive({
  field: "file_name",
  type: "like",
  value: "",
});
const { trips, getTrips, errors } = useTrips();
const { getTripDocuments, tripDocuments, tripDocumentData, downloadTripDocument, destroyTripDocument, storeTripDocument } = useTripDocument();
const {stageDocuments, getStageDocuments, stageDocumentData, downloadStageDocument , destroyStageDocument, storeStageDocument} = useStageDocument();
const tableTripsData = reactive([]);
const tableTripDocumentsData = reactive([]);
let dataTripsArr = [];
let dataTripDocumentsArr = [];
let dataStageDocumentsArr = [];
const tableTripsRef = ref();
const tableTripDocumentsRef = ref();
const tableStageDocumentsRef = ref();
const trips_tabulator = ref();
const tabulator_trip_documents = ref();
const tabulator_stage_documents = ref();
const addTripFilesModal = ref(false);
const addStageFilesModal = ref(false);
let tripFiles = [];
let stageFiles = [];
const tripState = reactive({ tripFiles });
const stageState = reactive( { stageFiles});
const tripUploading = ref(0);
const stageUploading = ref(0);
let tripFileJson = [];
let stageFileJson = [];
let trip_selected_file = ref('');
let stage_selected_file = ref('');
const tripFile = ref(null);
const stageFile = ref(null);
let screen_to_view = ref('');
let checkedFiles = ref([]);
let allFilesChecked = false;

// BEGIN GENERIC FUNCTIONS
const returnTrips = () => {
  screen_to_view.value = '';
  trip_selected.value = 0;
  stage_selected.value = 0;
  trips_tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
};

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});
// END GENERIC FUNCTIONS

// BEGIN OF TRIPS TABULATOR & FUNCTIONS
const findTripsData = async () => {
  await getTrips();
  const dataArrTmp = JSON.parse(JSON.stringify(trips.value));
  let dataStagesTmp = [];
  dataArrTmp.forEach(element => {
    const full_name = element.driver.name + ' ' + element.driver.surname;
    dataStagesTmp = [];
    if(element.stages.length > 0){
      element.stages.forEach(stage => {
        if(stage.activity){
          dataStagesTmp.push({
            id: stage.id,
            trip: stage.name,
            status_id: stage.status.id,
            status: stage.status.name,
            driver: full_name,
            execution_at: stage.execution_at,
            type: "stage", 
          });
        };
      });
    }
    dataTripsArr.push({
      id: element.id,
      trip: element.name,
      status_id: element.status.id,
      status: element.status.name,
      driver: full_name,
      execution_at: element.execution_at,
      type: "trip",
      _children: dataStagesTmp, 
    });
  });
  return dataTripsArr;
}

const minusIcon = createElement(MinusSquare);
minusIcon.setAttribute('stroke-width', '1.5');
minusIcon.setAttribute('color', 'rgb(0,150,178)');
const plusIcon = createElement(PlusSquare);
plusIcon.setAttribute('stroke-width', '1.5');
plusIcon.setAttribute('color', 'rgb(0,150,178)');

const rightIcon = createElement(CornerDownRight);
plusIcon.setAttribute('stroke-width', '1.5');

const initTripsTabulator = async () => {
  trips_tabulator.value = new Tabulator(tableTripsRef.value, {
    reactiveData: true,
    data: tableTripsData.value,
    dataTree:true,
    dataTreeCollapseElement: minusIcon,
    dataTreeExpandElement: plusIcon,
    //dataTreeBranchElement:rightIcon,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    initialSort: [
      { column: "execution_at", dir: "desc" }
    ],
    locale:true,
    langs:{
			"es-es":{
				"pagination":{
          "page_size":"", 
				}
			}
		},
    columns: [
      {
        formatter: "responsiveCollapse",
        hozAlign: "left",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: t("Tabulator.General_columns.id"),
        field: "id",
        visible: false,
        sorter: 'number',

      },
      {
        title: t("Tabulator.Trips_columns.trip"),
        minWidth: 450,
        responsive: 0,
        field: "trip",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {

          const a = dom(`
            <a id="select_trip" href="javascript:;" class='w-full flex flex-inline ml-2 hover:ml-4 hover:font-medium'>` + cell.getValue() + `</a>`);
            dom(a).on("click", function (event) {
              if (event.target.id == 'select_trip') {
                event.preventDefault();
                if(cell.getData().type == 'trip'){
                  screen_to_view.value = 'trip';
                  trip_name_selected.value = cell.getValue();
                  findTripDocuments(cell.getData().id);
                }else if(cell.getData().type == 'stage'){
                  screen_to_view.value = 'stage';
                  stage_name_selected.value = cell.getValue();
                  findStageDocuments(cell.getData().id);
                }
              }
            });
          return a[0];
        },
      },
      {
        field: "status_id",
        visible: false
      },
      {
        title: t("Tabulator.Trips_columns.status"),
        responsive: 1,
        field: "status",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {
          let pill_bg = '';
          let status = cell.getData().status_id;
          switch(status) {
            case 1:
            case 2:
              pill_bg = "bg-gray-100";
              break;
            case 3:
            case 4:
              pill_bg = "bg-orange-100";
              break;
            case 5:
              pill_bg = "bg-blue-100";
              break;
            case 6:
              pill_bg = "bg-green-100";
              break;
          }
          return '<span class="inline-flex items-center py-1.5 px-1.5 rounded-lg text-xs font-medium ' + pill_bg + '">' + cell.getValue() + '</span>'
        }       
      },
      {
        title: t("Tabulator.Trips_columns.driver"),
        responsive: 1,
        field: "driver",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,        
      },
      {
        title: t("Tabulator.Trips_columns.execution_at"),
        responsive: 1,
        field: "execution_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm')
        },        
      },
      {
        field: "type",
        visible: false,
      },
      
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

// Filter function
const onTripsFilter = () => {
  trips_tabulator.value.setFilter(trips_filter.field, trips_filter.type, trips_filter.value);
};

// On reset filter
const onResetTripsFilter = () => {
  trips_filter.field = "trip";
  trips_filter.type = "like";
  trips_filter.value = "";
  onTripsFilter();
};

const reInitTripsOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    trips_tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

const findTripDocuments = async (id) => {
  
  trip_selected.value = id;
  dataTripDocumentsArr.length = 0;
  await getTripDocuments(id);
  const dataArrTmp = JSON.parse(JSON.stringify(tripDocuments.value));

  dataArrTmp.forEach(element => {
    dataTripDocumentsArr.push({
      id: element.id,
      file_name: element.file_name,
      path: element.path,
      type: element.type,
      created_at: element.created_at,
      sended_at: element.sended_at,
      receptioned_at: element.receptioned_at,
      confirmed_at: element.confirmed_at,
      readed_at: element.readed_at,
      has_seen: element.has_seen,
    });
  });
  initTripDocumentsTabulator();
}

const findStageDocuments = async (id) => {
  stage_selected.value = id;
  dataStageDocumentsArr.length = 0;
  await getStageDocuments(id);

  const dataArrTmp = JSON.parse(JSON.stringify(stageDocuments.value));
  dataArrTmp.forEach(element => {
    dataStageDocumentsArr.push({
      id: element.id,
      file_name: element.file_name,
      path: element.path,
      type: element.type,
      created_at: element.created_at,
      sended_at: element.sended_at,
      receptioned_at: element.receptioned_at,
      confirmed_at: element.confirmed_at,
      readed_at: element.readed_at,
      has_seen: element.has_seen,
    });
  });
  initStageDocumentsTabulator();
}
// END OF TRIPS TABULATOR & FUNCTIONS


// BEGIN OF TRIP DOCUMENTS TABULATOR & FUNCTIONS
const onTripDocumentsFilter = () => {
  tabulator_trip_documents.value.setFilter(trip_documents_filter.field, trip_documents_filter.type, trip_documents_filter.value);
};

// On reset filter
const onResetTripDocumentsFilter = () => {
  trip_documents_filter.field = "file_name";
  trip_documents_filter.type = "like";
  trip_documents_filter.value = "";
  onTripDocumentsFilter();
};

const viewTripDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 mr-1 text-primary'></i>";
};

const downloadTripDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='download' class='w-6 h-6 mr-1 text-success'></i>";
};

const deleteTripDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='trash-2' class='w-6 h-6 mr-1 text-danger'></i>";
};

const initTripDocumentsTabulator = async () => {
  tabulator_trip_documents.value = new Tabulator(tableTripDocumentsRef.value, {
    reactiveData: true,
    locale: true,
    data: dataTripDocumentsArr,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    locale:true,
    langs:{
			"es-es":{
				"pagination":{
          "page_size":"", 
				}
			}
		},
    rowFormatter:function(row){
      if(row.getData().readed_at == null){
        row.getElement().style.color = "rgba(0,150,178, 1)";
        row.getElement().style.fontWeight = "bold";
      }
    },
    initialSort: [
      { column: "id", dir: "desc" }
    ],
    columns: [
      {
        formatter: "responsiveCollapse",
        hozAlign: "left",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: t("Tabulator.General_columns.id"),
        field: "id",
        visible: false,
        sorter: 'number',

      },
      {
        title: t("Tabulator.Trip_documents_columns.document"),
        minWidth: 450,
        responsive: 0,
        field: "file_name",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.Trip_documents_columns.type"),
        responsive: 1,
        minWidth: 100,
        field: "type",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {
          return "<span class='uppercase'>" + cell.getValue() + "</span>"
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.created_at"),
        responsive: 1,
        minWidth: 200,
        field: "created_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm')
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.receptioned_at"),
        minWidth: 200,
        field: "receptioned_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.confirmed_at"),
        responsive: 1,
        minWidth: 200,
        field: "confirmed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.readed_at"),
        responsive: 1,
        minWidth: 200,
        field: "readed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        formatter: viewTripDocumentIcon,
        responsive: 0,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.view"),
        cellClick: function (e, cell) {
          openTripFile(cell.getData().path);
        }
      },
      {
        formatter: downloadTripDocumentIcon,
        responsive: 0,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.download"),
        cellClick: function (e, cell) {
          downloadTripFile(cell.getData().path, cell.getData().file_name);
        }
      },
      {
        formatter:deleteTripDocumentIcon,
        responsive: 0, 
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.delete"),
        cellClick: function (e, cell) {
          deleteTripDoc(cell.getData().id, cell.getData().file_name, trip_selected.value);
        }
      },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

const openTripFile = async (path) => {
  Swal.fire({
      icon: 'info',
      title: '',
      text: t("documents.swal.document_wait_viewing"),
      //toast: true,
      position: 'center',
      showConfirmButton: false,
    });
  await downloadTripDocument(path);
  Swal.close();
  switch (tripDocumentData.value.type) {
    case 'pdf':
      window.open(tripDocumentData.value.data);
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
      window.open(URL.createObjectURL(new Blob(["<img width='800' src='" + tripDocumentData.value.data + "' />"], { type: "text/html" })));
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
}

const downloadTripFile = async (path, file_name) => {
  Swal.fire({
      icon: 'info',
      title: '',
      text: t("documents.swal.document_wait_download"),
      //toast: true,
      position: 'center',
      showConfirmButton: false,
    });
  await downloadTripDocument(path);

  const linkSource = tripDocumentData.value.data;
  const downloadLink = document.createElement("a");
  const fileName = file_name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  Swal.close();
  downloadLink.click();
}

const deleteTripDoc = async (id, filename, trip_id) => {
  Swal.fire({
    icon: 'warning',
    //iconColor: 'red',
    title: t("documents.swal.are_you_sure"),
    html: '<span class="font-medium">' + t("documents.swal.delete") + '</span><br /><div class="mt-2 text-sm italic"> ' + filename + '</div>',
    showCancelButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary shadow-md',
      cancelButton: 'btn btn-secondary shadow-md ml-3',
    },
    confirmButtonText: t("documents.swal.yes"),
    cancelButtonText: t("documents.swal.no"),
  }).then(async (result) => {
    if (result.isConfirmed) {
      await destroyTripDocument(id);
      if (errors.value == 'Role not allowed') {
        Swal.fire({
          icon: 'error',
          title: '',
          text: t("documents.swal.document_not_allowed"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary shadow-md',
          },
        });
      } else {
        await findTripDocuments(trip_id);
        //initDriverDocumentsTabulator();
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("documents.swal.document_deleted"),
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  });
}

const hideTripModal = async () => {
  trip_selected_file = '';
  addTripFilesModal.value = false;
  tripUploading.value = 0;
  tripState.tripFiles.length = 0;
  tripFileJson.length = 0;
  checkedFiles.value = [];
};

const dropZoneTripClick = (event) => {
  document.getElementById('input_trip_files').click();
};

const dropZoneTripAddFiles = async(event) => {
  if(event.target.files[0].size > 15000000){
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("documents.swal.file_size_error"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
        container : 'fileSizeError' 
      },
    });
  }else{
    trip_selected_file = '1';
    tripState.tripFiles.push(event.target.files[0]);
    tripFile.value = event.target.files[0];
    const fileName = computed(() => tripFile.value?.name);
    const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
    const fileMimeType = computed(() => tripFile.value?.type);
    const fileSize = computed(() => tripFile.value?.size);
    await toBase64(tripFile.value).then(fileData => {
      tripFileJson.push({trip_id: trip_selected.value, file_name: fileName.value, size: fileSize.value, type: fileExtension.value, data: fileData, has_ask_confirm: 0});
    });
  }
}

const dropZoneTripClearFile = (currentFile) => {
  tripUploading.value = 0;
  const index = tripState.tripFiles.map(i => i.name).indexOf(currentFile);
  tripState.tripFiles.splice(index,1);
  tripFileJson.splice(index,1);
  if(tripState.tripFiles.length == 0){
    trip_selected_file = '';
  }
}

const dropZoneTripSendFiles = async (trip_id) => {
  tripUploading.value = 1;
  await updateTripJson();
  for(const element of tripFileJson) {
    await storeTripDocument(element);
  }
  addTripFilesModal.value = false;
  trip_selected_file = '';
  tripState.tripFiles.length = 0;
  tripFileJson.length = 0;
  tripUploading.value = 0;
  if (errors.value === '') {
    //ARCHIVO ENVIADO CORRECTAMENTE
    await findTripDocuments(trip_id);
    Swal.fire({
      icon: 'success',
      title: '',
      text: t("documents.swal.document_uploaded"),
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  } else {
    //HUBO UN ERROR
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("documents.swal.document_error_uploading"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
      },
    });
  }

}

const selectAllTripFiles = () => {
  if (!allFilesChecked) {
    checkedFiles.value = [];
    tripState.tripFiles.forEach(file => {
      checkedFiles.value.push(file.name);
    });
    allFilesChecked = true;
  } else {
    checkedFiles.value = [];
    allFilesChecked = false;
  };
}

const updateTripJson = async () => {
  checkedFiles.value.forEach(function(element){
    const index2 = tripFileJson.map(i => i.file_name).indexOf(element);
    tripFileJson[index2].has_ask_confirm = 1;
  });
}
// END OF TRIP DOCUMENTS TABULATOR & FUNCTIONS


// BEGIN OF STAGE DOCUMENTS TABULATOR & FUNCTIONS
const onStageDocumentsFilter = () => {
  tabulator_stage_documents.value.setFilter(stage_documents_filter.field, stage_documents_filter.type, stage_documents_filter.value);
};

// On reset filter
const onResetStageDocumentsFilter = () => {
  stage_documents_filter.field = "file_name";
  stage_documents_filter.type = "like";
  stage_documents_filter.value = "";
  onStageDocumentsFilter();
};

const viewStageDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 mr-1 text-primary'></i>";
};

const downloadStageDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='download' class='w-6 h-6 mr-1 text-success'></i>";
};

const deleteStageDocumentIcon = function (cell, formatterParams) {
  return "<i data-lucide='trash-2' class='w-6 h-6 mr-1 text-danger'></i>";
};

const initStageDocumentsTabulator = async () => {
  tabulator_stage_documents.value = new Tabulator(tableStageDocumentsRef.value, {
    reactiveData: true,
    data: dataStageDocumentsArr,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    locale:true,
    langs:{
			"es-es":{
				"pagination":{
          "page_size":"", 
				}
			}
		},
    rowFormatter:function(row){
      if(row.getData().readed_at == null){
        row.getElement().style.color = "rgba(0,150,178, 1)";
        row.getElement().style.fontWeight = "bold";
      }
    },
    initialSort: [
      { column: "id", dir: "desc" }
    ],
    columns: [
      {
        formatter: "responsiveCollapse",
        hozAlign: "left",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: t("Tabulator.General_columns.id"),
        field: "id",
        visible: false,
        sorter: 'number',

      },
      {
        title: t("Tabulator.Trip_documents_columns.document"),
        minWidth: 450,
        responsive: 0,
        field: "file_name",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.Trip_documents_columns.type"),
        minWidth: 100,
        field: "type",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {
          return "<span class='uppercase'>" + cell.getValue() + "</span>"
        },
      },
      
      {
        title: t("Tabulator.Trip_documents_columns.created_at"),
        minWidth: 200,
        field: "created_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm')
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.receptioned_at"),
        minWidth: 200,
        field: "receptioned_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.confirmed_at"),
        minWidth: 200,
        field: "confirmed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Trip_documents_columns.readed_at"),
        minWidth: 200,
        field: "readed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        formatter: viewStageDocumentIcon,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.view"),
        cellClick: function (e, cell) {
          openStageFile(cell.getData().path);
        }
      },
      {
        formatter: downloadStageDocumentIcon,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.download"),
        cellClick: function (e, cell) {
          downloadStageFile(cell.getData().path, cell.getData().file_name);
        }
      },
      {
        formatter:deleteStageDocumentIcon, 
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("tooltips.delete"),
        cellClick: function (e, cell) {
          deleteStageDoc(cell.getData().id, cell.getData().file_name, stage_selected.value);
        }
      },
    ],
    renderComplete() {
      createIcons({
        icons,
        "stroke-width": 1.5,
        nameAttr: "data-lucide",
      });
    },
  });
};

const openStageFile = async (path) => {
  Swal.fire({
      icon: 'info',
      title: '',
      text: t("documents.swal.document_wait_viewing"),
      //toast: true,
      position: 'center',
      showConfirmButton: false,
    });
  await downloadStageDocument(path);
  Swal.close();
  switch (stageDocumentData.value.type) {
    case 'pdf':
      window.open(stageDocumentData.value.data);
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
      window.open(URL.createObjectURL(new Blob(["<img width='800' src='" + stageDocumentData.value.data + "' />"], { type: "text/html" })));
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
}

const downloadStageFile = async (path, file_name) => {
  Swal.fire({
      icon: 'info',
      title: '',
      text: t("documents.swal.document_wait_download"),
      //toast: true,
      position: 'center',
      showConfirmButton: false,
    });
  await downloadStageDocument(path);

  const linkSource = stageDocumentData.value.data;
  const downloadLink = document.createElement("a");
  const fileName = file_name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  Swal.close();
  downloadLink.click();
}

const deleteStageDoc = async (id, filename, stage_id) => {
  Swal.fire({
    icon: 'warning',
    //iconColor: 'red',
    title: t("documents.swal.are_you_sure"),
    html: '<span class="font-medium">' + t("documents.swal.delete") + '</span><br /><div class="mt-2 text-sm italic"> ' + filename + '</div>',
    showCancelButton: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary shadow-md',
      cancelButton: 'btn btn-secondary shadow-md ml-3',
    },
    confirmButtonText: t("documents.swal.yes"),
    cancelButtonText: t("documents.swal.no"),
  }).then(async (result) => {
    if (result.isConfirmed) {
      await destroyStageDocument(id);
      if (errors.value == 'Role not allowed') {
        Swal.fire({
          icon: 'error',
          title: '',
          text: t("documents.swal.document_not_allowed"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary shadow-md',
          },
        });
      } else {
        await findStageDocuments(stage_id);
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("documents.swal.document_deleted"),
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
  });
}

const hideStageModal = async () => {
  stage_selected_file = '';
  addStageFilesModal.value = false;
  stageUploading.value = 0;
  stageState.stageFiles.length = 0;
  stageFileJson.length = 0;
  checkedFiles.value = [];
};

const dropZoneStageClick = (event) => {
  document.getElementById('input_stage_files').click();
};

const dropZoneStageAddFiles = async(event) => {
  if(event.target.files[0].size > 15000000){
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("documents.swal.file_size_error"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
        container : 'fileSizeError' 
      },
    });
  }else{
    stage_selected_file = '1';
    stageState.stageFiles.push(event.target.files[0]);
    stageFile.value = event.target.files[0];
    const fileName = computed(() => stageFile.value?.name);
    const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
    const fileMimeType = computed(() => stageFile.value?.type);
    const fileSize = computed(() => stageFile.value?.size);
    await toBase64(stageFile.value).then(fileData => {
      stageFileJson.push({stage_id: stage_selected.value, file_name: fileName.value, size: fileSize.value, type: fileExtension.value, data: fileData, has_ask_confirm: 0 });
    });
  }
}

const dropZoneStageClearFile = (currentFile) => {
  stageUploading.value = 0;
  const index = stageState.stageFiles.map(i => i.name).indexOf(currentFile);
  stageState.stageFiles.splice(index,1);
  stageFileJson.splice(index,1);
  if(stageState.stageFiles.length == 0){
    stage_selected_file = '';
  }
}

const dropZoneStageSendFiles = async (stage_id) => {
  stageUploading.value = 1;
  await updateStageJson();
  for(const element of stageFileJson) {
    await storeStageDocument(element);
  }
  addStageFilesModal.value = false;
  stage_selected_file = '';
  stageState.stageFiles.length = 0;
  stageFileJson.length = 0;
  stageUploading.value = 0;
  if (errors.value === '') {
    //ARCHIVO ENVIADO CORRECTAMENTE
    await findStageDocuments(stage_id);
    Swal.fire({
      icon: 'success',
      title: '',
      text: t("documents.swal.document_uploaded"),
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  } else {
    //HUBO UN ERROR
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("documents.swal.document_error_uploading"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
      },
    });
  }
}

const selectAllStageFiles = () => {
  if (!allFilesChecked) {
    checkedFiles.value = [];
    stageState.stageFiles.forEach(file => {
      checkedFiles.value.push(file.name);
    });
    allFilesChecked = true;
  } else {
    checkedFiles.value = [];
    allFilesChecked = false;
  };
}

const updateStageJson = async () => {
  checkedFiles.value.forEach(function(element){
    const index2 = stageFileJson.map(i => i.file_name).indexOf(element);
    stageFileJson[index2].has_ask_confirm = 1;
  });
}
// END OF STAGE DOCUMENTS TABULATOR & FUNCTIONS

onMounted(async () => {
  tableTripsData.value = await findTripsData();
  await initTripsTabulator();
  reInitTripsOnResizeWindow();
});

</script>