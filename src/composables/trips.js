import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useTrip() {

	const trip = ref([]);
	const trips = ref([]);
	const tripErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTrips = async () => {
		tripErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripErrors.value = res.errors;
			}else{
				trips.value = res.data;
			}
		})
		.catch((e) => {
			tripErrors.value.push(t("errors.error_internal"));
		});
	}


	const getTrip = async (id) => {
		tripErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripErrors.value = res.errors;
			}else{
				trip.value = res.data;
			}
		})
		.catch((e) => {
			tripErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeTrip = async (data) => {
		tripErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripErrors.value = res.errors;
			}else{
				trip.value = res.data;
			}
		})
		.catch((e) => {
			tripErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateTrip = async (id, data) => {
		tripErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripErrors.value = res.errors;
			}else{
				trip.value = res.data;
			}
		})
		.catch((e) => {
			tripErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyTrip = async (id) => {
		tripErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				tripErrors.value = res.errors;
			}else{
				trip.value = res.data;
			}
		})
		.catch((e) => {
			tripErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		tripErrors,
		trip,
		trips,
		getTrip,
		getTrips,
		storeTrip,
		updateTrip,
		destroyTrip,
	}

}
