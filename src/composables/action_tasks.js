import { ref } from 'vue';
import axios from 'axios';
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
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/list`, config);
			actionTasks.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskErrors.value = key
				}
			}
		}
	}


	const getActionTask = async (id) => {
		actionTaskErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/show/${id}`, config);
			actionTask.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskErrors.value = key
				}
			}
		}
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
			actionTask.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskErrors.value = key
				}
			}
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
			actionTask.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				actionTaskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskErrors.value = key
				}
			}
		});
	}


	const destroyActionTask = async (id) => {
		actionTaskErrors.value = [];
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-tasks/delete/${id}`, config);
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					actionTaskErrors.value = key
				}
			}
		}
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
