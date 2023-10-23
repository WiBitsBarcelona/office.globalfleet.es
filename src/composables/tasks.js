import { ref } from 'vue';
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
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				tasks.value = res.data;
			}
		})
		.catch((e) => {
			taskErrors.value.push(t("errors.error_internal"));
		});
	}


	const getTask = async (id) => {
		taskErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tasks/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				task.value = res.data;
			}
		})
		.catch((e) => {
			taskErrors.value.push(t("errors.error_internal"));
		});
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
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				task.value = res.data;
			}
		})
		.catch((e) => {
			taskErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				task.value = res.data;
			}
		})
		.catch((e) => {
			taskErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				taskErrors.value = res.errors;
			}else{
				task.value = res.data;
			}
		})
		.catch((e) => {
			taskErrors.value.push(t("errors.error_internal"));
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
