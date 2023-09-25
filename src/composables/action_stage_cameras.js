import { ref } from 'vue';
import axios from 'axios';
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
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/list`, config);
			actionStageCameras.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageCameraErrors.value = key
				}
			}
		}
	}


	const getActionStageCamera = async (id) => {
		actionStageCameraErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/show/${id}`, config);
			actionStageCamera.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageCameraErrors.value = key
				}
			}
		}
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
			actionStageCamera.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageCameraErrors.value = key
				}
			}
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
			actionStageCamera.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionStageCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageCameraErrors.value = key
				}
			}
		});
	}


	const destroyActionStageCamera = async (id) => {
		actionStageCameraErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-cameras/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionStageCameraErrors.value = key
				}
			}
		}
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
