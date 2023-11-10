import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionStage() {

	const actionStage = ref([]);
	const actionStages = ref([]);
	const actionStageErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionStages = async () => {
		actionStageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stages/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageErrors.value = res.errors;
			}else{
				actionStages.value = res.data;
			}
		})
		.catch((e) => {
			actionStageErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionStage = async (id) => {

		actionStageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stages/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {

			if (!res.success) {
				actionStageErrors.value = res.errors;
			}else{
				actionStage.value = res.data;
			}
		})
		.catch((e) => {
			actionStageErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionStage = async (data) => {
		actionStageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stages/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageErrors.value = res.errors;
			}else{
				actionStage.value = res.data;
			}
		})
		.catch((e) => {
			actionStageErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionStage = async (id, data) => {
		actionStageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stages/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageErrors.value = res.errors;
			}else{
				actionStage.value = res.data;
			}
		})
		.catch((e) => {
			actionStageErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionStage = async (id) => {
		actionStageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-stages/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionStageErrors.value = res.errors;
			}else{
				actionStage.value = res.data;
			}
		})
		.catch((e) => {
			actionStageErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionStageErrors,
		actionStage,
		actionStages,
		getActionStage,
		getActionStages,
		storeActionStage,
		updateActionStage,
		destroyActionStage,
	}

}
