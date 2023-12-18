<template>
	<Preloader v-if="loading" />


	<!-- BEGIN: Page Layout Table -->
	<div class="grid grid-cols-12 gap-6 mt-8">
		<div class="col-span-12 intro-y">
			<h2 class="text-lg font-medium truncate mr-5">{{ $t('driver_logs_of') }}<span class="text-xl font-bold">{{
				useAuthentication.getUser.employee.company.name }}</span></h2>
		</div>
	</div>
	<div class="intro-y box p-5 mt-5" id="div_table">
		<div class="flex justify-start">
			<form id="tabulator-html-filter-form" class="xl:flex">
				<div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
					<input id="tabulator-html-filter-value" v-model="filter.value" type="text"
						class="w-full xl:w-[600px] form-control mt-2 sm:mt-0" :placeholder="$t('search')"
						@keyup="onFilter" />
					<XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer"
						@click="onResetFilter" />
				</div>
			</form>

			<div class="flex flex-row mr-auto">
				<Litepicker v-model="daterange" :options="{
					autoApply: false,
					singleMode: false,
					numberOfColumns: 2,
					numberOfMonths: 2,
					lang: currentLocale,
					showWeekNumbers: false,
					dropdowns: {
						minYear: 2000,
						maxYear: null,
						months: true,
						years: true,
					},
					buttonText: {
						apply: t('btn_accept'),
						cancel: t('btn_cancel')
					},
					tooltipText: {
						one: t('day'),
						other: t('days')
					},
				}" class="form-control" />
				<button @click="updateData" class="btn btn-outline-primary w-32 ml-3">
          <CheckIcon class="w-4 h-4 mr-2" /> {{ $t('btn_accept') }}
        </button>
			</div>
			<div class="flex sm:mt-0">
				<div class="flex items-center sm:flex-row">
					<div class="ml-2 mr-5 font-light text-gray-600">{{ $t("session_log.filter_by") }}</div>
					<div class="form-check mr-2">
						<input v-model="radio_order_by" id="radio-all" class="form-check-input" type="radio" checked
							value="all" @change="onClickRadio" />
						<label class="form-check-label font-normal text-gray-600" for="radio-trip-date">{{
							$t('driver_log.filter_all')
						}}</label>
					</div>
					<div class="form-check mr-2">
						<input v-model="radio_order_by" id="radio-trip" class="form-check-input" type="radio" value="trip"
							@change="onClickRadio" />
						<label class="form-check-label font-normal text-gray-600" for="radio-trip-id">{{
							$t('driver_log.filter_trip') }}</label>
					</div>
					<div class="form-check mr-2">
						<input v-model="radio_order_by" id="radio-stage" class="form-check-input" type="radio"
							value="stage" @change="onClickRadio" />
						<label class="form-check-label font-normal text-gray-600" for="radio-trip-id">{{
							$t('driver_log.filter_stage') }}</label>
					</div>
					<div class="form-check mr-2 mt-2 sm:mt-0">
						<input v-model="radio_order_by" id="radio-task" class="form-check-input" type="radio"
							value="task" @change="onClickRadio" />
						<label class="form-check-label font-normal text-gray-600" for="radio-vehicle">{{
							$t('driver_log.filter_task') }}</label>
					</div>
					<div class="form-check mr-2 mt-2 sm:mt-0">
						<input v-model="radio_order_by" id="radio-action" class="form-check-input" type="radio"
							value="action" @change="onClickRadio" />
						<label class="form-check-label font-normal text-gray-600" for="radio-vehicle">{{
							$t('driver_log.filter_action') }}</label>
					</div>
				</div>
			</div>
		</div>
		<div class="overflow-x-auto scrollbar-hidden">
			<div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
		</div>

		<!-- END: HTML Table Data -->
	</div>

	  <!-- BEGIN: Positioning Modal Content -->
	<Modal backdrop="static" :show="positioningModal" @hidden="positioningModal = false">
		<ModalHeader>
			<h2 class="text-lg font-medium text-left ml-5">{{ $t("session_log.modal.title") }}</h2>
		</ModalHeader>
    	<ModalBody class="px-2 py-5">
      		<XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hidePositioningModal">
      		</XIcon>

			  <div class="grid gap-y-8">
                <div class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
                  <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Latitud</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ lat }}</p>
                  </div>
                  <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Longitud</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ lng }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ gps_positioning }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Exactitud</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ accuracy }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Velocidad</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ speed }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Dirección</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ direction }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Fecha Captura</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ date }}</p>
                  </div>
				  <div class="col-span-12 mt-3">
					<p>Información del dispositivo:</p>
				  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Fabricante</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ manufacturer }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Modelo</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ model }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Plataforma</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ platform }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Nivel Batería</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ battery }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Cargando</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ is_charging }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Versión App.</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ driver_app }}</p>
                  </div>

                </div>
              </div>

    	</ModalBody>
  	</Modal>
  	<!-- END: Modal Content -->

		  <!-- BEGIN: Model Modal Content -->
		  <Modal backdrop="static" :show="modelModal" @hidden="modelModal = false">
		<ModalHeader>
			<h2 class="text-lg font-medium text-left ml-5">{{ $t("driver_log.modal.title") + event_model }}</h2>
		</ModalHeader>
    	<ModalBody class="px-2 py-5">
      		<XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer" @click="hideModelModal">
      		</XIcon>

			  <div class="grid gap-y-8">
                <div class="grid grid-cols-2 gap-x-1 gap-y-1 text-left sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
					<div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Referencia</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ reference }}</p>
                  </div>
				  <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Estado</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ status }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Nombre</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ name }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Descripción Evento</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ event_description }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Conductor</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ driver }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Etapas</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ stages }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Matrícula</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ vehicle }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Remolque</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ tow }}</p>
                  </div>
<!--                   <div class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Longitud</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ lng }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Posición GPS</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ gps_positioning }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Exactitud</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ accuracy }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Velocidad</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ speed }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Dirección</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ direction }}</p>
                  </div>
				  <div class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Fecha Captura</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ date }}</p>
                  </div>
				  <div class="col-span-12 mt-3">
					<p>Información del dispositivo:</p>
				  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Fabricante</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ manufacturer }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Modelo</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ model }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Plataforma</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ platform }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Nivel Batería</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ battery }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Cargando</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ is_charging }}</p>
                  </div>
				  <div class="col-span-4 rounded-md bg-gray-100 p-1 pb-1 dark:bg-gray-800 dark:text-gray-400">
                    <h5 class="text-xs font-light text-gray-400">Versión App.</h5>
                    <p class="text-md font-normal leading-4 text-gray-500">{{ driver_app }}</p> 
                  </div> -->

                </div>
              </div>

    	</ModalBody>
  	</Modal>
  	<!-- END: Modal Content -->

</template>
<script setup>

import { ref, reactive, onMounted, toRaw } from "vue";
import { useI18n } from "vue-i18n";
import { createIcons, icons } from "lucide";
import Tabulator from "tabulator-tables";
import { helper as $h } from "@/utils/helper";
import useDriverEventLog from "@/composables/driver_event_log";
import { useAuthenticationStore } from '@/stores/auth/authentications';
import useDriverPosition from "@/composables/driver_positions";
import useTrip from "@/composables/trips";
import useStage from "@/composables/stages";
import Preloader from '@/components/preloader/Preloader.vue';
import enumModels from '@/enums/enum_models.js';
const { driverEventLogs, getDriverEventLogs} = useDriverEventLog();
const { driverPosition, getDriverPosition } = useDriverPosition();
const { trip, getTrip} = useTrip();
const { stage, getStage} = useStage();
const { t } = useI18n();
const positioningModal = ref(false);
const modelModal = ref(false);

// Tabulator
const tableData = reactive([]); //data for table to display

const tableRef = ref();
const tabulator = ref();

const filter = reactive({
	value: "",
});
const useAuthentication = useAuthenticationStore();
const loading = ref(false);

let dataArr = [];
const radio_order_by = ref('all');


const today = ref("");
const startDate = ref("");
const endDate = ref("");

const daterange = ref("");
const time_from = "00:00";
const time_at ="23:59";
const currentLocale = ref("es-ES");

//VARIABLES FOR POSITIONING MODAL
let lat = "";
let lng = "";
let gps_positioning = "";
let accuracy = "";
let speed = "";
let direction = "";
let date = "";
let manufacturer = "";
let model = "";
let platform = "Android";
let battery = "";
let is_charging = "";
let driver_app = "";

//VARIABLE FOR MODEL MODAL
let event_description = "";
let reference = "";
let name = "";
let status = "";
let event_model = "";
let stages = 0;
let vehicle = "";
let tow = "";
let driver = "";

switch (localStorage.getItem('locale')) {
	case 'es':
		currentLocale.value = "es-ES";
		break;
	case 'en':
		currentLocale.value = "en-US";
		break;
	default:
		currentLocale.value = "es-ES";
		break;
}

const findData = async (dateRangeNew) => {
	let rangeArray = dateRangeNew.split('-');

    let [dayfrom, monthfrom, yearfrom] = rangeArray[0].trim().split('/');
    let timeFromArray = time_from.split(':');
    let hourfrom = timeFromArray[0];
    let minutesfrom = timeFromArray[1];
    let secondsfrom = '00';
    let [dayto, monthto, yearto] = rangeArray[1].trim().split('/');
    let timeAtArray = time_at.split(':');
    let hourat = timeAtArray[0];
    let minutesat = timeAtArray[1];
    let secondsat = '59';

    let dateFromTmp = new Date(+yearfrom, +monthfrom - 1, +dayfrom, +hourfrom, +minutesfrom, +secondsfrom);
    let dateToTmp = new Date(+yearto, +monthto - 1, +dayto, +hourat, +minutesat, +secondsat);
    let dateFrom = $h.formatDate(dateFromTmp, "YYYY-MM-DD+HH:mm:ss");
    let dateTo = $h.formatDate(dateToTmp, "YYYY-MM-DD+HH:mm:ss");

    let currentData =  `?from_at=${dateFrom}&to_at=${dateTo}` ;

	await getDriverEventLogs(currentData);
	return driverEventLogs.value;
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
		reactiveData: true,
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
				title: t("session_log.date"),
				responsive: 0,
				width: 150,
				field: "created_at",
				vertAlign: "middle",
				headerHozAlign: "left",
				formatter: function (cell) {
					return $h.formatDate(cell.getValue(), 'DD/MM/YYYY HH:mm')
				},
			},
			{
				title: t("session_log.user"),
				responsive: 0,
				width: 200,
				field: "driver.name",
				vertAlign: "middle",
				headerHozAlign: "left",
				formatter: function (cell) {
              		let data = '';
                	data = cell.getData().driver.name + ' ' +  cell.getData().driver.surname;
              		return data;
            	},
			},
			{
				title: t("session_log.origin"),
				responsive: 0,
				visible: false,
				field: "loggable_type",
				vertAlign: "middle",
				headerHozAlign: "left",
			},
			{
				title: t("driver_log.model_id"),
				responsive: 0,
				width: 100,
				field: "loggable_id",
				vertAlign: "middle",
				headerHozAlign: "left",
				cellClick: function (e, cell) {
					if (cell.getValue() != null) {
						showModelModal(cell.getValue(), cell.getData().loggable_type, cell.getData().description);
					}
            	}
			},
			{
				title: t("session_log.event"),
				responsive: 0,
				field: "description",
				vertAlign: "middle",
				headerHozAlign: "left",
			},
			{
				title: t("driver_log.position_id"),
				responsive: 0,
				width: 100,
				field: "driver_position_id",
				vertAlign: "middle",
				headerHozAlign: "left",
				formatter: (cell, formatterParams) => {
					if (cell.getValue() == null) {
						return '--';
					} else {
						return cell.getValue();
					}
				},
				cellClick: function (e, cell) {
					if (cell.getValue() != null) {
						positionModal(cell.getValue());
					}
            	}
			},
/* 			{
				title: t("session_log.position"),
				responsive: 0,
				field: "gps_positioning",
				vertAlign: "middle",
				headerHozAlign: "left",
			}, */
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
	let filter_value = "";
	switch (radio_order_by.value) {
		case "all":
			filter_value = "";
			break;
		case "trip":
			filter_value = enumModels.TRIP_MODEL;
			break;
		case "stage":
			filter_value = enumModels.STAGE_MODEL;
			break;
		case "task":
			filter_value = enumModels.TASK_MODEL;
			break;
		case "action":
			filter_value = enumModels.ACTION_MODEL;
			break;	
	};
	tabulator.value.setFilter([
		{field: "loggable_type", type: "like", value: filter_value},
		[
			{ field: "driver.name", type: "like", value: filter.value },
			{ field: "driver.surname", type: "like", value: filter.value },
		]

	]);
};

const onRadio = (value) => {
	tabulator.value.setFilter("loggable_type", "like", value);
}

const onClickRadio = () => {
	switch (radio_order_by.value) {
		case "all":
			onRadio("");
			break;
		case "trip":
			onRadio(enumModels.TRIP_MODEL);
			break;
		case "stage":
			onRadio(enumModels.STAGE_MODEL);
			break;
		case "task":
			onRadio(enumModels.TASK_MODEL);
			break;
		case "action":
			onRadio(enumModels.ACTION_MODEL);
			break;
	};
}


// On reset filter
const onResetFilter = () => {
	filter.value = "";
	onFilter();
};

const positionModal = async (id) => {
	await getDriverPosition(id);
	lat = driverPosition.value.latitude;
	lng = driverPosition.value.longitude;
	gps_positioning = driverPosition.value.gps_positioning;
	accuracy = driverPosition.value.accuracy + "m.";
	speed = $h.toKmsHour(driverPosition.value.speed) + "Km/h";
	direction = $h.getDirection(driverPosition.value.heading);;
	date = $h.formatDate(driverPosition.value.captured_at, 'DD/MM/YYYY HH:mm');
	manufacturer = driverPosition.value.manufacturer;
	model = driverPosition.value.model;
	platform = "Android";
	battery = driverPosition.value.battery_level +"%";
	if(driverPosition.value.is_charging == 0){
		is_charging = "NO";
	}else{
		is_charging = "SI";
	}
	driver_app = driverPosition.value.fleet_version;
	positioningModal.value = true;
};

const hidePositioningModal = () => {
	lat = "";
	lng = "";
	gps_positioning = "";
	accuracy = "";
	speed = "";
	direction = "";
	date = "";
	manufacturer = "";
	model = "";
	platform = "Android";
	battery = "";
	is_charging = "";
	driver_app = "";
	positioningModal.value = false;
};

const showModelModal = async (id, model, event) => {
	console.log(id, model, event);
	switch(model){
		case enumModels.TRIP_MODEL:
			//Search Trip Data
			await getTrip(id);
			event_model = " VIAJE";
			reference = trip.value.reference_number;
			status = trip.value.status.name;
			name = trip.value.name;
			driver = trip.value.driver.name + ' ' + trip.value.driver.surname;
			trip.value.stages.forEach(element => {
      			if (element.activity !== null) {
        			stages++;
      			}
    		});
			vehicle = trip.value.vehicle.plate;
			tow = trip.value.tows[0].tow.plate;
			break;
		case enumModels.STAGE_MODEL:
			event_model = " ETAPA";
			await getStage(id);
			console.log(stage.value);
			reference = stage.value.reference_number;
			break;
		case enumModels.TASK_MODEL:
			console.log("tarea");
			break;
		case enumModels.ACTION_MODEL:
			console.log("accion");
			break;
	};
	event_description = event;
	modelModal.value = true;
}

const hideModelModal = async (id) => {
	event_description = "";
	modelModal.value = false;
}

const updateData = async () => {
	tableData.value = await findData(daterange.value);
	tabulator.value.setData(tableData.value);
}

// Init table
onMounted(async () => {
	tableData.value = await findData(daterange.value);
	initTabulator();
	reInitOnResizeWindow();
});

</script>
