import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useStageType() {

	const stageType = ref([]);
	const stageTypes = ref([]);
	const stageTypeErrors = ref([]);
	const { t } = useI18n();
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStageTypes = async () => {
		stageTypeErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-types/list`, config);
			stageTypes.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				stageTypeErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         stageTypeErrors.value = key
			     }
			}
		}
	}


	const getStageType = async (id) => {
		stageTypeErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-types/show/${id}`, config);
			stageType.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				stageTypeErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         stageTypeErrors.value = key
			     }
			}
		}
	}


	const storeStageType = async (data) => {
		stageTypeErrors.value = [];
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-types/store`, data, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				stageTypeErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         stageTypeErrors.value = key
			     }
			}
		}
	}


	const updateStageType = async (id, data) => {
		stageTypeErrors.value = [];
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-types/update/${id}`, data, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				stageTypeErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         stageTypeErrors.value = key
			     }
			}
		}
	}


	const destroyStageType = async (id) => {
		stageTypeErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-types/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				stageTypeErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         stageTypeErrors.value = key
			     }
			}
		}
	}


	return {
		stageTypeErrors,
		stageType,
		stageTypes,
		getStageType,
		getStageTypes,
		storeStageType,
		updateStageType,
		destroyStageType,
	}

}
