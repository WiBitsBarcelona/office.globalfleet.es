import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useLanguage() {

	const language = ref([]);
	const languages = ref([]);
	const languageErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getLanguages = async () => {
		languageErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/list`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					languageErrors.value = key
				}
			}
			languages.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const getLanguage = async (id) => {
		languageErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/show/${id}`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const storeLanguage = async (data) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const updateLanguage = async (id, data) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const destroyLanguage = async (id) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	return {
		languageErrors,
		language,
		languages,
		getLanguage,
		getLanguages,
		storeLanguage,
		updateLanguage,
		destroyLanguage,
	}

}
import { ref } from 'vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';


export default function useLanguage() {

	const language = ref([]);
	const languages = ref([]);
	const languageErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getLanguages = async () => {
		languageErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/list`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					languageErrors.value = key
				}
			}
			languages.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const getLanguage = async (id) => {
		languageErrors.value = [];
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/show/${id}`, config);
			// Errors 400
			if (parseInt(response.data.status_code) === 422) {
				for (const key in response.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = response.data.data;
		} catch (e) {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		}
	}


	const storeLanguage = async (data) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const updateLanguage = async (id, data) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	const destroyLanguage = async (id) => {
		languageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}languages/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			// Errors 400
			if (parseInt(res.data.status_code) === 422) {
				for (const key in res.data.errors) {
					languageErrors.value = key
				}
			}
			language.value = res.data;
		})
		.catch((e) => {
			// Errors 500
			if (e.response.status >= 500) {
				languageErrors.value.push(t("errors.error_internal"));
			}
		});
	}


	return {
		languageErrors,
		language,
		languages,
		getLanguage,
		getLanguages,
		storeLanguage,
		updateLanguage,
		destroyLanguage,
	}

}
