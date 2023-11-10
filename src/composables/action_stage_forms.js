import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionStageForm() {

	const actionStageForm = ref([]);
	const actionStageForms = ref([]);
	const actionStageFormErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionStageForms = async () => {
		actionStageFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-forms/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageFormErrors.value = res.errors;
			}else{
				actionStageForms.value = res.data;
			}
		})
		.catch((e) => {
			actionStageFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionStageForm = async (id) => {
		actionStageFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-forms/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageFormErrors.value = res.errors;
			}else{
				actionStageForm.value = res.data;
			}
		})
		.catch((e) => {
			actionStageFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionStageForm = async (data) => {
		actionStageFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-forms/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageFormErrors.value = res.errors;
			}else{
				actionStageForm.value = res.data;
			}
		})
		.catch((e) => {
			actionStageFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionStageForm = async (id, data) => {
		actionStageFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-forms/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageFormErrors.value = res.errors;
			}else{
				actionStageForm.value = res.data;
			}
		})
		.catch((e) => {
			actionStageFormErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionStageForm = async (id) => {
		actionStageFormErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stage-forms/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageFormErrors.value = res.errors;
			}else{
				actionStageForm.value = res.data;
			}
		})
		.catch((e) => {
			actionStageFormErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionStageFormErrors,
		actionStageForm,
		actionStageForms,
		getActionStageForm,
		getActionStageForms,
		storeActionStageForm,
		updateActionStageForm,
		destroyActionStageForm,
	}

}
