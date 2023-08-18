<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 lg:col-span-2 2xl:col-span-2">
      <h2 class="intro-y text-lg font-medium mr-auto mt-2">
        {{ $t("documents.title") }}
      </h2>
      <!-- BEGIN: File Manager Menu -->
      <div class="intro-y box p-5 mt-6">
        <div class="flex flex-col gap-6 mt-1">
          <div class="flex flex-col gap-2 items-end">
            <a href="/documents" class="flex items-center w-full px-3 py-2 rounded-md bg-primary text-white font-medium">
              <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("documents.general_files") }}
            </a>
          </div>

          <div class="flex flex-col gap-2 items-end" v-for="employeeDriver in employeeDrivers" :key="employeeDriver.id">
            <a :href="'/driver_documents/' + employeeDriver.id"
              class="flex items-center w-full px-3 py-2 rounded-md font-medium hover:bg-gray-100 border-t border-slate-200">
              <UserIcon class="w-4 h-4 mr-2" /> {{ employeeDriver.driver.name }} {{ employeeDriver.driver.surname }}
            </a>
            <div class="flex w-full items-center justify-start gap-2">
              <p class="text-xl font-semibold"></p>
              <a href="" class="flex items-center px-2 py-2 rounded-md font-light w-10/12 hover:bg-gray-100">
                <MessageCircleIcon class="w-4 h-4 mr-2" /> {{ $t("documents.chat_files") }}
              </a>
            </div>
            <div class="flex w-full items-center justify-start gap-2">
              <p class="text-xl font-semibold"></p>
              <a href="" class="flex items-center px-1 py-1 rounded-md font-light w-10/12 hover:bg-gray-100">
                <NavigationIcon class="w-4 h-4 mr-2" /> {{ $t("documents.trip_files") }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- END: File Manager Menu -->
    </div>
    <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
      <!-- BEGIN: File Manager Filter -->
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <div class="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
          <h2 class="intro-y pl-2 font-medium mr-auto mt-2">
            {{ $t("documents.current_folder_lbl") }} <span class="font-light">{{ $t("documents.general_files") }}</span>
          </h2>
        </div>
        <div class="w-full sm:w-auto flex ml-auto">
          <button class="btn btn-primary shadow-md mr-2" @click="addFileModal = true">
            {{ $t("documents.upload_document") }}
          </button>
        </div>
      </div>
      <!-- END: File Manager Filter -->

      <!-- BEGIN: HTML Table Data -->
      <div class="intro-y box p-5 mt-5">
        <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
          <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
            <div class="sm:flex items-center sm:mr-4">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">{{ $t("documents.filters.field") }}</label>
              <select id="tabulator-html-filter-field" v-model="filter.field"
                class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
                <option value="filename">Documento</option>
                <option value="file_type">Tipo</option>
              </select>
            </div>
            <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">{{ $t("documents.filters.type") }}</label>
              <select id="tabulator-html-filter-type" v-model="filter.type"
                class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
                <option value="like" selected>{{ $t("documents.filters.like") }}</option>
                <option value="=">=</option>
                <option value="<">&lt;</option>
                <option value="<=">&lt;=</option>
                <option value=">">></option>
                <option value=">=">>=</option>
                <option value="!=">!=</option>
              </select>
            </div>
            <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">{{ $t("documents.filters.value") }}</label>
              <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
                class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
                :placeholder="$t('documents.filters.search_placeholder')" />
            </div>
            <div class="mt-2 xl:mt-0">
              <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16"
                @click="onFilter">
                {{ $t("documents.filters.search_btn") }}
              </button>
              <button id="tabulator-html-filter-reset" type="button"
                class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
                {{ $t("documents.filters.reset_search_btn") }}
              </button>
            </div>
          </form>
          <div class="flex mt-5 sm:mt-0">
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
            <Modal
              backdrop="static"
              :show="addFileModal"
              @hidden="addFileModal = false"
            >
              <ModalBody class="px-5 py-10">
                <div class="text-center">
                  <div class="mb-5">
                    <Dropzone
              ref-key="dropzoneMultipleRef"
              :options="{
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { 'My-Awesome-Header': 'header value' },
              }"
              class="dropzone"
            >
              <div class="text-lg font-medium">
                Drop files here or click to upload.
              </div>
              <div class="text-gray-600">
                This is just a demo dropzone. Selected files are
                <span class="font-medium">not</span> actually uploaded.
              </div>
            </Dropzone>
                  </div>
                  <button
                    type="button"
                    @click="addFileModal = false"
                    class="btn btn-primary w-24"
                  >
                    Cerrar
                  </button>
                </div>
              </ModalBody>
            </Modal>
            <!-- END: Modal Content -->

            <!-- BEGIN: Document Details Modal Content -->
            <Modal
              backdrop="static"
              :show="detailsModal"
              @hidden="detailsModal = false">
              <ModalBody class="px-5 py-10">
                <div class="text-center">
                  <div class="mb-5">
                    <Dropzone
              ref-key="dropzoneMultipleRef"
              :options="{
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { 'My-Awesome-Header': 'header value' },
              }"
              class="dropzone"
            >
              <div class="text-lg font-medium">
                Drop files here or click to upload.
              </div>
              <div class="text-gray-600">
                This is just a demo dropzone. Selected files are
                <span class="font-medium">not</span> actually uploaded.
              </div>
            </Dropzone>                  </div>
                  <button
                    type="button"
                    @click="detailsModal = false"
                    class="btn btn-primary w-24"
                  >
                    Cerrar
                  </button>
                </div>
              </ModalBody>
            </Modal>
            <!-- END: Modal Content -->

    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, reactive, onMounted } from 'vue';
import { faker } from '../../utils/faker';
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import useEmployeeDrivers from "@/composables/employee_drivers";
import useCompanyDocument from "@/composables/company_documents";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const addFileModal= ref(false);
const detailsModal= ref(false);

let fakeGeneralData = [
  {id:1, filename: "Manual Uso GlobalFleet Driver.pdf", size: "10,4Mb.", file_type: "Documento PDF", user:"Gerencia", created_at: "01/06/2023", url: "/public/docs/doc.pdf"},
  {id:2, filename: "Teléfonos de contacto Internos.xlsx", size: "2,34Mb.", file_type: "Hoja de Cálculo", user:"Gestor de tráfico 1", created_at: "02/06/2023", url: "/public/docs/doc.pdf"},
  {id:3, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "02/06/2023", url: "/public/docs/doc.pdf"},
  {id:4, filename: "Normativa Interna.pdf", size: "2,8Mb.", file_type: "Documento PDF", user:"Gerencia", created_at: "10/06/2023", url: "/public/docs/doc.pdf"},
  {id:5, filename: "Normativa Seguridad Vehículos.pdf", size: "5,6Mb.", file_type: "Documento PDF", user:"Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf"},
  {id:6, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf"},
  {id:7, filename: "Procedimientos de Carga.pdf", size: "1,4Mb.", file_type: "Documento PDF", user:"Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf"},
  {id:8, filename: "Procedimientos de Descarga.pdf", size: "1,4Mb.", file_type: "Documento PDF", user:"Gerencia", created_at: "11/06/2023", url: "/public/docs/doc.pdf"},
  {id:9, filename: "Precedimientos para iniciar un viaje.pdf", size: "6,2Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf"},
  {id:10, filename: "Protocolo de comunicación con vuestro Gestor de tráfico.pdf", size: "1,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf"},
  {id:11, filename: "Cómo colocar cartel de seguridad en el vehículo.jpg", size: "3,85Mb.", file_type: "Imágen", user:"Gestor de tráfico 1", created_at: "12/06/2023", url: "/public/docs/doc.pdf"},
  {id:12, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "13/06/2023", url: "/public/docs/doc.pdf"},
  {id:13, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "14/06/2023", url: "/public/docs/doc.pdf"},
  {id:14, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "15/06/2023", url: "/public/docs/doc.pdf"},
  {id:15, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "16/06/2023", url: "/public/docs/doc.pdf"},
  {id:16, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "17/06/2023", url: "/public/docs/doc.pdf"},
  {id:17, filename: "Comunicado a conductores.pdf", size: "2,4Mb.", file_type: "Documento PDF", user:"Gestor de tráfico 1", created_at: "18/06/2023", url: "/public/docs/doc.pdf"},
];


const { employeeDrivers, getEmployeeDrivers } = useEmployeeDrivers();
const { companyDocuments, getCompanyDocuments } = useCompanyDocument();

let selectedFolder = ref('viajes');
let foldersToShow = ref(faker);

const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "filename",
  type: "like",
  value: "",
});

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    //ajaxURL: "https://dummy-data.left4code.com",
    //ajaxFiltering: true,
    //ajaxSorting: true,
    data: fakeGeneralData,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "No matching records found",
    initialSort: [
      {column:"id", dir: "desc"}
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
      {
        title: "Identificador",
        field: "id",
        visible: false,
        sorter: 'number',
        
      },
      {
        title: "DOCUMENTO",
        minWidth: 300,
        responsive: 0,
        field: "url",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter: "link",
        formatterParams: {
          labelField: "filename",
          target: "_blank",
        },
      },
      {
        title: "TAMAÑO",
        minWidth: 200,
        field: "size",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "TIPO",
        minWidth: 200,
        field: "file_type",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "CREADO POR:",
        minWidth: 200,
        field: "user",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "FECHA:",
        minWidth: 200,
        field: "created_at",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
      },      
      {
        title: "ACCIONES",
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter() {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <a id="delete_btn" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Borrar
                </a>
              </div>`);
          dom(a).on("click", function (event) {
            console.log(event.target.id);
            if(event.target.id == 'details_btn'){
              event.preventDefault();
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
  filter.field = "filename";
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

onMounted(() => {
  initTabulator();
  reInitOnResizeWindow();
});


onBeforeMount(async () => {

  await getEmployeeDrivers();
  await getCompanyDocuments();
  const documentsData = JSON.parse(JSON.stringify(companyDocuments));
  console.log(documentsData);

});


</script>