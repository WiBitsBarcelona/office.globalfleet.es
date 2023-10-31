import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionStageCamera() {

	const actionStageCamera = ref([]);
	const actionStageCameras = ref([]);
	const actionStageCameraErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionStageCameras = async () => {
		actionStageCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageCameraErrors.value = res.errors;
			}else{
				actionStageCameras.value = res.data;
			}
		})
		.catch((e) => {
			actionStageCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionStageCamera = async (id) => {
		actionStageCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageCameraErrors.value = res.errors;
			}else{
				actionStageCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionStageCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionStageCamera = async (data) => {
		actionStageCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageCameraErrors.value = res.errors;
			}else{
				actionStageCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionStageCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionStageCamera = async (id, data) => {
		actionStageCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageCameraErrors.value = res.errors;
			}else{
				actionStageCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionStageCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionStageCamera = async (id) => {
		actionStageCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageCameraErrors.value = res.errors;
			}else{
				actionStageCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionStageCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionStageCameraErrors,
		actionStageCamera,
		actionStageCameras,
		getActionStageCamera,
		getActionStageCameras,
		storeActionStageCamera,
		updateActionStageCamera,
		destroyActionStageCamera,
	}

}
