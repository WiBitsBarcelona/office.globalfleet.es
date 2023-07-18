<template>
  <div class="intro-y box p-5 mt-0 {}" :class="{'hidden' : !driver_selected == 0}">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_driver_placeholder')" @keyup="onFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetFilter" />
        </div>
      </form>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
  <div class="intro-y box p-5 mt-0 {}" :class="{'hidden' : driver_selected == 0}">
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
      <div class="flex justify-center mt-2">
        <h2 class="text-lg font-medium truncate mr-5">{{ driver_name_selected }}</h2>
      </div>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addFileModal = true">
              <PlusCircleIcon class="w-5 h-5 mr-2" />
              {{ $t("documents.upload_document") }}
            </button>
          </div>
        </div>
        <button id="tabulator-print" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2" @click="returnDrivers">
          <CornerUpLeftIcon class="w-4 h-4 mr-2" /> {{ $t("documents.return") }}
        </button>
      </div>
    </div>

  <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator_driver_documents" ref="tableRefDriverDocuments" class="mt-5 table-report table-report--tabulator"></div>
    </div>
  </div>

  <!-- BEGIN: Add Document Modal Content -->
  <Modal backdrop="static" :show="addFileModal" @hidden="addFileModal = false">
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-10">
          <div class="mb-3">
            <label class="text-xl font-bold" for="file">{{ $t("Dropzone.title") }}</label><br />
          </div>
          <input type="file" ref="file_selected" class="btn btn-primary shadow-md" @change="uploadFile" />
          <p class="mt-2">{{ $t("Dropzone.upload_general_document") }}</p>
          <p class="mt-2 font-medium text-danger intro-x" v-show="showNoFileError" @hidden="showNoFileError = false">{{
            $t("Dropzone.no_file") }}</p>
        </div>
        <button type="button" @click="sendFile" class="btn btn-success text-white w-40 mr-2">
          <UploadIcon class="w-5 h-5 mr-2" />
          {{ $t("Dropzone.btn_upload") }}
        </button>
        <button type="button" @click="hideModal" class="btn btn-danger w-40">
          <XCircleIcon class="w-5 h-5 mr-2" />
          {{ $t("Dropzone.btn_close") }}
        </button>
      </div>
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


const { t } = useI18n();
const addFileModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);

const { drivers, getDrivers } = useDriver();
const { driverDocuments, getDriverDocuments, driverDocumentData, downloadDriverDocument, destroyDriverDocument } = useDriverDocument();
const tableRef = ref();
const tabulator = ref();
const tableRefDriverDocuments = ref();
const tabulator_driver_documents = ref();
const filter = reactive({
  field: "name",
  type: "like",
  value: "",
});

const file_selected = ref('');
const driver_selected = ref(0);
const driver_name_selected = ref('');

let dataArr = [];


const findData = async () => {
  await getDrivers();
  const dataArrTmp = JSON.parse(JSON.stringify(drivers.value));
  dataArrTmp.forEach(element => {
    const full_name = element.name + ' ' + element.surname;
    dataArr.push({
      id: element.id,
      driver_id: element.user_id,
      name: full_name
    });
  });
  return dataArr;
}

const findDriverDocuments = async (id) => {
  await getDriverDocuments(id);
  const dataDriverDocuments = JSON.parse(JSON.stringify(driverDocuments.value));
  console.log(dataDriverDocuments);
  initDriverDocumentsTabulator();
}

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    reactiveData: true,
    locale: true,
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
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
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
        field: "driver_id",
        visible: false,
      },
      {
        title: t("Tabulator.Driver_columns.driver"),
        responsive: 0,
        field: "name",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {
          const a = dom(`
            <a id="select_driver" href="javascript:;" class='w-full flex flex-inline hover:ml-3 hover:font-medium'>
              <i data-lucide='folder' class='w-5 h-5 mr-2 text-primary'></i>` + cell.getValue() + `</a>`);
          dom(a).on("click", function (event) {
            if (event.target.id == 'select_driver') {
              event.preventDefault();
              driver_selected.value = cell.getData().driver_id;
              driver_name_selected.value = cell.getValue();
              findDriverDocuments(cell.getData().driver_id);
            }
          });
          //return "<div class='flex flex-inline hover:ml-3'><i data-lucide='folder' class='w-5 h-5 mr-2 text-warning'></i> <span class='hover:font-medium'>" + cell.getValue() + "</span></div>"
          return a[0];
        },
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

const viewIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 mr-1 text-primary'></i>";
};

const downloadIcon = function (cell, formatterParams) {
  return "<i data-lucide='download' class='w-6 h-6 mr-1 text-success'></i>";
};

const deleteIcon = function (cell, formatterParams) {
  return "<i data-lucide='trash-2' class='w-6 h-6 mr-1 text-danger'></i>";
};

const initDriverDocumentsTabulator = () => {
  tabulator.value = new Tabulator(tableRefDriverDocuments.value, {
    reactiveData: true,
    locale: true,
    data: driverDocuments.value,
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
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
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
        title: t("Tabulator.Driver_documents_columns.document"),
        responsive: 0,
        field: "file_name",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.Driver_documents_columns.type"),
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
/*       {
        title: t("Tabulator.Driver_documents_columns.created_by"),
        minWidth: 200,
        width:300,
        field: "employee.name",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      }, */
      {
        title: t("Tabulator.Driver_documents_columns.created_at"),
        minWidth: 200,
        field: "created_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss')
        },
      },
      {
        title: t("Tabulator.Driver_documents_columns.receptioned_at"),
        minWidth: 200,
        field: "receptioned_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Driver_documents_columns.confirmed_at"),
        minWidth: 200,
        field: "confirmed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        title: t("Tabulator.Driver_documents_columns.readed_at"),
        minWidth: 200,
        field: "readed_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell) {
          let data ='';
          if(cell.getValue()){
            data = $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss');
          }else{
            data = '--';
          }
          return data;
        },
      },
      {
        formatter: viewIcon,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.View"),
        cellClick: function (e, cell) {
          openDriverFile(cell.getData().path);
        }
      },
      {
        formatter: downloadIcon,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.Download"),
        cellClick: function (e, cell) {
          downloadDriverFile(cell.getData().path, cell.getData().file_name);
        }
      },
      {
        formatter:
        deleteIcon, 
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("Tabulator.ToolTips.Delete"),
        cellClick: function (e, cell) {
          deleteDriverDoc(cell.getData().id, cell.getData().file_name);
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
      window.open(URL.createObjectURL(new Blob(["<img src='" + driverDocumentData.value.data + "' />"], { type: "text/html" })));
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

const deleteDriverDoc = async (id, filename) => {
  console.log(id);
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
        await getDriverDocuments(id);
        initDriverDocumentsTabulator();
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

const returnDrivers = () => {
  driver_selected.value = 0;
  tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
}

onMounted(async () => {
  tableData.value = await findData();
  initTabulator();
  reInitOnResizeWindow();
});


</script>