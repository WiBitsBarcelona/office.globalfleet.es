import { ref } from 'vue';
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
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageScannerErrors.value = res.errors;
			}else{
				actionStageScanners.value = res.data;
			}
		})
		.catch((e) => {
			actionStageScannerErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionStageScanner = async (id) => {
		actionStageScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageScannerErrors.value = res.errors;
			}else{
				actionStageScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionStageScannerErrors.value.push(t("errors.error_internal"));
		});
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
			if (!res.success) {
				actionStageScannerErrors.value = res.errors;
			}else{
				actionStageScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionStageScannerErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				actionStageScannerErrors.value = res.errors;
			}else{
				actionStageScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionStageScannerErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionStageScanner = async (id) => {
		actionStageScannerErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-scanners/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageScannerErrors.value = res.errors;
			}else{
				actionStageScanner.value = res.data;
			}
		})
		.catch((e) => {
			actionStageScannerErrors.value.push(t("errors.error_internal"));
		});
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
