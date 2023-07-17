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
    <div class="intro-y col-12 text-center mt-5">
    <h2 class="text-lg font-medium truncate mr-5">{{ driver_name_selected }}</h2>
  </div>
  <div class="overflow-x-auto scrollbar-hidden">
      <div id="tabulator_driver" ref="tableRefDriver" class="mt-5 table-report table-report--tabulator"></div>
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
import useCompanyDocument from "@/composables/company_documents";
import useDriver from "@/composables/drivers";
import { useI18n } from 'vue-i18n';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";


const { t } = useI18n();
const addFileModal = ref(false);
const showNoFileError = ref(false);
const tableData = reactive([]);

const { companyDocuments, getCompanyDocuments, destroyCompanyDocument, errors, storeCompanyDocument, downloadCompanyDocument, companyDocumentData } = useCompanyDocument();
const { drivers, getDrivers } = useDriver();
const tableRef = ref();
const tabulator = ref();
const tableRefDriver = ref();
const tabulator_driver = ref();
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
      driver_id: element.driver_id,
      name: full_name
    });
  });
  return dataArr;
}

const findDataDriver = async () => {
  
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
              <i data-lucide='folder' class='w-5 h-5 mr-2 text-warning'></i>` + cell.getValue() + `</a>`);
          dom(a).on("click", function (event) {
            if (event.target.id == 'select_driver') {
              event.preventDefault();
              driver_selected.value = cell.getData().id;
              driver_name_selected.value = cell.getValue();
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
  console.log(tabulator.value);
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