<template>
  
    <div class="intro-y box p-5 mt-5" v-if="isCreate">
        <Create
            @saveTrip="saveTrip"
            @cancelCreate="cancelCreate"
        />
    </div>


    <div class="intro-y box p-5 mt-5" v-if="isUpdate">
      <Edit
        :tripId="tripId"
        @cancelEdit="cancelEdit"
        @updateTripForm="updateTripForm"
      />
    </div>

  
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

  import useTrips from "@/composables/trips";
  import Create from "@/components/trips/TripCreate.vue";
  import Edit from "@/components/trips/TripEdit.vue";

  import Swal from "sweetalert2";
  //TODO pendiente
  import Toastify from "toastify-js";



  const { trips, getTrips, destroyTrip, storeTrip, updateTrip } = useTrips();

  const { t } = useI18n();

  const isCreate = ref(false);
  const isUpdate = ref(false);
  const tripId = ref(0);

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
        title: t("name"),
        minWidth: 200,
        responsive: 0,
        field: "name",
        vertAlign: "middle",
        headerHozAlign:"left"
      },
      {
        title: t("reference_number"),
        minWidth: 100,
        responsive: 0,
        field: "reference_number",
        vertAlign: "middle",
        headerHozAlign:"left"
      },
      {
        title: t("reference_number"),
        minWidth: 100,
        responsive: 0,
        field: "reference_number",
        vertAlign: "middle",
        headerHozAlign:"left"
      },
      {
        title: t("stages"),
        minWidth: 200,
        responsive: 0,
        field: "stages",
        vertAlign: "middle",
        headerHozAlign:"left",
        formatter(cell) {
          
          let stages = cell.getData().stages;
          let s = '';

          //console.log(cell.getData().stages);

          stages.forEach((el) => {
            
            s += el.name + `(${el.status.name} ${el.id})` + ' / ';
            
            //console.log({...el.status});
          });
          return s;
        }
      },
      {
        title: t("trip_priority"),
        minWidth: 200,
        responsive: 0,
        field: "priority.name",
        vertAlign: "middle",
        headerHozAlign:"left",
        formatter(cell) {

          let textColor = '';
          if(cell.getData().priority.id === 1){
            textColor = 'text-success';
          }else if(cell.getData().priority.id === 2){
            textColor = 'text-blue-500';
          }else if(cell.getData().priority.id === 3){
            textColor = 'text-orange-600';
          }

          //<i data-lucide="check-square" class="w-4 h-4 mr-2"></i> 

          return `<div class="flex items-center lg:justify-center 
          ${textColor}"
          >
            
              ${cell.getData().priority.name}
          </div>`;
        }
      },
      {
        title: t("trip_comm_status"),
        minWidth: 200,
        responsive: 0,
        field: "comm.name",
        vertAlign: "middle",
        headerHozAlign:"left",
        formatter(cell) {

          let textColor = '';
          if(cell.getData().comm.id === 1){
            textColor = 'text-success';
          }else if(cell.getData().comm.id === 2){
            textColor = 'text-amber-500';
          }else if(cell.getData().comm.id === 3){
            textColor = 'text-orange-600';
          }

          //<i data-lucide="check-square" class="w-4 h-4 mr-2"></i> 

          return `<div class="flex items-center lg:justify-center 
          ${textColor}"
          >
            
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
        headerHozAlign:"left",
        formatter(cell) {

          let textColor = ''; 

          if(cell.getData().status.id === 1){
            textColor = 'text-cyan-400';
          }else if(cell.getData().status.id === 2){
            textColor = 'text-cyan-500';
          }else if(cell.getData().status.id === 3){
            textColor = 'text-cyan-600';
          }else if(cell.getData().status.id === 4){
            textColor = 'text-cyan-700';
          }else if(cell.getData().status.id === 5){
            textColor = 'text-blue-900';
          }else if(cell.getData().status.id === 6){
            textColor = 'text-green-700';
          }

          
          //<i data-lucide="check-square" class="w-4 h-4 mr-2"></i> 

          return `<div class="flex items-center lg:justify-center 
          ${textColor}"
          >
            
              ${cell.getData().status.name}
          </div>`;
        }
      },
      {
        title: t("actions"),
        minWidth: 200,
				field: "actions",
				responsive: 1,
				headerHozAlign: "center",
        hozAlign: "center",
				vertAlign: "middle",
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <button class="flex items-center mr-3 text-green-800"
                  id="btn_edit"
                >
                  <i data-lucide="eye" class="w-4 h-4 mr-1"></i> ${t("show")}
                </button>
              </div>`);
          dom(a).on("click", function (event) {
          
            if(event.target.id === 'btn_edit'){
              editTrip(cell.getData().id);
            }

            // if(event.target.id === 'btn_delete'){
            //   deleteTrip(cell.getData().id, cell.getData().name); //TODO check name
            // }

          });

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



//Store
const createTrip = () => {
  isCreate.value = true;
  div_table.style.display = 'none';
}
const cancelCreate = () => {
  isCreate.value = false;
  div_table.style.display = 'block';
}

const saveTrip = async (form) => {
  
  
  //await storeTrip({ ...form });


    Toastify({
      node: dom("#failed-notification-content")
        .clone()
        .removeClass("hidden")[0],
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
    }).showToast();


  
  await getTrips();
  isCreate.value = false;
  div_table.style.display = 'block';
}



//Edit
const editTrip = (id) => {
  isUpdate.value = true;
  div_table.style.display = 'none';
  tripId.value = id;
}

const cancelEdit = async() => {
  isUpdate.value = false;
  div_table.style.display = 'block';
}

const updateTripForm = async (trip) => {
  await updateTrip(trip.id, trip);
  await getTrips();
  isUpdate.value = false;
  div_table.style.display = 'block';
}






// Delete
const deleteTrip = async (id, description) => {
  Swal.fire({
    icon: 'warning',
    title: t("message.are_you_sure"),
    text: t("delete") +': '+ description,
    showCancelButton: true,
    confirmButtonText: t("delete"),
    confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
  }).then(async(result) => {
    if (result.isConfirmed) {
      await destroyTrip(id);
      await getTrips();
      Swal.fire(t("message.record_deleted"), '', 'success');
    }
  });
}


// Init table
onMounted(async() => {
  tableData.value = await findData();
  initTabulator();
  reInitOnResizeWindow();
  div_table = document.querySelector('#div_table');
});

</script>