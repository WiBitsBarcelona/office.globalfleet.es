import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useStageTow() {

	const stageTow = ref([]);
	const stageTows = ref([]);
	const stageTowErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStageTows = async () => {
		stageTowErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/list`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					stageTowErrors.value = key
				}
			}
			stageTows.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				stageTowErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const getStageTow = async (id) => {
		stageTowErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/show/${id}`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					stageTowErrors.value = key
				}
			}
			stageTow.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				stageTowErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const storeStageTow = async (data) => {
		stageTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					stageTowErrors.value = key
				}
			}
			stageTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				stageTowErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const updateStageTow = async (id, data) => {
		stageTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					stageTowErrors.value = key
				}
			}
			stageTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				stageTowErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const destroyStageTow = async (id) => {
		stageTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					stageTowErrors.value = key
				}
			}
			stageTow.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				stageTowErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	return {
		stageTowErrors,
		stageTow,
		stageTows,
		getStageTow,
		getStageTows,
		storeStageTow,
		updateStageTow,
		destroyStageTow,
	}

}
