import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useTripStatus() {

	const tripStatus = ref([]);
	const tripStatuses = ref([]);
	const tripStatusErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTripStatuses = async () => {
		tripStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripStatusErrors.value = res.errors;
			}else{
				tripStatuses.value = res.data;
			}
		})
		.catch((e) => {
			tripStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const getTripStatus = async (id) => {
		tripStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripStatusErrors.value = res.errors;
			}else{
				tripStatus.value = res.data;
			}
		})
		.catch((e) => {
			tripStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeTripStatus = async (data) => {
		tripStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripStatusErrors.value = res.errors;
			}else{
				tripStatus.value = res.data;
			}
		})
		.catch((e) => {
			tripStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateTripStatus = async (id, data) => {
		tripStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripStatusErrors.value = res.errors;
			}else{
				tripStatus.value = res.data;
			}
		})
		.catch((e) => {
			tripStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyTripStatus = async (id) => {
		tripStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripStatusErrors.value = res.errors;
			}else{
				tripStatus.value = res.data;
			}
		})
		.catch((e) => {
			tripStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		tripStatusErrors,
		tripStatus,
		tripStatuses,
		getTripStatus,
		getTripStatuses,
		storeTripStatus,
		updateTripStatus,
		destroyTripStatus,
	}

}
