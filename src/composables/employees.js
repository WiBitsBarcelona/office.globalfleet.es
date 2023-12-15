import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useEmployee() {

	const employee = ref([]);
	const employees = ref([]);
	const errors = ref([]);
	const { t } = useI18n();
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getEmployees = async () => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/list`, config);
			employees.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
		}
	}


	const getEmployee = async (id) => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/show/${id}`, config);
			employee.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
		}
	}


	const storeEmployee = async (data) => {
		errors.value = [];
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/store`, data, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
		}
	}


	const updateEmployee = async (id, data) => {
		errors.value = [];
		try {
			
			await axios.put(
				`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/update/${id}`, 
				data, 
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				}
			);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
		}
	}


	const destroyEmployee = async (id) => {
		errors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
		}
	}


	return {
		errors,
		employee,
		employees,
		getEmployee,
		getEmployees,
		storeEmployee,
		updateEmployee,
		destroyEmployee,
	}

}
