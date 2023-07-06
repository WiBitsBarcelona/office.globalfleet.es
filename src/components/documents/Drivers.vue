<template>
  <div class="intro-y box p-5 mt-0">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('documents.filters.search_placeholder')" @keyup="onFilter" />
            <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer" @click="onResetFilter" />
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <div class="col-span-12 lg:col-span-2 2xl:col-span-2 ml-auto">
          <div class="w-full sm:w-auto flex">
            <button class="btn btn-primary shadow-md mr-2" @click="addFileModal = true">
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

  <!-- BEGIN: Add Document Modal Content -->
  <Modal backdrop="static" :show="addFileModal" @hidden="addFileModal = false">
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="mb-10">
          <div class="mb-3">
            <label class="text-xl font-bold" for="file">{{ $t("Dropzone.title") }}</label><br/>
          </div>
          <input type="file" ref="file_selected" class="btn btn-primary shadow-md"  @change="uploadFile" />
          <p class="mt-2">{{ $t("Dropzone.upload_general_document") }}</p>
          <p class="mt-2 font-medium text-danger intro-x" v-show="showNoFileError" @hidden="showNoFileError = false">{{ $t("Dropzone.no_file") }}</p>
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
import useCompanyDocument from "@/composables/company_documents";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";


const { t } = useI18n();
const addFileModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);
let fakeGeneralData = [
  { id: 1, filename: "Manual Uso GlobalFleet Driver.pdf", size: "10,4Mb.", file_type: "Documento PDF", user: "Gerencia", created_at: "01/06/2023", url: "/public/docs/doc.pdf" },
  { id: 2, filename: "Teléfonos de contacto Internos.xlsx", size: "2,34Mb.", file_type: "Hoja de Cálculo", user: "Gestor de tráfico 1", created_at: "02/06/2023", url: "/public/docs/doc.pdf" },
  { id: 3, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "02/06/2023", url: "/public/docs/doc.pdf" },
  { id: 4, filename: "Normativa Interna.pdf", size: "2,8Mb.", file_type: "Documento PDF", user: "Gerencia", created_at: "10/06/2023", url: "/public/docs/doc.pdf" },
  { id: 5, filename: "Normativa Seguridad Vehículos.pdf", size: "5,6Mb.", file_type: "Documento PDF", user: "Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf" },
  { id: 6, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf" },
  { id: 7, filename: "Procedimientos de Carga.pdf", size: "1,4Mb.", file_type: "Documento PDF", user: "Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf" },
  { id: 8, filename: "Procedimientos de Descarga.pdf", size: "1,4Mb.", file_type: "Documento PDF", user: "Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf" },
  { id: 9, filename: "Precedimientos para iniciar un viaje.pdf", size: "6,2Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf" },
  { id: 10, filename: "Protocolo de comunicación con vuestro Gestor de tráfico.pdf", size: "1,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf" },
  { id: 11, filename: "Cómo colocar cartel de seguridad en el vehículo.jpg", size: "3,85Mb.", file_type: "Imágen", user: "Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf" },
  { id: 12, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "13/06/2023", url: "/public/docs/doc.pdf" },
  { id: 13, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "14/06/2023", url: "/public/docs/doc.pdf" },
  { id: 14, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "15/06/2023", url: "/public/docs/doc.pdf" },
  { id: 15, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "16/06/2023", url: "/public/docs/doc.pdf" },
  { id: 16, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "17/06/2023", url: "/public/docs/doc.pdf" },
  { id: 17, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user: "Gestor de tráfico 1", created_at: "18/06/2023", url: "/public/docs/doc.pdf" },
];
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
let fileJson = {};

const findData = async () => {
  await getCompanyDocuments();
  const dataArr = JSON.parse(JSON.stringify(companyDocuments.value));
  return dataArr;
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
        hozAlign: "center",
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
        title: t("Tabulator.General_columns.document"),
        minWidth: 400,
        width: 200,
        responsive: 0,
        field: "file_name",
        vertAlign: "middle",
        print: false,
        download: false,
      },
/*       {
        title: t("Tabulator.General_columns.type"),
        minWidth: 100,
        field: "type",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: function (cell, formatterParams, onRendered) {
          return "<span class='uppercase'>" + cell.getValue() + "</span>"
        },
      }, */
      {
        title: t("Tabulator.General_columns.created_by"),
        minWidth: 200,
        field: "employee.name",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: t("Tabulator.General_columns.created_at"),
        minWidth: 200,
        field: "created_at",
        hozAlign: "center",
        vertAlign: "middle",
        tooltip: "created_at",
        print: false,
        download: false,
        formatter: function (cell) {          
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss')
        },
      },
      {
        title: 'Fecha Envío',
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
        title: 'Fecha Confirmación',
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
        title: 'Fecha Lectura',
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
        title: t("Tabulator.actions"),
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        headerSort: false,
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
            <a id="view_btn" class="flex items-center text-primary mr-2" href="javascript:;">
                  <i data-lucide="eye" class="w-4 h-4 mr-1"></i> Ver Documento
                </a>
                <a id="delete_btn" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Borrar
                </a>
              </div>`);
          dom(a).on("click", function (event) {
            if (event.target.id == 'delete_btn') {
              event.preventDefault();
              deleteDoc(cell.getData().id, cell.getData().file_name);
            }

            if (event.target.id == 'view_btn'){
              event.preventDefault();
              openFile(cell.getData().path);
            }
          });

          return a[0];
        },
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
    iconColor: 'red',
    title: t("documents.swal.are_you_sure"),
    html: '<span class="font-medium">' + t("documents.swal.delete") +'</span><br /><div class="mt-2 text-sm italic"> '+ filename + '</div>',
    showCancelButton: true,
    confirmButtonText: t("documents.swal.yes"),
    confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ALERT,
    cancelButtonText: t("documents.swal.no"),
    cancelButtonColor:import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
  }).then(async(result) => {
    if (result.isConfirmed) {
      await destroyCompanyDocument(id);
      if(errors.value == 'Role not allowed'){
        Swal.fire({
          icon: 'error',
          title: '',
          text: t("documents.swal.document_not_allowed"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ALERT,
        });
      }else{
        tableData.value = await findData();
        initTabulator();
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("documents.swal.document_deleted"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
        });
      }
    }
  });
}

const uploadFile = (event) => {
  file.value = event.target.files[0];
  const fileName = computed(() => file.value?.name);
  const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1));
  const fileMimeType = computed(() => file.value?.type);
  const fileSize = computed(() => file.value?.size);
  toBase64(file.value).then(fileData => { 
    fileJson = { file_name: fileName.value, size: fileSize.value, type: fileExtension.value, data: fileData };
  });

};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const sendFile= async () => {
  if(file_selected.value.value > ''){
  addFileModal.value = false;
  file_selected.value.value = '';
  await storeCompanyDocument(fileJson);
  if(errors.value === ''){
    //ARCHIVO ENVIADO CORRECTAMENTE
    tableData.value = await findData();
        initTabulator();
        Swal.fire({
          icon: 'success',
          title: '',
          text: t("documents.swal.document_uploaded"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
        });
  }else{
    //HUBO UN ERROR
    Swal.fire({
          icon: 'error',
          title: '',
          text: t("documents.swal.document_error_uploading"),
          confirmButtonText: t("documents.swal.all_right_btn"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ALERT,
        });
  }
  }else{
    showNoFileError.value = true;
  }
};

const hideModal = async () => {
  file_selected.value.value = '';
  addFileModal.value = false;
  showNoFileError.value = false;

};

const openFile = async (path) => {
  await downloadCompanyDocument(path);
  console.log(companyDocumentData.value);
  window.open(companyDocumentData.value);
}

onMounted(async () => {
  tableData.value = await findData();
  initTabulator();
  reInitOnResizeWindow();
});


onBeforeMount(async () => {

});

</script>

<style>
input[type=file]::file-selector-button {
  background-color: transparent;
  border: 0px solid #000;
  color: white;
  font-weight: 900;
}
</style>