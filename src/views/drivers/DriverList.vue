<template>

	<Preloader v-if="loading" />

	<!-- BEGIN: Page Layout Table -->
	<div class="grid grid-cols-12 gap-6 mt-8">
    	<div class="col-span-12 intro-y">
        	<h2 class="text-lg font-medium truncate mr-5">{{ $t('drivers_of') }}<span class="text-xl font-bold">{{ useAuthentication.getUser.employee.company.name }}</span></h2>
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
					@click="createDriver"
				>
					<PlusCircleIcon class="w-6 h-6 mr-2" /> {{ $t("btn_create") }}
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
			@saveDriverForm="saveDriverForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div class="intro-y box p-5 mt-5" v-if="isEdit">
		<Edit
			:driverId="driverId"
			@cancelEdit="cancelEdit"
			@updateDriverForm="updateDriverForm"
		/>
	</div>




</template>
<script setup>

	import { ref, reactive, onMounted, toRaw } from 'vue';
	import { useI18n } from 'vue-i18n';
	import { createIcons, icons } from 'lucide';
	import xlsx from 'xlsx';
	import Tabulator from 'tabulator-tables';
	import Swal from 'sweetalert2';
	import { Toast } from '@/utils/toast';
	import dom from '@left4code/tw-starter/dist/js/dom';
	import Preloader from '@/components/preloader/Preloader.vue';
	import { useAuthenticationStore } from '@/stores/auth/authentications';

	import useDrivers from "@/composables/drivers";
	import Create from "@/components/drivers/DriverCreate.vue";
	import Edit from "@/components/drivers/DriverEdit.vue";


	const loading = ref(false);

	const { drivers, getDrivers, storeDriver, updateDriver, destroyDriver} = useDrivers();
	const useAuthentication = useAuthenticationStore();

	const { t } = useI18n();
	const isCreate = ref(false);
	const isEdit = ref(false);
	const driverId = ref(0);
	// Tabulator
	const tableData = reactive([]); //data for table to display
	let div_table;
	const tableRef = ref();
	const tabulator = ref();

	const filter = reactive({
		field: "name",
		type: "like",
		value: "",
	});

	const findData = async() => {
		await getDrivers();
		return toRaw(drivers.value);
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
				{
					title: t("name"),
					minWidth: 200,
					responsive: 0,
					field: "name",
					vertAlign: "middle",
					headerHozAlign:"left",
				},
				{
					title: t("surname"),
					minWidth: 200,
					responsive: 0,
					field: "surname",
					vertAlign: "middle",
					headerHozAlign:"left",
				},
				{
					title: t("email"),
					minWidth: 200,
					responsive: 0,
					field: "user.email",
					vertAlign: "middle",
					headerHozAlign:"left",
				},
				{
					title: t("driver_manager"),
					minWidth: 100,
					responsive: 0,
					field: "employee[0].name",
					vertAlign: "middle",
					headerHozAlign:"left",
					formatter: (cell, formatterParams) => {
						return cell.getData().employee[0].name + ' ' + cell.getData().employee[0].surname;
					},
				},
				{
                    title: t("language"),
                    minWidth: 200,
                    responsive: 0,
                    field: "",
                    vertAlign: "middle",
                    headerHozAlign:"left",
                    formatter(cell) {
						let currentLang = 'languages.' + cell.getData().language.iso_code;
                        return t(currentLang);
                    }
                },
				{
					title: t("token"),
					minWidth: 100,
					responsive: 0,
					field: "user.app_token.token",
					vertAlign: "middle",
					headerHozAlign:"left",
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
						editDriver(cell.getData().id);
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
						deleteDriver(cell.getData().id, cell.getData().name, cell.getData().surname);
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
			renderStarted() {
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
		//tabulator.value.setFilter(filter.field, filter.type, filter.value);
		tabulator.value.setFilter([
			[
				{field: 'name', type: 'like', value: filter.value},
				{field: 'surname', type: 'like', value: filter.value},
				{field: 'fiscal_identification', type: 'like', value: filter.value},
				{field: 'password', type: 'like', value: filter.value},
				{field: 'email', type: 'like', value: filter.value},
			]
		]);
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
		sheetName: "Drivers",
		});
	};
	// Print
	const onPrint = () => {
		tabulator.value.print();
	};

	//Store
	const createDriver = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveDriverForm = async (form) => {
		isCreate.value = false;
		div_table.style.display = 'block';
		loading.value = true;

		await storeDriver({ ...form });
		tableData.value = await findData();
		tabulator.value.setData(tableData.value);

		loading.value = false;
		await Toast(t("message.record_saved"), 'success');
	}

	//Edit
	const editDriver = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		driverId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateDriverForm = async (id, data) => {
		isEdit.value = false;
		div_table.style.display = 'block';
		loading.value = true;

		await updateDriver(id, data);
		tableData.value = await findData();
		tabulator.value.setData(tableData.value);

		loading.value = false;
		await Toast(t("message.record_updated"), 'success');
	}

	// Delete
	const deleteDriver = async (id, name, surname) => {
		Swal.fire({
			icon: 'warning',
			title: t("documents.swal.are_you_sure"),
			html: '<span class="font-medium">' + t("delete_driver_title") + '</span><br /><div class="mt-2 text-sm italic"> ' + name + ' ' + surname + '</div>',
			showCancelButton: true,
			confirmButtonText: t("documents.swal.yes"),
			cancelButtonText: t("documents.swal.no"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyDriver(id);
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
