import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useTow() {

	const tow = ref([]);
	const tows = ref([]);
	const towErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTows = async () => {
		towErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tows/list`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					towErrors.value = key
				}
			}
			tows.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				towErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const getTow = async (id) => {
		towErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tows/show/${id}`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					towErrors.value = key
				}
			}
			tow.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				towErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const storeTow = async (data) => {
		towErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tows/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					towErrors.value = key
				}
			}
			tow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				towErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const updateTow = async (id, data) => {
		towErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tows/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					towErrors.value = key
				}
			}
			tow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				towErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const destroyTow = async (id) => {
		towErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}tows/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					towErrors.value = key
				}
			}
			tow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				towErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	return {
		towErrors,
		tow,
		tows,
		getTow,
		getTows,
		storeTow,
		updateTow,
		destroyTow,
	}

}
