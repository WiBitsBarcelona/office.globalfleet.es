<template>
    <div class="intro-y box p-5 mt-0">
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
  import { ref, reactive, onMounted, computed } from 'vue';
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
  const addDriverFilesModal = ref(false);
  const showNoFileError = ref(false);
  const tableData = reactive([]);
  
  const { drivers, getDrivers } = useDriver();
  const { driverDocuments, getDriverDocuments, storeDriverDocument, errors } = useDriverDocument();
  const tableRef = ref();
  const tabulator = ref();

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
  
  const driver_selected = ref(0);

  const driver_name_selected = ref('');
  let driver_selected_file = ref('');
  const driverFile = ref(null);
  let dataArr = [];
  
  let driverFiles = [];
  const driverState = reactive({ driverFiles });
  const driverUploading = ref(0);
  let driverFileJson = [];
  let checkedFiles = ref([]);
  let allFilesChecked = false;
  
  const findData = async () => {
    await getDrivers();
    const dataArrTmp = JSON.parse(JSON.stringify(drivers.value));
    dataArrTmp.forEach(element => {
      const full_name = element.name + ' ' + element.surname;
      dataArr.push({
        id: element.id,
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
      data: tableData.value,
      printAsHtml: true,
      printStyled: true,
      pagination: "local",
      paginationSize: 15,
      paginationSizeSelector: [15, 30, 45, 60],
      layout: "fitColumns",
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
              <a id="select_driver" href="/documents/driver/show/${cell.getData().id}" class='w-full flex flex-inline hover:ml-3 hover:font-medium'>
                <i data-lucide='folder' class='w-5 h-5 mr-2 text-primary'></i>` + cell.getValue() + `</a>`);
            
            // dom(a).on("click", function (event) {
            //   if (event.target.id == 'select_driver') {
            //     event.preventDefault();
            //     driver_selected.value = cell.getData().id;
            //     driver_name_selected.value = cell.getValue();
            //     findDriverDocuments(cell.getData().id);
            //   }
            // });
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
  
  const onDriverDocumentsFilter = () => {
    tabulator.value.setFilter(driver_docs_filter.field, driver_docs_filter.type, driver_docs_filter.value);
  };
  
  const onDriverDocumentsResetFilter = () => {
    driver_docs_filter.field = "file_name";
    driver_docs_filter.type = "like";
    driver_docs_filter.value = "";
    onDriverDocumentsFilter();
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
          pages_count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
          console.log('Number of Pages:',pages_count );
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
      initDriverDocumentsTabulator();
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