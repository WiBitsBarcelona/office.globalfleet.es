import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useActivity() {

	const activity = ref([]);
	const activities = ref([]);
	const activityErrors = ref([]);
	const { t } = useI18n();

	

	const getActivities = async () => {
		activityErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activities/list`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityErrors.value = res.errors;
			}else{
				activities.value = res.data;
			}
		})
		.catch((e) => {
			activityErrors.value.push(t("errors.error_internal"));
		});
	}


	const getActivity = async (id) => {
		activityErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activities/show/${id}`,{
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityErrors.value = res.errors;
			}else{
				activity.value = res.data;
			}
		})
		.catch((e) => {
			activityErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeActivity = async (data) => {
		activityErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activities/store`,{
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityErrors.value = res.errors;
			}else{
				activity.value = res.data;
			}
		})
		.catch((e) => {
			activityErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateActivity = async (id, data) => {
		activityErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activities/update/${id}`,{
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityErrors.value = res.errors;
			}else{
				activity.value = res.data;
			}
		})
		.catch((e) => {
			activityErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyActivity = async (id) => {
		activityErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}activities/delete/${id}`,{
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				activityErrors.value = res.errors;
			}else{
				activity.value = res.data;
			}
		})
		.catch((e) => {
			activityErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		activityErrors,
		activity,
		activities,
		getActivity,
		getActivities,
		storeActivity,
		updateActivity,
		destroyActivity,
	}

}
