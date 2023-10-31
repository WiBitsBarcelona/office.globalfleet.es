import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionTaskForm() {

	const actionTaskForm = ref([]);
	const actionTaskForms = ref([]);
	const actionTaskFormErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTaskForms = async () => {
		actionTaskFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-forms/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskFormErrors.value = res.errors;
			}else{
				actionTaskForms.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionTaskForm = async (id) => {
		actionTaskFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-forms/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskFormErrors.value = res.errors;
			}else{
				actionTaskForm.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionTaskForm = async (data) => {
		actionTaskFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-forms/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskFormErrors.value = res.errors;
			}else{
				actionTaskForm.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionTaskForm = async (id, data) => {
		actionTaskFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-forms/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskFormErrors.value = res.errors;
			}else{
				actionTaskForm.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionTaskForm = async (id) => {
		actionTaskFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-task-forms/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTaskFormErrors.value = res.errors;
			}else{
				actionTaskForm.value = res.data;
			}
		})
		.catch((e) => {
			actionTaskFormErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionTaskFormErrors,
		actionTaskForm,
		actionTaskForms,
		getActionTaskForm,
		getActionTaskForms,
		storeActionTaskForm,
		updateActionTaskForm,
		destroyActionTaskForm,
	}

}
