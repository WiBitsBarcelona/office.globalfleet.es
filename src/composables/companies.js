import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useCompany() {

	const company = ref([]);
	const companies = ref([]);
	const errors = ref([]);
	const { t } = useI18n();
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getCompanies = async () => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}companies/list`, config);
			companies.value = response.data.data;
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


	const getCompany = async (id) => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}companies/show/${id}`, config);
			company.value = response.data.data;
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


	const storeCompany = async (data) => {
		errors.value = [];
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}companies/store`, data, config);
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


	const updateCompany = async (id, data) => {
		errors.value = [];
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}companies/update/${id}`, data, config);
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


	const destroyCompany = async (id) => {
		errors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}companies/delete/${id}`, config);
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
		company,
		companies,
		getCompany,
		getCompanies,
		storeCompany,
		updateCompany,
		destroyCompany,
	}

}
