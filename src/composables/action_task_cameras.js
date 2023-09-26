import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useActionTaskCamera() {

	const actionTaskCamera = ref([]);
	const actionTaskCameras = ref([]);
	const actionTaskCameraErrors = ref([]);
	const { t } = useI18n();
    
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTaskCameras = async () => {
		actionTaskCameraErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/list`, config);
			actionTaskCameras.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskCameraErrors.value = key
				}
			}
		}
	}


	const getActionTaskCamera = async (id) => {
		actionTaskCameraErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/show/${id}`, config);
			actionTaskCamera.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskCameraErrors.value = key
				}
			}
		}
	}


	const storeActionTaskCamera = async (data) => {
		actionTaskCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionTaskCamera.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskCameraErrors.value = key
				}
			}
		});
	}


	const updateActionTaskCamera = async (id, data) => {
		actionTaskCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			actionTaskCamera.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskCameraErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskCameraErrors.value = key
				}
			}
		});
	}


	const destroyActionTaskCamera = async (id) => {
		actionTaskCameraErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskCameraErrors.value = key
				}
			}
		}
	}


	return {
		actionTaskCameraErrors,
		actionTaskCamera,
		actionTaskCameras,
		getActionTaskCamera,
		getActionTaskCameras,
		storeActionTaskCamera,
		updateActionTaskCamera,
		destroyActionTaskCamera,
	}

}
