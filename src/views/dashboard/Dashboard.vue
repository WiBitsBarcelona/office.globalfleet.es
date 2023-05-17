<template>
 <!-- BEGIN: HTML Table Data -->
 <div class="intro-y box p-5 mt-5" id="div_table">
  <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
    <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
      <div class="sm:flex items-center sm:mr-4">
        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
          {{ $t("field") }}
        </label>
        <select
          id="tabulator-html-filter-field"
          v-model="filter.field"
          class="form-select w-full sm:w-32 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
        >
          <option value="name">Nombre</option>
          <option value="reference_number">Referencia</option>
          <option value="remaining_stock">Remaining Stock</option>
          <option value="comm.name">Estatus</option>
        </select>
      </div>
      <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
          >{{ $t("filter") }}</label
        >
        <select
          id="tabulator-html-filter-type"
          v-model="filter.type"
          class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
        >
          <option value="like" selected>like</option>
          <option value="=">=</option>
          <option value="<">&lt;</option>
          <option value="<=">&lt;=</option>
          <option value=">">></option>
          <option value=">=">>=</option>
          <option value="!=">!=</option>
        </select>
      </div>
      <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
          >{{ $t("value") }}</label
        >
        <input
          id="tabulator-html-filter-value"
          v-model="filter.value"
          type="text"
          class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
        />
      </div>
      <div class="mt-2 xl:mt-0">
        <button
          id="tabulator-html-filter-go"
          type="button"
          class="btn btn-primary w-full sm:w-16"
          @click="onFilter"
        >
          <SearchIcon class="w-4 h-4"></SearchIcon> 
        </button>
        <button
          id="tabulator-html-filter-reset"
          type="button"
          class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
          @click="onResetFilter"
        >
         <RotateCcwIcon class="w-4 h-4"></RotateCcwIcon>
        </button>
      </div>
    </form>


    <div class="flex mt-5 sm:mt-0">
      <button
        class="btn btn-primary w-1/2 sm:w-auto mr-2"
        @click="createTrip"
      >
        <PlusCircleIcon class="w-4 h-4" />
      </button>

      <Dropdown class="w-1/2 sm:w-auto">
        <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
          <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("export") }}
          <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
        </DropdownToggle>
        <DropdownMenu class="w-40">
          <DropdownContent>
            <DropdownItem @click="onExportXlsx">
              <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("message.export_excel") }}
            </DropdownItem>
            <DropdownItem @click="onExportCsv"> 
              <FileTextIcon class="w-4 h-4 mr-2" /> {{ $t("message.export_csv") }}
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
  <div class="overflow-x-auto scrollbar-hidden mb-3">
    <div
      id="tabulator"
      ref="tableRef"
      class="mt-5 table-report table-report--tabulator"
    ></div>
  </div>
</div>
<!-- END: HTML Table Data -->






</template>




<script setup>

import { ref, reactive, onMounted, toRaw } from "vue";
  import xlsx from "xlsx";
  import { createIcons, icons } from "lucide";
  import Tabulator from "tabulator-tables";
  import { useI18n } from "vue-i18n";  

  import useTrips from "../../composables/trips";



  const { trips, getTrips, destroyTrip, storeTrip, updateTrip } = useTrips();

  const { t } = useI18n();



const tableData = reactive([]); //data for table to display
  

  let div_table; // 

  const tableRef = ref();
  const tabulator = ref();
  const filter = reactive({
    field: "name",
    type: "like",
    value: "",
  });
  


const findData = async() => {
  let dataArr = [];
  await getTrips();
  trips.value.forEach((elem)=>{
    dataArr.push(toRaw(elem));
  });
  return dataArr;
}




// Table 
const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [10, 20, 30, 40],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: t("message.no_matching_records_found"),
    reactiveData:true, //enable reactive data
    data: tableData.value,
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },
      {
        title: "Nombre",
        minWidth: 200,
        responsive: 0,
        field: "name",
        vertAlign: "middle",
      },
      {
        title: "Referencia",
        minWidth: 100,
        responsive: 0,
        field: "reference_number",
        vertAlign: "middle",
      },
      {
        title: "Etapas",
        minWidth: 200,
        responsive: 0,
        field: "stages",
        vertAlign: "middle",
        formatter(cell) {
          let stages = cell.getData().stages;
          let s = '';

          //console.log(cell.getData().stages);

          stages.forEach((el) => {
            s += el.name + '/';
          });
          return s;
        }
      },
      {
        title: "Estatus Comm",
        minWidth: 200,
        responsive: 0,
        field: "comm.name",
        vertAlign: "middle",
        formatter(cell) {

          let textColor = '';
          if(cell.getData().comm.id === 1){
            textColor = 'text-success';
          }else{
            textColor = 'text-danger';
          }

          return `<div class="flex items-center lg:justify-center 
          ${textColor}"
          >
            <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> 
              ${cell.getData().comm.name}
          </div>`;
        }
      },
      {
        title: "Estatus",
        minWidth: 200,
        responsive: 0,
        field: "status",
        vertAlign: "middle",
        formatter(cell) {
          return `<div class="flex items-center lg:justify-center 
          ${cell.getData().status.id === 1 ? "text-success" : "text-danger"}"
          >
            <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> 
              ${cell.getData().status.name}
          </div>`;
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



// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};



// Print
const onPrint = () => {
  tabulator.value.print();
};




// Init table
onMounted(async() => {
  tableData.value = await findData();
  initTabulator();
  reInitOnResizeWindow();
  div_table = document.querySelector('#div_table');
});


</script>
