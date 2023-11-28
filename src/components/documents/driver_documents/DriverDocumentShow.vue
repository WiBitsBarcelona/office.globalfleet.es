<template>
  
  <!-- END: HTML Table Data -->
  <div class="intro-y box p-5 mt-0">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="driver_docs_filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_placeholder')" @keyup="onDriverDocumentsFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onDriverDocumentsResetFilter" />
        </div>
      </form>
      <div class="flex items-start mt-2 xl:w-[600px]">
        <h2 class="text-xl font-medium text-primary animate__animated animate__fadeInUp truncate mr-5">{{
          driver_name_selected }}</h2>
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addDriverFilesModal = true">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("documents.upload_document") }}
            </button>
          </div>
        </div>

        <button id="tabulator-print" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2" @click="backToRoute">
          <CornerUpLeftIcon class="w-4 h-4 mr-2" /> {{ $t("documents.return") }}
        </button>

      </div>
    </div>

    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator_driver_documents" ref="tableRefDriverDocuments"
        class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>

  <!-- BEGIN: Add Driver Documents Modal Content -->
  <Modal backdrop="static" :show="addDriverFilesModal" @hidden="addDriverFilesModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("Dropzone.modal_title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
        @click="hideDriverModal">
      </XIcon>
      <div @click="dropZoneDriverClick" :class="{ 'opacity-25': driverUploading != 0 }"
        class="flex flex-col items-center justify-center upload_file_box mt-2 hover:cursor-pointer">
        <PlusCircleIcon class="w-16 h-16 text-primary"></PlusCircleIcon>
        <p class="mt-5 font-bold text-primary">{{ $t("Dropzone.title") }}</p>
        <p class="mt-2 text-slate-400">{{ $t("Dropzone.subtitle") }}</p>
      </div>

      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
        <div class="col-span-12 text-right" v-if="!driver_selected_file == ''">
          <p class="text-slate-400 text-xs">{{ $t("Dropzone.check_confirmation") }}</p>
        </div>
        <template v-for="driverFile in driverState.driverFiles" :key="driverFile.index">
          <div class="col-span-11">
            <div class="file_container">
              <div class="grid grid-cols-12">
                <div class="col-span-2">
                  <FileIcon class="w-10 h-10 text-primary opacity-25"></FileIcon>
                </div>
                <div class="col-span-9 text-left font-bold">
                  <p class="text-xs"> {{ $h.cutFileName(driverFile.name, 50) }}</p>
                  <p class="text-xs font-light"> {{ $h.formatBytes(driverFile.size) }}</p>
                </div>
                <div class="col-span-1 text-right">
                  <XIcon class="w-4 h-4 text-primary ml-3 hover:cursor-pointer"
                    @click="dropZoneDriverClearFile(driverFile.name)" :class="{ 'hidden': driverUploading != 0 }"></XIcon>
                  <LoadingIcon icon="oval" color="#0097b2" class="w-4 h-4" :class="{ 'hidden': driverUploading == 0 }" />
                </div>
              </div>

            </div>
          </div>
          <div class="col-span-1" :class="{ 'opacity-25': driverUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" :value="driverFile.name" v-model="checkedFiles" />
            </div>
          </div>
        </template>

        <template v-if="!driver_selected_file == ''">
          <div class="col-span-11 text-right" :class="{ 'opacity-25': driverUploading != 0 }">
            <p class="text-primary text-xs">{{ $t("Dropzone.check_confirmation_all") }}</p>
          </div>
          <div class="col-span-1" :class="{ 'opacity-25': driverUploading != 0 }">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" value="" @click="selectAllFiles" />
            </div>
          </div>
          <div class="col-span-12 flex p-5 bg-orange-100 self-stretch	rounded-md">
            <div class="col-span-1 mr-2" :class="{ 'opacity-25': driverUploading != 0 }">
              <InfoIcon></InfoIcon>
            </div>
            <div class="col-span-11 text-left" :class="{ 'opacity-25': driverUploading != 0 }">
              {{ $t("Dropzone.upload_driver_document") }} <span class="font-bold text-primary">{{ driver_name_selected
              }}</span>
            </div>
          </div>

          <div class="col-span-12 flex" :class="{ 'opacity-25': driverUploading != 0 }">
            <button type="button" @click="hideDriverModal" class="btn btn-secondary w-60 mr-5">
              {{ $t("Dropzone.btn_close") }}
            </button>
            <button type="button" @click="dropZoneDriverSendFiles" class="btn btn-primary text-white w-60">
              {{ $t("Dropzone.btn_upload") }}
            </button>
          </div>
        </template>

        
      </div>

      <input type="file" id="input_driver_files" ref="file_driver_selected" accept="application/pdf, image/*"
        class="btn btn-primary shadow-md hidden" multiple @change="dropZoneDriverAddFiles($event)" />
    </ModalBody>
  </Modal>
  <!-- END: Modal Content -->
</template>

<script setup>
import { ref, onBeforeMount, reactive, onMounted, computed } from 'vue';
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import useDriver from "@/composables/drivers";
import useDriverDocument from "@/composables/driver_documents";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import { useRoute, useRouter } from 'vue-router';




const route = useRoute();
const router = useRouter();

const { t } = useI18n();
const addFileModal = ref(false);
const addDriverFilesModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);

//const { drivers, getDrivers } = useDriver();
const { driverDocuments, getDriverDocuments, driverDocumentData, downloadDriverDocument, destroyDriverDocument, storeDriverDocument, errors } = useDriverDocument();
const tableRef = ref();
const tabulator = ref();
const tableRefDriverDocuments = ref();
//const tabulator_driver_documents = ref();
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const driver_docs_filter = reactive({
  field: "file_name",
  type: "like",
  value: "",
})

//const file_selected = ref('');
const driver_selected = ref(0);
const driver_name_selected = ref('');
let driver_selected_file = ref('');
const driverFile = ref(null);
//let dataArr = [];

let driverFiles = [];
const driverState = reactive({ driverFiles });
const driverUploading = ref(0);
let driverFileJson = [];
let checkedFiles = ref([]);
let allFilesChecked = false;


const findData = async (id) => {
  await getDriverDocuments(id);
  //const dataDriverDocuments = JSON.parse(JSON.stringify(driverDocuments.value));
  initTabulator();
}

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);



const viewIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-5 h-5 text-primary'></i>";
};

const downloadIcon = function (cell, formatterParams) {
  return "<i data-lucide='download' class='w-5 h-5 text-success'></i>";
};

const deleteIcon = function (cell, formatterParams) {
  return "<i data-lucide='trash-2' class='w-5 h-5 text-danger'></i>";
};

const confirmationIcon = function (cell, formatterParams) {
  if(cell.getData().has_ask_confirm == 1){ 
    return "<i data-lucide='alert-circle' class='w-4 h-4 text-warning'></i>";
  }else{
    if(cell.getData().confirmed_at != null){ 
      return "<i data-lucide='check-circle' class='w-4 h-4 text-slate-400'></i>";
    }else{
      return "<i data-lucide='check-circle' class='w-4 h-4 text-transparent'></i>";
    }
  }
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRefDriverDocuments.value, {
    reactiveData: true,
    data: driverDocuments.value,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    columnHeaderVertAlign:"bottom",
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
          //NARANJA. NI LEIDO NI CONFIRMADO SIN IMPORTAR EL CHECK DE CONFIRMACION
          row.getElement().style.backgroundColor = "rgba(245,158,11, 0.25)";
          row.getElement().style.borderRadius = "5px";
          row.getElement().style.marginTop = "3px";
          row.getElement().style.marginBottom = "3px";
        }
        if(row.getData().confirmed_at == null && row.getData().readed_at != null){
          if(row.getData().has_ask_confirm == 1){
            //AZUL. LEIDO PERO NO CONFIRMADO Y EL CHECK DE CONFIRMACIÓN = 1
            row.getElement().style.backgroundColor = "rgba(0,150,178, 0.25)";
            row.getElement().style.borderRadius = "5px";
            row.getElement().style.marginTop = "3px";
            row.getElement().style.marginBottom = "3px";
          }
          if(row.getData().has_ask_confirm == 0){
            //VERDE. LEIDO SI CHECK CONFIRMACION = 0
            row.getElement().style.backgroundColor = "rgba(34,197,94, 0.25)";
            row.getElement().style.borderRadius = "5px";
            row.getElement().style.marginTop = "3px";
            row.getElement().style.marginBottom = "3px";
          }
        }
        if(row.getData().confirmed_at != null && row.getData().readed_at != null){
          //VERDE. LEIDO Y CONFIRMADO SI CHECK CONFIRMACIÓN
          //VERDE. LEIDO SI CHECK CONFIRMACION = 0
          row.getElement().style.backgroundColor = "rgba(34,197,94, 0.25)";
          row.getElement().style.borderRadius = "5px";
          row.getElement().style.marginTop = "3px";
          row.getElement().style.marginBottom = "3px";
        }
    },
    initialSort: [
      { column: "id", dir: "desc" }
    ],
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 40,
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
        title:t("Tabulator.Driver_documents_columns.document"),
        hozAlign: "center",
        columns:[
          {
            formatter: confirmationIcon,
            width: 40,
            responsive: 0,
            hozAlign: "center",
            headerSort: false,
          },
          {
            title: t("Tabulator.Driver_documents_columns.name"),
            width: 250,
            responsive: 0,
            field: "file_name",
            vertAlign: "middle",
            hozAlign: "left",
            print: false,
            download: false,
          },
          {
            title: t("Tabulator.Driver_documents_columns.type"),
            responsive: 0,
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
            title: t("Tabulator.Driver_documents_columns.size"),
            minWidth: 100,
            responsive: 0,
            field: "size",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter: function (cell, formatterParams, onRendered) {
              return $h.formatBytes(cell.getValue(),2);
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.pages"),
            width: 50,
            responsive: 0,
            field: "pages",
            vertAlign: "middle",
            hozAlign: "left",
            headerSort: false,
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue() != 0) {
                data = cell.getValue();
              } else {
                data = '--';
              }
              return data;
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.ER"),
            width: 50,
            responsive: 0,
            field: "has_from_employe",
            vertAlign: "middle",
            hozAlign: "left",
            headerSort: false,
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue() != 0) {
                data = "E";
              } else {
                data = 'R';
              }
              return data;
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.created_by"),
            responsive: 0,
            field: "has_from_employe",
            vertAlign: "middle",
            hozAlign: "left",
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue() != 0) {
                data = cell.getData().employee.name + ' ' +  cell.getData().employee.surname;
              } else {
                data = cell.getData().driver.name + ' ' +  cell.getData().driver.surname;
              }
              return data;
            },
          }
        ],
      },
      {
        title:t("Tabulator.Driver_documents_columns.dates"),
        hozAlign: "center",
        columns:[
          {
            title: t("Tabulator.Driver_documents_columns.created_at"),
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
            title: t("Tabulator.Driver_documents_columns.receptioned_at"),
            field: "receptioned_at",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue()) {
                data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
              } else {
                data = '--';
              }
              return data;
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.confirmed_at"),
            field: "confirmed_at",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue()) {
                data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
              } else {
                data = '--';
              }
              return data;
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.readed_at"),
            field: "readed_at",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue()) {
                data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
              } else {
                data = '--';
              }
              return data;
            },
          },
          {
            title: t("Tabulator.Driver_documents_columns.last_readed_at"),
            field: "last_readed_at",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter: function (cell) {
              let data = '';
              if (cell.getValue()) {
                data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm');
              } else {
                data = '--';
              }
              return data;
            },
          },
        ],
      },
      {
        title:t("Tabulator.Driver_documents_columns.actions"),
        hozAlign: "center",
        columns:[
          {
            formatter: viewIcon,
            width: 40,
            responsive: 0,
            hozAlign: "center",
            headerSort: false,
            tooltip: t("tooltips.view"),
            cellClick: function (e, cell) {
              openDriverFile(cell.getData().path);
            }
          },
          {
            formatter: downloadIcon,
            width: 40,
            responsive: 0,
            hozAlign: "center",
            headerSort: false,
            tooltip: t("tooltips.download"),
            cellClick: function (e, cell) {
              downloadDriverFile(cell.getData().path, cell.getData().file_name);
            }
          },
          {
            formatter: deleteIcon,
            width: 50,
            responsive: 0,
            hozAlign: "center",
            headerSort: false,
            tooltip: t("tooltips.delete"),
            cellClick: function (e, cell) {
              deleteDriverDoc(cell.getData().id, cell.getData().file_name, driver_selected.value);
            }
          },
        ]
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

const openDriverFile = async (path) => {
  Swal.fire({
    icon: 'info',
    title: '',
    text: t("documents.swal.document_wait_viewing"),
    //toast: true,
    position: 'center',
    showConfirmButton: false,
  });
  await downloadDriverDocument(path);
  Swal.close();
  switch (driverDocumentData.value.type) {
    case 'pdf':
      window.open(driverDocumentData.value.data);
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
      window.open(URL.createObjectURL(new Blob(["<img width='800' src='" + driverDocumentData.value.data + "' />"], { type: "text/html" })));
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

const downloadDriverFile = async (path, file_name) => {
  Swal.fire({
    icon: 'info',
    title: '',
    text: t("documents.swal.document_wait_download"),
    //toast: true,
    position: 'center',
    showConfirmButton: false,
  });
  await downloadDriverDocument(path);

  const linkSource = driverDocumentData.value.data;
  const downloadLink = document.createElement("a");
  const fileName = file_name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  Swal.close();
  downloadLink.click();
}

const deleteDriverDoc = async (id, filename, driver_id) => {
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
      await destroyDriverDocument(id);
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
        await getDriverDocuments(driver_id);
        initTabulator();
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


// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "name";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

const onDriverDocumentsFilter = () => {
  tabulator.value.setFilter(driver_docs_filter.field, driver_docs_filter.type, driver_docs_filter.value);
};

const onDriverDocumentsResetFilter = () => {
  driver_docs_filter.field = "file_name";
  driver_docs_filter.type = "like";
  driver_docs_filter.value = "";
  onDriverDocumentsFilter();
};

const backToRoute = () => {
  
  router.push({'name':'documents-drivers'});

}

const hideDriverModal = async () => {
  driver_selected_file = '';
  addDriverFilesModal.value = false;
  showNoFileError.value = false;
  driverUploading.value = 0;
  driverState.driverFiles.length = 0;
  driverFileJson.length = 0;
  checkedFiles.value = [];
};

const dropZoneDriverClick = (event) => {
  document.getElementById('input_driver_files').click();
};

const dropZoneDriverAddFiles = async (event) => {
  if (event.target.files[0].size > 15000000) {
    Swal.fire({
      icon: 'error',
      title: '',
      text: t("documents.swal.file_size_error"),
      confirmButtonText: t("documents.swal.all_right_btn"),
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary shadow-md',
        container: 'fileSizeError'
      },
    });
  } else {
    driver_selected_file = '1';
    driverState.driverFiles.push(event.target.files[0]);
    driverFile.value = event.target.files[0];
    const fileName = computed(() => driverFile.value?.name);
    const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
    const fileMimeType = computed(() => driverFile.value?.type);
    const fileSize = computed(() => driverFile.value?.size);
    //FUNCION PARA VER EL NÚMERO DE PÁGINAS SI ES UN PDF
    let pages_count;
    if(fileExtension.value == 'pdf'){
      let reader = new FileReader();
      reader.readAsBinaryString(event.target.files[0]);
      reader.onloadend = function(){

        //console.log("***", reader.result.match(/\/Type[\s]*\/Page[^s]/g)?.length);

        if(reader.result.match(/\/Type[\s]*\/Page[^s]/g)?.length === undefined){
          pages_count = 0;
        }else{
          pages_count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
        }
      }
    }else{
      pages_count = 0;
    }
  

    await toBase64(driverFile.value).then(fileData => {
      driverFileJson.push({ driver_id: driver_selected.value, file_name: fileName.value, size: fileSize.value, type: fileExtension.value, data: fileData, has_ask_confirm: 0, pages: pages_count});
    });
  }
}

const dropZoneDriverClearFile = (currentFile) => {
  driverUploading.value = 0;
  const index = driverState.driverFiles.map(i => i.name).indexOf(currentFile);
  driverState.driverFiles.splice(index, 1);
  driverFileJson.splice(index, 1);
  if (driverState.driverFiles.length == 0) {
    driver_selected_file = '';
  }
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const dropZoneDriverSendFiles = async () => {
  driverUploading.value = 1;
  //BEFORE SEND FILES CHECKS AND UPDATE FOR HAS_ASK_CONFIRM
  await updateJson();
  for (const element of driverFileJson) {
    await storeDriverDocument(element);
  }
  addDriverFilesModal.value = false;
  driver_selected_file = '';
  driverState.driverFiles.length = 0;
  driverFileJson.length = 0;
  driverUploading.value = 0;
  if (errors.value === '') {
    //ARCHIVO ENVIADO CORRECTAMENTE
    await getDriverDocuments(driver_selected.value);
    initTabulator();
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

const selectAllFiles = () => {
  if (!allFilesChecked) {
    checkedFiles.value = [];
    driverState.driverFiles.forEach(file => {
      checkedFiles.value.push(file.name);
    });
    allFilesChecked = true;
  } else {
    checkedFiles.value = [];
    allFilesChecked = false;
  };
}

const updateJson = async () => {
  checkedFiles.value.forEach(function(element){
    const index2 = driverFileJson.map(i => i.file_name).indexOf(element);
    driverFileJson[index2].has_ask_confirm = 1;
  });
}

onMounted(async () => {
  driver_selected.value = route.params.id;
  tableData.value = await findData(route.params.id);
  initTabulator();
  reInitOnResizeWindow();
});


</script>

<style>
.upload_file_box {
  text-align: center !important;
  width: auto;
  border: solid;
  border-width: 1px;
  border-color: rgb(0 150 178);
  border-style: dashed;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  height: 200px;
}

.file_container {
  text-align: left !important;
  width: auto;
  border: solid;
  border-width: 1px;
  border-color: rgba(0, 150, 178, 0.3);
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
}

.fileSizeError {
  z-index: 99999;
}
</style>