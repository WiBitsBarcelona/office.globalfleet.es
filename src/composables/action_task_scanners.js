import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useActionTaskScanner() {

	const actionTaskScanner = ref([]);
	const actionTaskScanners = ref([]);
	const actionTaskScannerErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTaskScanners = async () => {
		actionTaskScannerErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/list`, config);
			actionTaskScanners.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskScannerErrors.value = key
				}
			}
		}
	}


	const getActionTaskScanner = async (id) => {
		actionTaskScannerErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/show/${id}`, config);
			actionTaskScanner.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskScannerErrors.value = key
				}
			}
		}
	}


	const storeActionTaskScanner = async (data) => {
		actionTaskScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionTaskScanner.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskScannerErrors.value = key
				}
			}
		});
	}


	const updateActionTaskScanner = async (id, data) => {
		actionTaskScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionTaskScanner.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskScannerErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskScannerErrors.value = key
				}
			}
		});
	}


	const destroyActionTaskScanner = async (id) => {
		actionTaskScannerErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskScannerErrors.value = key
				}
			}
		}
	}


	return {
		actionTaskScannerErrors,
		actionTaskScanner,
		actionTaskScanners,
		getActionTaskScanner,
		getActionTaskScanners,
		storeActionTaskScanner,
		updateActionTaskScanner,
		destroyActionTaskScanner,
	}

}
