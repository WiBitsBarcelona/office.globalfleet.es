import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActionType() {

	const actionType = ref([]);
	const actionTypes = ref([]);
	const actionTypeErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActionTypes = async () => {
		actionTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTypeErrors.value = res.errors;
			}else{
				actionTypes.value = res.data;
			}
		})
		.catch((e) => {
			actionTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActionType = async (id) => {
		actionTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTypeErrors.value = res.errors;
			}else{
				actionType.value = res.data;
			}
		})
		.catch((e) => {
			actionTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActionType = async (data) => {
		actionTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTypeErrors.value = res.errors;
			}else{
				actionType.value = res.data;
			}
		})
		.catch((e) => {
			actionTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActionType = async (id, data) => {
		actionTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTypeErrors.value = res.errors;
			}else{
				actionType.value = res.data;
			}
		})
		.catch((e) => {
			actionTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActionType = async (id) => {
		actionTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}action-types/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				actionTypeErrors.value = res.errors;
			}else{
				actionType.value = res.data;
			}
		})
		.catch((e) => {
			actionTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		actionTypeErrors,
		actionType,
		actionTypes,
		getActionType,
		getActionTypes,
		storeActionType,
		updateActionType,
		destroyActionType,
	}

}
