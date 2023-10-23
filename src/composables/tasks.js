import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useTask() {

	const task = ref([]);
	const tasks = ref([]);
	const taskErrors = ref([]);
	const { t } = useI18n();
	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTasks = async () => {
		taskErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/list`, config);
			tasks.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				taskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					taskErrors.value = key
				}
			}
		}
	}


	const getTask = async (id) => {
		taskErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/show/${id}`, config);
			task.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				taskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					taskErrors.value = key
				}
			}
		}
	}


	const storeTask = async (data) => {
		taskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			task.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				taskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					taskErrors.value = key
				}
			}
		});
	}


	const updateTask = async (id, data) => {
		taskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			task.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				taskErrors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
				for (const key in e.response.data.errors) {
					taskErrors.value = key
				}
			}
		});
	}


	const destroyTask = async (id) => {
		taskErrors.value = [];
		
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400

			//console.log(res);
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				task.value = res.data;
			}
			
		})
		.catch((e) => {
			// Errors 500

			// if (e.response.status >= 500) {
			// 	taskErrors.value.push(t("errors.error_internal"));
			// }
		});

	}


	return {
		taskErrors,
		task,
		tasks,
		getTask,
		getTasks,
		storeTask,
		updateTask,
		destroyTask,
	}

}
