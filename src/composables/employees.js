import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useEmployees() {

	const employee = ref([]);
	const employees = ref([]);
	const employeeErrors = ref([]);
	const { t } = useI18n();


	const getEmployees = async () => {
		employeeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				employeeErrors.value = res.errors;
			}else{
				employees.value = res.data;
			}
		})
		.catch((e) => {
			employeeErrors.value.push(t("errors.error_internal"));
		});
	}


	const getEmployee = async (id) => {
		employeeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				employeeErrors.value = res.errors;
			}else{
				employee.value = res.data;
			}
		})
		.catch((e) => {
			employeeErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeEmployee = async (data) => {
		employeeErrors.value = [];

		let response = null;

		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/store`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			response =  res;
			if (!res.success) {
				console.log("Errorsssss", res.errors);
				employeeErrors.value = res.errors;
			}else{
				employee.value = res.data;
				return res.data;
			}
		})
		.catch((e) => {
			employeeErrors.value.push(t("errors.error_internal"));
		});

		return response;

	}


	const updateEmployee = async (id, data) => {
		employeeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/update/${id}`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {			
			if (!res.success) {
				employeeErrors.value = res.errors;
			}else{
				employee.value = res.data;
			}
		})
		.catch((e) => {
			employeeErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyEmployee = async (id) => {
		employeeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				employeeErrors.value = res.errors;
			}else{
				employee.value = res.data;
			}
		})
		.catch((e) => {
			employeeErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		employeeErrors,
		employee,
		employees,
		getEmployee,
		getEmployees,
		storeEmployee,
		updateEmployee,
		destroyEmployee,
	}

}
