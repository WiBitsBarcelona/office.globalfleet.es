<template>
  <div class="intro-y box p-5 mt-0">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
            class="w-full xl:w-[600px] form-control mt-2 sm:mt-0"
            :placeholder="$t('incidences.filters.search_driver_placeholder')" @keyup="onFilter" />
          <XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
            @click="onResetFilter" />
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
  <!-- FOOTER -->
  <FleetFooter/>

<!-- BEGIN: Add Documents Modal Content -->
<Modal backdrop="static" :show="viewIncidenceModal" @hidden="viewIncidenceModalModal = false">
    <ModalBody class="px-2 py-5 text-center">
      <h2 class="text-lg font-medium text-left ml-5">{{ $t("incidences.Modal.title") }}</h2>
      <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideModal" >
      </XIcon>
      <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">

        <button type="button" @click="hideModal" class="btn btn-secondary w-60 mr-5">
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
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import FleetFooter from "@/components/fleet-footer/Main.vue"; 

const { t } = useI18n();
const addFileModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);

const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "driver",
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
const viewIncidenceModal = ref(false);

let fakeIncidencesData = [
  {id:4, driver:"Aitor Menta", incidence_type: "Avería del camión", comment: "Se ha recalentado el motor a causa de la retención y he tenido que solicitar asistencia.", sended_at: "11/07/2023 11:40:50", receptioned_at: "11/07/2023 11:41:00", readed_at: ""},
  {id:3, driver:"Aitor Menta", incidence_type: "Retencion de tráfico", comment: "Sigo parado en la autopista por culpa del accidente.", sended_at: "11/07/2023 11:10:33", receptioned_at: "11/07/2023 11:12:01", readed_at: ""},
  {id:2, driver:"Aitor Menta", incidence_type: "Retencion de tráfico", comment: "De camino a la recogida estoy parado en la autopista por un accidente.", sended_at: "11/07/2023 10:34:23", receptioned_at: "11/07/2023 10:35:05", readed_at: ""},
  {id:1, driver:"Aitor Menta", incidence_type: "Pinchazo de neumático", comment: "Rueda frontal izquierda pinchada a la salida de la base.", sended_at: "08/07/2023 08:01:11", receptioned_at: "08/07/2023 08:04:34", readed_at: "08/07/2023 08:06:01"},
];

const imageAssets = import.meta.globEager(
  `/src/assets/images/*.{jpg,jpeg,png,svg}`
);

const viewIcon = function (cell, formatterParams) {
  return "<i data-lucide='eye' class='w-6 h-6 mr-3 text-primary'></i>";
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    reactiveData: true,
    locale: true,
    data: fakeIncidencesData,
    printAsHtml: true,
    printStyled: true,
    pagination: "local",
    paginationSize: 15,
    paginationSizeSelector: [15, 30, 45, 60],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    rowFormatter:function(row){
        if(row.getData().readed_at == ""){
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
        field: "id",
        width: 100,
        sorter: 'number',

      },
      {
        title: t("incidences.Tabulator.driver"),
        minWidth: 200,
        responsive: 0,
        field: "driver",
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
      {
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
      },
      {
        title: t("incidences.Tabulator.sended_at"),
        minWidth: 200,
        field: "sended_at",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
/*         formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss')
        }, */
      },
      {
        title: t("incidences.Tabulator.received_at"),
        minWidth: 200,
        field: "receptioned_at",
        hozAlign: "left",
        vertAlign: "middle",
        print: false,
        download: false,
/*         formatter: function (cell) {
          return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm:ss')
        }, */        
      },
      {
        formatter: viewIcon,
        width: 50,
        hozAlign: "center",
        headerSort: false,
        tooltip: t("incidences.Tabulator.view_tooltip"),
        cellClick: function (e, cell) {
          //openFile(cell.getData().path);
          showModal();
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
  filter.field = "driver";
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

const showModal = async () => {
  viewIncidenceModal.value = true;
};

const hideModal = async () => {
  viewIncidenceModal.value = false;
};















onMounted(async () => {
  initTabulator();
  reInitOnResizeWindow();
});

</script>