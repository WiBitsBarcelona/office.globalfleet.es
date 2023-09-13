import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useActionType() {

	const actionType = ref([]);
	const actionTypes = ref([]);
	const errors = ref([]);
	const { t } = useI18n();
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTypes = async () => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/list`, config);
			actionTypes.value = response.data.data;
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


	const getActionType = async (id) => {
		errors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/show/${id}`, config);
			actionType.value = response.data.data;
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


	const storeActionType = async (data) => {
		errors.value = [];
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/store`, data, config);
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


	const updateActionType = async (id, data) => {
		errors.value = [];
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/update/${id}`, data, config);
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


	const destroyActionType = async (id) => {
		errors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/delete/${id}`, config);
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
		actionType,
		actionTypes,
		getActionType,
		getActionTypes,
		storeActionType,
		updateActionType,
		destroyActionType,
	}

}
