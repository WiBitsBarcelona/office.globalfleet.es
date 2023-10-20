<template>
	<Preloader v-if="loading" />


	<!-- BEGIN: Page Layout Table -->
	<div class="grid grid-cols-12 gap-6 mt-8">
    	<div class="col-span-12 intro-y">
        	<h2 class="text-lg font-medium truncate mr-5">{{ $t('vehicles_of') }}<span class="text-xl font-bold">{{ useAuthentication.getUser.employee.company.name }}</span></h2>
        </div>
	</div>
	<div class="intro-y box p-5 mt-5" id="div_table">
		<div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
			<form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
				<div class="relative sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
					<input id="tabulator-html-filter-value" v-model="filter.value" type="text" class="w-full xl:w-[600px] form-control mt-2 sm:mt-0" :placeholder="$t('search')" @keyup="onFilter" />
					<XCircleIcon class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0 text-slate-400 hover:cursor-pointer" @click="onResetFilter" />
				</div>
			</form>
			<div class="flex mt-5 sm:mt-0">
				<button
					class="btn btn-primary w-1/2 sm:w-auto mr-2"
					@click="createVehicle"
				>
					<PlusCircleIcon class="w-6 h-6 mr-2" /> {{ $t("btn_create_vehicle") }}
				</button>
				<Dropdown class="w-1/2 sm:w-auto">
					<DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
						<FileTextIcon class="w-6 h-6 mr-2" /> {{ $t("export") }}
						<ChevronDownIcon class="w-6 h-6 ml-auto sm:ml-2" />
					</DropdownToggle>
					<DropdownMenu class="w-40">
						<DropdownContent>
							<DropdownItem @click="onExportXlsx">
								<FileTextIcon class="w-6 h-6 mr-2" /> {{ $t("message.export_excel") }}
							</DropdownItem>
							<DropdownItem @click="onExportCsv">
								<FileTextIcon class="w-6 h-6 mr-2" /> {{ $t("message.export_csv") }}
							</DropdownItem>
						</DropdownContent>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
		<div class="overflow-x-auto scrollbar-hidden">
			<div
				id="tabulator"
				ref="tableRef"
				class="mt-5 table-report table-report--tabulator"
			></div>
		</div>

	<!-- END: HTML Table Data -->
	</div>

	<!-- BEGIN: Page Layout Create -->
	<div class="intro-y box p-5 mt-5" v-if="isCreate">
		<Create
			@saveVehicleForm="saveVehicleForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div class="intro-y box p-5 mt-5" v-if="isEdit">
		<Edit
			:vehicleId="vehicleId"
			@cancelEdit="cancelEdit"
			@updateVehicleForm="updateVehicleForm"
		/>
	</div>


</template>
<script setup>

	import { ref, reactive, onMounted, toRaw } from "vue";
	import { useI18n } from "vue-i18n";
	import { createIcons, icons } from "lucide";
	import Swal from "sweetalert2";
	import xlsx from "xlsx";
	import Tabulator from "tabulator-tables";

	import useVehicles from "@/composables/vehicles";
	import Create from "@/components/vehicles/VehicleCreate.vue";
	import Edit from "@/components/vehicles/VehicleEdit.vue";
	import { useAuthenticationStore } from '@/stores/auth/authentications';
	import Preloader from '@/components/preloader/Preloader.vue';

	const { vehicles, getVehicles, storeVehicle, updateVehicle, destroyVehicle} = useVehicles();
	const { t } = useI18n();
	const isCreate = ref(false);
	const isEdit = ref(false);
	const vehicleId = ref(0);
	// Tabulator
	const tableData = reactive([]); //data for table to display
	let div_table;
	const tableRef = ref();
	const tabulator = ref();

	const filter = reactive({
		field: "plate",
		type: "like",
		value: "",
	});
	const useAuthentication = useAuthenticationStore();
	const loading = ref(false);

	const findData = async() => {
		let dataArr = [];
		await getVehicles();

		vehicles.value.forEach((elem)=>{
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
		reactiveData:true,
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
				title: t("plate"),
				minWidth: 200,
				responsive: 0,
				field: "plate",
				vertAlign: "middle",
				headerHozAlign:"left",
			},
			{
				title: t("employee"),
				minWidth: 200,
				responsive: 0,
				field: "employee.name",
				vertAlign: "middle",
				headerHozAlign:"left",
				formatter: (cell, formatterParams) => {
					return cell.getData().employee.name + ' ' + cell.getData().employee.surname;
				},
			},
			{
					title: "",
					minWidth: 80,
					width: 10,
					field: "actions",
					responsive: 0,
					headerHozAlign: "center",
					hozAlign: "center",
					vertAlign: "middle",
					headerSort: false,
					tooltip: t("tooltips.edit"),
					download: false,
					formatter: (cell, formatterParams) => {
						return `<i data-lucide="check-square" class="w-6 h-6 mr-1 text-primary"></i>`;
					},
					cellClick: (e, cell) => {
						editVehicle(cell.getData().id);
						e.preventDefault();
					},
				},
				{
					title: "",
					minWidth: 80,
					width: 10,
					field: "actions",
					responsive: 0,
					headerHozAlign: "center",
					hozAlign: "center",
					vertAlign: "middle",
					headerSort: false,
					tooltip: t("tooltips.delete"),
					download: false,
					formatter: (cell, formatterParams) => {
						return `<i data-lucide="trash-2" class="w-6 h-6 mr-1 text-danger"></i>`;
					},
					cellClick: (e, cell) => {
						//deleteDriver(cell.getData().id, cell.getData().name);
						deleteVehicle(cell.getData().id, cell.getData().plate);
						e.preventDefault();
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
		filter.field = "plate";
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
		sheetName: "Vehicles",
		});
	};
	// Print
	const onPrint = () => {
		tabulator.value.print();
	};

	//Store
	const createVehicle = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveVehicleForm = async (form) => {
		loading.value = true;
		await storeVehicle({ ...form });
		//await getVehicles();
		tableData.value = await findData();
		tabulator.value.replaceData(tableData.value);
		isCreate.value = false;
		loading.value = false;
		div_table.style.display = 'block';
	}

	//Edit
	const editVehicle = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		vehicleId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateVehicleForm = async (id, data) => {
		loading.value = true;
		await updateVehicle(id, data);
		//await getVehicles();
		tableData.value = await findData();
		tabulator.value.updateData(tableData.value);
		isEdit.value = false;
		loading.value = false;
		div_table.style.display = 'block';
	}

	// Delete
	const deleteVehicle = async (id, plate) => {
		console.log(plate);
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			html: '<span class="font-medium">' + t("delete_plate_title") + '</span><br /><div class="mt-2 text-sm italic"> ' + plate + '</div>',
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyVehicle(id);
				tableData.value = await findData();
				tabulator.value.setData(tableData.value);
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
