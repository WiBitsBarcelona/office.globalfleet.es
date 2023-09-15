<template>
  <div class="intro-y box p-5 mt-0">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="trip_filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('incidences.filters.search_trip_placeholder')" @keyup="onTripFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetTripFilter" />
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onTripPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> {{ $t("documents.print") }}
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export") }}
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onTripExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_CSV") }}
              </DropdownItem>
              <DropdownItem @click="onTripExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_JSON") }}
              </DropdownItem>
              <DropdownItem @click="onTripExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_XLSX") }}
              </DropdownItem>
              <DropdownItem @click="onTripExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_HTML") }}
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="trip_tabulator" ref="tableTripRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

<!-- BEGIN: View Incidence Modal Content -->
<Modal backdrop="static" :show="viewTripIncidenceModal" @hidden="viewTripIncidenceModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("incidences.Modal.title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideTripModal" >
      </XIcon>
      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
        <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-center dark:bg-gray-800 dark:text-gray-400">
          <p class="text-md text-l font-bold leading-5 text-gray-500">{{trip_incidence_selected_name}}</p>
        </div>
        <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
          <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.type") }}</h5>
          <p class="text-md font-normal leading-4 text-gray-500">{{trip_incidence_selected_type}}</p>
        </div>
        <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
          <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.comment") }}</h5>
          <p class="text-md font-normal leading-4 text-gray-500">{{trip_incidence_selected_comment}}</p>
        </div>
        <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
          <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.sended_at") }}</h5>
          <p class="text-md font-normal leading-4 text-gray-500">{{trip_incidence_selected_sended_at}}</p>
        </div>
        <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
          <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.received_at") }}</h5>
          <p class="text-md font-normal leading-4 text-gray-500">{{trip_incidence_selected_received_at}}</p>
        </div>
        <div class="col-span-3"></div>
        <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
          <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.readed_at") }}</h5>
          <p class="text-md font-normal leading-4 text-gray-500">{{trip_incidence_selected_readed_at}}</p>
        </div> 
        <div class="col-span-3"></div>
        <div class="col-span-12 mt-5 text-center">
          <p class="text-lg font-medium leading-4 text-gray-500">{{ $t("incidences.Modal.files_title") }}</p>
        </div>
        <div v-for="incidenceFile in incidenceState.incidenceFiles" :key="incidenceFile.index" class="col-span-12 text-left">
          <Dropdown
                class="inline-block"
                placement="bottom-start"
                :show="dropdown"
                @hidden="dropdown = false"
              >
                <DropdownToggle class="btn" :class="incidenceFile.has_seen == 0 ? 'btn-primary' : 'btn_gray-100'">
                  <FileIcon class="w-4 h-4 mr-2" /> {{ incidenceFile.file_name }}
                  <ChevronDownIcon class="w-4 h-4 ml-2" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownContent>
                    <DropdownItem @click="tripIncidenceFile(incidenceFile.id,incidenceFile.path, incidenceFile.has_seen, incidenceFile.file_name, 0)">
                      <EyeIcon class="w-4 h-4 mr-2" /> {{ $t("incidences.Modal.file_view") }}
                    </DropdownItem>
                    <DropdownItem @click="tripIncidenceFile(incidenceFile.id,incidenceFile.path, incidenceFile.has_seen, incidenceFile.file_name, 1)">
                      <DownloadIcon class="w-4 h-4 mr-2" /> {{ $t("incidences.Modal.file_download") }}
                    </DropdownItem>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
        </div>  
        <div class="col-span-12 flex mt-5 justify-center">
          <button type="button" @click="setReadedTripIncidence(trip_incidence_selected_id)" class="btn btn-primary w-60 mr-5" :class="{ 'hidden': trip_incidence_readed != 0 }">
            {{ $t("incidences.Modal.btn_readed") }}
          </button>
          <button type="button" @click="hideTripModal" class="btn btn-secondary w-60 mr-5">
            {{ $t("incidences.Modal.btn_close") }}
          </button>
        </div>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->


</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import useTripIncident from "@/composables/trip_incidents";
import useDownloadDocument from "@/composables/download_documents";
import useTripIncidentImage from "@/composables/trip_incident_images";

const { getTripIncidents, tripIncidents, updateTripIncident, getTripIncident, tripIncident } = useTripIncident();
const { downloadDocument, documentData } = useDownloadDocument();
const { updateTripIncidentImage } = useTripIncidentImage();
const { t } = useI18n();

const tableTripRef = ref();
const trip_tabulator = ref();
const trip_filter = reactive({
  field: "trip",
  type: "like",
  value: "",
});
let dataArr = [];

let incidenceFiles = [];
const incidenceState = reactive({ incidenceFiles });
const viewTripIncidenceModal = ref(false);
const dropdown = ref(false);

let newImages = ref(0);

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const viewIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 text-primary'></i>";
};

const clipIcon = function (cell, formatterParams){
  if(cell.getData().has_new_images == 1){
    return "<i data-lucide='paperclip' class='w-6 h-6 text-primary'></i>";
  }else{
    return "<i data-lucide='paperclip' class='w-6 h-6 text-gray-500'></i>";
  };
};

const initTripTabulator = () => {
  trip_tabulator.value = new Tabulator(tableTripRef.value, {
    reactiveData: true,
    data: dataArr,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    rowFormatter:function(row){
        if(row.getData().readed_at == null){
            row.getElement().style.color = "rgba(0,150,178, 1)";
            row.getElement().style.fontWeight = "bold";
        }
    },
    initialSort: [
      { column: "id", dir: "desc" }
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
        vertAlign: "middle",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        field: "id",
        width: 100,
        sorter: 'number',
        visible: false,
      },
      {
        field: "has_new_image",
        width: 100,
        visible: false,
      },
      {
        formatter: clipIcon,
        width: 50,
        responsive: 0,
        hozAlign: "left",
        headerSort: false,
        tooltip: t("incidences.Tabulator.attachment_tooltip"),
        cellClick: function (e, cell) {
          showTripIncidenceModal(cell.getData().id);
        }
      },
      {
        title: t("incidences.Tabulator.trip"),
        minWidth: 500,
        responsive: 0,
        field: "trip",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: t("incidences.Tabulator.type"),
        minWidth: 200,
        field: "incidence_type",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false
      },
/*       {
        title: t("incidences.Tabulator.comment"),
        minWidth: 200,
        field: "comment",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,        
        formatter: function (cell) {
          return $h.cutText(cell.getValue(), 25)
        },
      }, */
      {
        title: t("incidences.Tabulator.sended_at"),
        minWidth: 200,
        field: "sended_at",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm')
        },
      },
      {
        title: t("incidences.Tabulator.received_at"),
        minWidth: 200,
        field: "receptioned_at",
        hozAlign: "left",
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
        formatter: viewIcon,
        width: 50,
        responsive: 0,
        hozAlign: "left",
        headerSort: false,
        tooltip: t("incidences.Tabulator.view_tooltip"),
        cellClick: function (e, cell) {
          showTripIncidenceModal(cell.getData().id);
        }
      },



      // For print format
      {
        title: "DOCUMENTO",
        field: "filename",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "CREADO POR",
        field: "user",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "FECHA",
        field: "created_at",
        visible: false,
        print: true,
        download: true,
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

const trip_incidence_readed = ref(0);
const trip_incidence_selected_id = ref(0);
let trip_incidence_selected_name = ref('');
let trip_incidence_selected_type = ref('');
let trip_incidence_selected_comment = ref('');
let trip_incidence_selected_sended_at = ref('');
let trip_incidence_selected_received_at = ref('');
let trip_incidence_selected_readed_at = ref('');

const emit = defineEmits(['totalNewTripIncidences']);
const newTripIncidences = reactive({
  value: 0
});

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    trip_tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onTripFilter = () => {
  trip_tabulator.value.setFilter(trip_filter.field, trip_filter.type, trip_filter.value);
};

// On reset filter
const onResetTripFilter = () => {
  trip_filter.field = "trip";
  trip_filter.type = "like";
  trip_filter.value = "";
  onTripFilter();
};

// Export
const onTripExportCsv = () => {
  trip_tabulator.value.download("csv", "incidencias.csv");
};

const onTripExportJson = () => {
  trip_tabulator.value.download("json", "incidencias.json");
};

const onTripExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  trip_tabulator.value.download("xlsx", "incidencias.xlsx", {
    sheetName: "Incidencias",
  });
};

const onTripExportHtml = () => {
  tabulator.value.download("html", "inicidencias.html", {
    style: true,
  });
};

// Print
const onTripPrint = () => {
  trip_tabulator.value.print();
};

const showTripIncidenceModal = async (id) => {
  incidenceState.incidenceFiles.length = 0;
  await getTripIncident(id);
  trip_incidence_selected_id.value = id;
  trip_incidence_selected_name = tripIncident.value.trip.name;
  trip_incidence_selected_type = tripIncident.value.type.name;
  trip_incidence_selected_comment = tripIncident.value.description;
  trip_incidence_selected_sended_at = $h.formatDate(tripIncident.value.created_at, "DD-MM-YYYY HH:mm");
  if(tripIncident.value.receptioned_at){
    trip_incidence_selected_received_at = $h.formatDate(tripIncident.value.receptioned_at, "DD-MM-YYYY HH:mm");
  }else{
    trip_incidence_selected_received_at = '--';
  }
  if(tripIncident.value.readed_at){
    trip_incidence_selected_readed_at = $h.formatDate(tripIncident.value.readed_at, "DD-MM-YYYY HH:mm");
    trip_incidence_readed.value = 1;
  }else{
    trip_incidence_selected_readed_at = '--';
    trip_incidence_readed.value = 0;
  }

  const dataArrTmp = tripIncident.value;
  dataArrTmp.images.forEach(element => {
    incidenceState.incidenceFiles.push(element);
   });

  viewTripIncidenceModal.value = true;
};

const hideTripModal = async () => {
  viewTripIncidenceModal.value = false;
  trip_incidence_selected_id.value = 0;
  trip_incidence_readed.value = 0;
};

const setReadedTripIncidence = async (id) => {
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
      await updateTripIncident(id, dateData);
      findTripsIncidencesData();
      trip_incidence_selected_id.value = 0;
      viewTripIncidenceModal.value = false;
      Swal.fire({
        icon: 'success',
        title: '',
        text: t("incidences.Swal.set_readed_text"),
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  });
};

const findTripsIncidencesData = async () => {
  dataArr.length = 0;
  let totalIncidences = 0;
  await getTripIncidents();
  const dataArrTmp = JSON.parse(JSON.stringify(tripIncidents.value));
  dataArrTmp.forEach(element => {
    const full_name = element.trip.name;
    let has_attachement = 0;
    if(element.receptioned_at == null){
      let dateNowTmp = new Date();
      let dateNow = $h.formatDate(dateNowTmp, "YYYY-MM-DD HH:mm:ss");
      let dateData = { receptioned_at: dateNow};
      updateTripIncident(element.id, dateData);
      element.receptioned_at = dateNow;
    }
    if(element.readed_at == null){
      totalIncidences ++;
    }
    if(element.images){
        has_attachement = 1;
        element.images.forEach(image => {
            if(image.has_seen == 0){
              newImages = 1;
            }else{
              newImages = 0;
            }
        });
    }
    dataArr.push({
      id: element.id,
      trip: full_name,
      incidence_type: element.type.name,
      comment: element.description,
      sended_at: element.created_at,
      receptioned_at: element.receptioned_at,
      readed_at: element.readed_at,
      has_attachement: has_attachement,
      has_new_images: newImages
    });
  });
  newTripIncidences.value = totalIncidences;
  emit('totalNewTripIncidences',newTripIncidences.value);
  initTripTabulator();
}

const tripIncidenceFile = async (id, path, status, file_name, action) => {
  if(status == 0){
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
      await updateTripIncidentImage(id, dateData);
      await refreshTripIncidence(trip_incidence_selected_id.value);
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
      openTripIncidenceFile(path, file_name, action);
    }
  });
  }else{
    openTripIncidenceFile(path, file_name, action);
  }
}

const refreshTripIncidence = async (id) => {
  incidenceState.incidenceFiles.length = 0;
  await getTripIncident(id);
  const dataArrTmp = tripIncident.value;
  dataArrTmp.images.forEach(element => {
    incidenceState.incidenceFiles.push(element);
   });

}

const openTripIncidenceFile = async (path, file_name, action) => {
  switch(action){
    case 0:
      Swal.fire({
        icon: 'info',
        title: '',
        text: t("documents.swal.document_wait_viewing"),
        //toast: true,
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
        //toast: true,
        position: 'center',
        showConfirmButton: false,
        customClass: {
          container: 'markAsSeen'
        },
      });
      break;
  }
  await downloadDocument(path);
  if(action == 0){
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
  }else{
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

onMounted(async () => {
  await findTripsIncidencesData();
  
  reInitOnResizeWindow();
});

</script>

<style>
.markAsSeen {
  z-index: 99999;
}
</style>