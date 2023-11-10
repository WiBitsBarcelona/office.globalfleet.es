import { ref } from 'vue';
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
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskScannerErrors.value = res.errors;
			}else{
				actionTaskScanners.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskScannerErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionTaskScanner = async (id) => {
		actionTaskScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskScannerErrors.value = res.errors;
			}else{
				actionTaskScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskScannerErrors.value.push(t("errors.error_internal"));
		});
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
			if (!res.success) {
				actionTaskScannerErrors.value = res.errors;
			}else{
				actionTaskScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskScannerErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				actionTaskScannerErrors.value = res.errors;
			}else{
				actionTaskScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskScannerErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionTaskScanner = async (id) => {
		actionTaskScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-scanners/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskScannerErrors.value = res.errors;
			}else{
				actionTaskScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskScannerErrors.value.push(t("errors.error_internal"));
		});
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
