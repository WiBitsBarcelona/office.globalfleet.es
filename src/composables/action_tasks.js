import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionTask() {

	const actionTask = ref([]);
	const actionTasks = ref([]);
	const actionTaskErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTasks = async () => {
		actionTaskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskErrors.value = res.errors;
			}else{
				actionTasks.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionTask = async (id) => {
		actionTaskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskErrors.value = res.errors;
			}else{
				actionTask.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionTask = async (data) => {
		actionTaskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskErrors.value = res.errors;
			}else{
				actionTask.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionTask = async (id, data) => {
		actionTaskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskErrors.value = res.errors;
			}else{
				actionTask.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionTask = async (id) => {
		actionTaskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskErrors.value = res.errors;
			}else{
				actionTask.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionTaskErrors,
		actionTask,
		actionTasks,
		getActionTask,
		getActionTasks,
		storeActionTask,
		updateActionTask,
		destroyActionTask,
	}

}
