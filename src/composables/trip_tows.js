import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useTripTow() {

	const tripTow = ref([]);
	const tripTows = ref([]);
	const tripTowErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTripTows = async () => {
		tripTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripTowErrors.value = res.errors;
			}else{
				tripTows.value = res.data;
			}
		})
		.catch((e) => {
			tripTowErrors.value.push(t("errors.error_internal"));
		});
	}


	const getTripTow = async (id) => {
		tripTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripTowErrors.value = res.errors;
			}else{
				tripTow.value = res.data;
			}
		})
		.catch((e) => {
			tripTowErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeTripTow = async (data) => {
		tripTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripTowErrors.value = res.errors;
			}else{
				tripTow.value = res.data;
			}
		})
		.catch((e) => {
			tripTowErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateTripTow = async (id, data) => {
		tripTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripTowErrors.value = res.errors;
			}else{
				tripTow.value = res.data;
			}
		})
		.catch((e) => {
			tripTowErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyTripTow = async (id) => {
		tripTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripTowErrors.value = res.errors;
			}else{
				tripTow.value = res.data;
			}
		})
		.catch((e) => {
			tripTowErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		tripTowErrors,
		tripTow,
		tripTows,
		getTripTow,
		getTripTows,
		storeTripTow,
		updateTripTow,
		destroyTripTow,
	}

}
