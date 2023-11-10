import { ref } from 'vue';
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
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskCameraErrors.value = res.errors;
			}else{
				actionTaskCameras.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionTaskCamera = async (id) => {
		actionTaskCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskCameraErrors.value = res.errors;
			}else{
				actionTaskCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskCameraErrors.value.push(t("errors.error_internal"));
		});
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
			if (!res.success) {
				actionTaskCameraErrors.value = res.errors;
			}else{
				actionTaskCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskCameraErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				actionTaskCameraErrors.value = res.errors;
			}else{
				actionTaskCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskCameraErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionTaskCamera = async (id) => {
		actionTaskCameraErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-cameras/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskCameraErrors.value = res.errors;
			}else{
				actionTaskCamera.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskCameraErrors.value.push(t("errors.error_internal"));
		});
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
