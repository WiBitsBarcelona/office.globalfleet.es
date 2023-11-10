import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActivityType() {

	const activityType = ref([]);
	const activityTypes = ref([]);
	const activityTypeErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getActivityTypes = async () => {
		activityTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activity-types/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityTypeErrors.value = res.errors;
			}else{
				activityTypes.value = res.data;
			}
		})
		.catch((e) => {
			activityTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActivityType = async (id) => {
		activityTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activity-types/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityTypeErrors.value = res.errors;
			}else{
				activityType.value = res.data;
			}
		})
		.catch((e) => {
			activityTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActivityType = async (data) => {
		activityTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activity-types/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityTypeErrors.value = res.errors;
			}else{
				activityType.value = res.data;
			}
		})
		.catch((e) => {
			activityTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActivityType = async (id, data) => {
		activityTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activity-types/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityTypeErrors.value = res.errors;
			}else{
				activityType.value = res.data;
			}
		})
		.catch((e) => {
			activityTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActivityType = async (id) => {
		activityTypeErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activity-types/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityTypeErrors.value = res.errors;
			}else{
				activityType.value = res.data;
			}
		})
		.catch((e) => {
			activityTypeErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		activityTypeErrors,
		activityType,
		activityTypes,
		getActivityType,
		getActivityTypes,
		storeActivityType,
		updateActivityType,
		destroyActivityType,
	}

}
