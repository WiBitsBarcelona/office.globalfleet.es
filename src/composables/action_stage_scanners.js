import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useActionStageScanner() {

	const actionStageScanner = ref([]);
	const actionStageScanners = ref([]);
	const actionStageScannerErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionStageScanners = async () => {
		actionStageScannerErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/list`, config);
			actionStageScanners.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageScannerErrors.value = key
				}
			}
		}
	}


	const getActionStageScanner = async (id) => {
		actionStageScannerErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/show/${id}`, config);
			actionStageScanner.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageScannerErrors.value = key
				}
			}
		}
	}


	const storeActionStageScanner = async (data) => {
		actionStageScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionStageScanner.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageScannerErrors.value = key
				}
			}
		});
	}


	const updateActionStageScanner = async (id, data) => {
		actionStageScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionStageScanner.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageScannerErrors.value = key
				}
			}
		});
	}


	const destroyActionStageScanner = async (id) => {
		actionStageScannerErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageScannerErrors.value = key
				}
			}
		}
	}


	return {
		actionStageScannerErrors,
		actionStageScanner,
		actionStageScanners,
		getActionStageScanner,
		getActionStageScanners,
		storeActionStageScanner,
		updateActionStageScanner,
		destroyActionStageScanner,
	}

}
