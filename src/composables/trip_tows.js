import { ref } from 'vue';
import axios from 'axios';
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
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/list`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					tripTowErrors.value = key
				}
			}
			tripTows.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				tripTowErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const getTripTow = async (id) => {
		tripTowErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-tows/show/${id}`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					tripTowErrors.value = key
				}
			}
			tripTow.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				tripTowErrors.value.push(t("errors.error_internal"));
			}
		}
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
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					tripTowErrors.value = key
				}
			}
			tripTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				tripTowErrors.value.push(t("errors.error_internal"));
			}
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
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					tripTowErrors.value = key
				}
			}
			tripTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				tripTowErrors.value.push(t("errors.error_internal"));
			}
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
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					tripTowErrors.value = key
				}
			}
			tripTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				tripTowErrors.value.push(t("errors.error_internal"));
			}
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
