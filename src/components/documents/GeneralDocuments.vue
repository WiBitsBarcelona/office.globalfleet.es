<template>
  <div class="intro-y box p-5 mt-0">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_placeholder')" @keyup="onFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetFilter" />
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addFilesModal = true">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("documents.upload_document") }}
            </button>
          </div>
        </div>
        <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
          <PrinterIcon class="w-4 h-4 mr-2" /> {{ $t("documents.print") }}
        </button>
        <Dropdown class="w-1/2 sm:w-auto">
          <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
            <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export") }}
            <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
          </DropdownToggle>
          <DropdownMenu class="w-40">
            <DropdownContent>
              <DropdownItem @click="onExportCsv">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_CSV") }}
              </DropdownItem>
              <DropdownItem @click="onExportJson">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_JSON") }}
              </DropdownItem>
              <DropdownItem @click="onExportXlsx">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_XLSX") }}
              </DropdownItem>
              <DropdownItem @click="onExportHtml">
                <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.export_HTML") }}
              </DropdownItem>
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->

  <!-- BEGIN: Add Documents Modal Content -->
  <Modal id="addDocsModal" backdrop="static" :show="addFilesModal" @hidden="addFilesModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("Dropzone.modal_title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideModal">
      </XIcon>
      <div @click="dropZoneClick" :class="{ 'opacity-25': uploading != 0 }"
        class="flex flex-col items-center justify-center upload_file_box mt-2 hover:cursor-pointer">
        <PlusCircleIcon class="w-16 h-16 text-primary"></PlusCircleIcon>
        <p class="mt-5 font-bold text-primary">{{ $t("Dropzone.title") }}</p>
        <p class="mt-2 text-slate-400">{{ $t("Dropzone.subtitle") }}</p>
        <p class="mt-2 text-slate-400">{{ $t("Dropzone.subtitle2") }}</p>
      </div>

      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
        <div class="col-span-12 text-right" v-if="!selected_file == ''">
          <p class="text-slate-400 text-xs">{{ $t("Dropzone.check_confirmation") }}</p>
        </div>
        <template v-for="file in state.files" :key="file.index">
          <div class="col-span-11">
            <div class="file_container">
              <div class="grid grid-cols-12">
                <div class="col-span-2">
                  <FileIcon class="w-10 h-10 text-primary opacity-25"></FileIcon>
                </div>
                <div class="col-span-9 text-left font-bold">
                  <p class="text-xs"> {{ $h.cutFileName(file.name, 50) }}</p>
                  <p class="text-xs font-light"> {{ $h.formatBytes(file.size) }}</p>
                </div>
                <div class="col-span-1 text-right">
                  <XIcon class="w-4 h-4 text-primary ml-3 hover:cursor-pointer" @click="dropZoneClearFile(file.name)"
                    :class="{ 'hidden': uploading != 0 }"></XIcon>
                  <LoadingIcon icon="oval" color="#0097b2" class="w-4 h-4" :class="{ 'hidden': uploading == 0 }" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-1">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" :value="file.name" v-model="checkedFiles" />
            </div>
          </div>
        </template>
        <template v-if="!selected_file == ''">
          <div class="col-span-11 text-right">
            <p class="text-primary text-xs">{{ $t("Dropzone.check_confirmation_all") }}</p>
          </div>
          <div class="col-span-1">
            <div class="form-check sm:mt-0">
              <input class="form-check-input" type="checkbox" value="" @click="selectAllFiles" />
            </div>
          </div>
          <div class="col-span-12 flex p-5 bg-orange-100 self-stretch	rounded-md">
            <div class="col-span-1 mr-2" :class="{ 'opacity-25': uploading != 0 }">
              <InfoIcon></InfoIcon>
            </div>
            <div class="col-span-11 text-left" :class="{ 'opacity-25': uploading != 0 }">
              {{ $t("Dropzone.upload_general_document") }}
            </div>
          </div>
          <div class="col-span-12 flex" :class="{ 'opacity-25': uploading != 0 }">
            <button type="button" @click="hideModal" class="btn btn-secondary w-60 mr-5">
              {{ $t("Dropzone.btn_close") }}
            </button>
            <button type="button" @click="dropZoneSendFiles" class="btn btn-primary text-white w-60">
              {{ $t("Dropzone.btn_upload") }}
            </button>
          </div>
        </template>
      </div>

      <input type="file" id="input_files" ref="file_selected" accept="application/pdf, image/*"
        class="btn btn-primary shadow-md hidden" multiple @change="dropZoneAddFiles($event)" />
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
import useCompanyDocument from "@/composables/company_documents";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import 'animate.css';

const { t } = useI18n();
const addFileModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);

const { companyDocuments, getCompanyDocuments, destroyCompanyDocument, errors, storeCompanyDocument, downloadCompanyDocument, companyDocumentData } = useCompanyDocument();
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "file_name",
  type: "like",
  value: "",
});
const file = ref(null);
const file_selected = ref('');
let selected_file = ref('');
const uploading = ref(0);
let fileJson = [];
const fileNameScreen = ref('');
const fileSizeScreen = ref(0);

let files = [];
const state = reactive({ files });
const addFilesModal = ref(false);
let checkedFiles = ref([]);
let allFilesChecked = false;

const findData = async () => {
  await getCompanyDocuments();
  const dataArr = JSON.parse(JSON.stringify(companyDocuments.value));
  return dataArr;
}

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const viewIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 mr-1 text-primary'></i>";
};

const downloadIcon = function (cell, formatterParams) {
  return "<i data-lucide='download' class='w-6 h-6 mr-1 text-success'></i>";
};

const deleteIcon = function (cell, formatterParams) {
  return "<i data-lucide='trash-2' class='w-6 h-6 mr-1 text-danger'></i>";
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    reactiveData: true,
    data: tableData.value,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
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
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      //{formatter:"rowSelection", titleFormatter:"rowSelection", width: 70, hozAlign:"center", headerSort:false},
      {
        title: t("Tabulator.General_columns.id"),
        field: "id",
        visible: false,
        sorter: 'number',

      },
      {
        title: t("Tabulator.General_columns.document"),
        minWidth: 400,
        responsive: 0,
        field: "file_name",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.General_columns.type"),
        minWidth: 100,
        width: 120,
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
        title: t("Tabulator.General_columns.created_by"),
        minWidth: 200,
        width: 300,
        responsive: 1,
        field: "employee.name",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.General_columns.created_at"),
        minWidth: 200,
        width: 300,
        responsive: 1,
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
        formatter: viewIcon,
        width: 50,
        responsive: 0,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.View"),
        cellClick: function (e, cell) {
          openFile(cell.getData().path);
        }
      },
      {
        formatter: downloadIcon,
        width: 50,
        responsive: 0,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.Download"),
        cellClick: function (e, cell) {
          downloadFile(cell.getData().path, cell.getData().file_name);
        }
      },
      {
        formatter:
          deleteIcon,
        responsive: 0,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.Delete"),
        cellClick: function (e, cell) {
          deleteDoc(cell.getData().id, cell.getData().file_name);
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
  filter.field = "file_name";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportJson = () => {
  tabulator.value.download("json", "data.json");
};

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};

const onExportHtml = () => {
  tabulator.value.download("html", "data.html", {
    style: true,
  });
};

// Print
const onPrint = () => {
  tabulator.value.print();
};

const deleteDoc = async (id, filename) => {
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
      await destroyCompanyDocument(id);
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
        tableData.value = await findData();
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

const dropZoneClick = (event) => {
  document.getElementById('input_files').click();
};

const dropZoneAddFiles = async (event) => {
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
    selected_file = '1';
    state.files.push(event.target.files[0]);
    file.value = event.target.files[0];
    const fileName = computed(() => file.value?.name);
    const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
    const fileMimeType = computed(() => file.value?.type);
    const fileSize = computed(() => file.value?.size);
    await toBase64(file.value).then(fileData => {
      fileJson.push({ file_name: fileName.value, size: fileSize.value, type: fileExtension.value, data: fileData });
    });
  }
}

const dropZoneClearFile = (currentFile) => {
  uploading.value = 0;
  const index = state.files.map(i => i.name).indexOf(currentFile);
  state.files.splice(index, 1);
  fileJson.splice(index, 1);
  if (state.files.length == 0) {
    selected_file = '';
  }
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const dropZoneSendFiles = async () => {
  uploading.value = 1;
  for (const element of fileJson) {
    await storeCompanyDocument(element);
  }
  addFilesModal.value = false;
  selected_file = '';
  state.files.length = 0;
  fileJson.length = 0;
  uploading.value = 0;
  if (errors.value === '') {
    //ARCHIVO ENVIADO CORRECTAMENTE
    tableData.value = await findData();
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

const hideModal = async () => {
  selected_file = '';
  addFilesModal.value = false;
  showNoFileError.value = false;
  uploading.value = 0;
  state.files.length = 0;
  fileJson.length = 0;
  checkedFiles.length = 0;
};

const openFile = async (path) => {
  Swal.fire({
    icon: 'info',
    title: '',
    text: t("documents.swal.document_wait_viewing"),
    //toast: true,
    position: 'center',
    showConfirmButton: false,
  });
  await downloadCompanyDocument(path);
  Swal.close();
  switch (companyDocumentData.value.type) {
    case 'pdf':
      window.open(companyDocumentData.value.data);
      break;
    case 'png':
    case 'jpg':
    case 'jpeg':
      window.open(URL.createObjectURL(new Blob(["<img width='800' src='" + companyDocumentData.value.data + "' />"], { type: "text/html" })));
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

const downloadFile = async (path, file_name) => {
  Swal.fire({
    icon: 'info',
    title: '',
    text: t("documents.swal.document_wait_download"),
    //toast: true,
    position: 'center',
    showConfirmButton: false,
  });
  await downloadCompanyDocument(path);
  const linkSource = companyDocumentData.value.data;
  const downloadLink = document.createElement("a");
  const fileName = file_name;
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  Swal.close();
  downloadLink.click();
}

const selectAllFiles = () => {
  if (!allFilesChecked) {
    state.files.forEach(file => {
      checkedFiles.value.push(file.name);
    });
    allFilesChecked = true;
  } else {
    checkedFiles.value = [];
    allFilesChecked = false;
  };
}

onMounted(async () => {
  tableData.value = await findData();
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