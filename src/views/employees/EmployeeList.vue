<template>

	<!-- BEGIN: Page Layout Create -->
	<div class="intro-y box p-5 mt-5" v-if="isCreate">
		<Create
			@saveEmployeeForm="saveEmployeeForm"
			@cancelCreate="cancelCreate"
		/>
	</div>

	<!-- BEGIN: Page Layout Update -->
	<div class="intro-y box p-5 mt-5" v-if="isEdit">
		<Edit
			:employeeId="employeeId"
			@cancelEdit="cancelEdit"
			@updateEmployeeForm="updateEmployeeForm"
		/>
	</div>

	<!-- BEGIN: Page Layout Table -->
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
						<option value="user_id">{{ $t("user_id") }}</option>
						<option value="company_id">{{ $t("company_id") }}</option>
						<option value="name">{{ $t("name") }}</option>
						<option value="surname">{{ $t("surname") }}</option>
						<option value="fiscal_identification">{{ $t("fiscal_identification") }}</option>
					</select>
				</div>
				<div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
					<label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
						{{ $t("filter") }}
					</label>
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
					<label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">
						{{ $t("value") }}
					</label>
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
					@click="createEmployee"
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
		<div class="overflow-x-auto scrollbar-hidden">
			<div
				id="tabulator"
				ref="tableRef"
				class="mt-5 table-report table-report--tabulator"
			></div>
		</div>

	<!-- END: HTML Table Data -->
	</div>

</template>
<script setup>

	import { ref, reactive, onMounted, toRaw } from "vue";
	import { useI18n } from "vue-i18n";
	import { createIcons, icons } from "lucide";
	import Swal from "sweetalert2";
	import xlsx from "xlsx";
	import Tabulator from "tabulator-tables";

	import useEmployees from "@/composables/employees";
	import Create from "@/components/employees/EmployeeCreate.vue";
	import Edit from "@/components/employees/EmployeeEdit.vue";

	const { employees, getEmployees, storeEmployee, updateEmployee, destroyEmployee} = useEmployees();
	const { t } = useI18n();
	const isCreate = ref(false);
	const isEdit = ref(false);
	const employeeId = ref(0);
	// Tabulator
	const tableData = reactive([]); //data for table to display
	let div_table;
	const tableRef = ref();
	const tabulator = ref();

	const filter = reactive({
		field: "user_id",
		type: "like",
		value: "",
	});

	const findData = async() => {
		let dataArr = [];
		await getEmployees();
		employees.value.forEach((elem)=>{
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
				title: t("company"),
				minWidth: 200,
				responsive: 0,
				field: "company.name",
				vertAlign: "middle",
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
				title: t("surname"),
				minWidth: 200,
				responsive: 0,
				field: "surname",
				vertAlign: "middle",
				headerHozAlign:"left"
			},
			{
				title: t("fiscal_identification"),
				minWidth: 200,
				responsive: 0,
				field: "fiscal_identification",
				vertAlign: "middle",
				headerHozAlign:"left"
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
						<button class="flex items-center mr-3" id="btn_edit">
							<i data-lucide="check-square" class="w-4 h-4 mr-1"></i> ${t("edit")}
						</button>
						<button class="flex items-center text-danger" id="btn_delete">
							<i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> ${t("delete")}
						</button>
					</div>`);

					dom(a).on("click", function (event) {

						if(event.target.id === 'btn_edit'){
							editEmployee(cell.getData().id);
						}

						if(event.target.id === 'btn_delete'){
							deleteEmployee(cell.getData().id, cell.getData().name); // TODO check name
						}

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
		filter.field = "user_id";
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
		sheetName: "Employees",
		});
	};
	// Print
	const onPrint = () => {
		tabulator.value.print();
	};

	//Store
	const createEmployee = () => {
		isCreate.value = true;
		div_table.style.display = 'none';
	}

	const cancelCreate = () => {
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	const saveEmployeeForm = async (form) => {
		await storeEmployee({ ...form });
		//await getEmployees();
		tableData.value = await findData();
		tabulator.value.replaceData(tableData.value);
		isCreate.value = false;
		div_table.style.display = 'block';
	}

	//Edit
	const editEmployee = (id) => {
		isEdit.value = true;
		div_table.style.display = 'none';
		employeeId.value = id;
	}

	const cancelEdit = async() => {
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	const updateEmployeeForm = async (id, data) => {
		await updateEmployee(id, data);
		//await getEmployees();
		tableData.value = await findData();
		tabulator.value.updateData(tableData.value);
		isEdit.value = false;
		div_table.style.display = 'block';
	}

	// Delete
	const deleteEmployee = async (id, description) => {
		Swal.fire({
			icon: 'warning',
			title: t("message.are_you_sure"),
			text: t("delete") +': '+ description,
			showCancelButton: true,
			confirmButtonText: t("delete"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await destroyEmployee(id);
				await getEmployees();
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
