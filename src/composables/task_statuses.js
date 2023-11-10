import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useTaskStatus() {

	const taskStatus = ref([]);
	const taskStatuses = ref([]);
	const taskStatusErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTaskStatuses = async () => {
		taskStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-statuses/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskStatusErrors.value = res.errors;
			}else{
				taskStatuses.value = res.data;
			}
		})
		.catch((e) => {
			taskStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const getTaskStatus = async (id) => {
		taskStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-statuses/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskStatusErrors.value = res.errors;
			}else{
				taskStatus.value = res.data;
			}
		})
		.catch((e) => {
			taskStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeTaskStatus = async (data) => {
		taskStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-statuses/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskStatusErrors.value = res.errors;
			}else{
				taskStatus.value = res.data;
			}
		})
		.catch((e) => {
			taskStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateTaskStatus = async (id, data) => {
		taskStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-statuses/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskStatusErrors.value = res.errors;
			}else{
				taskStatus.value = res.data;
			}
		})
		.catch((e) => {
			taskStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyTaskStatus = async (id) => {
		taskStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-statuses/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				taskStatusErrors.value = res.errors;
			}else{
				taskStatus.value = res.data;
			}
		})
		.catch((e) => {
			taskStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		taskStatusErrors,
		taskStatus,
		taskStatuses,
		getTaskStatus,
		getTaskStatuses,
		storeTaskStatus,
		updateTaskStatus,
		destroyTaskStatus,
	}

}
