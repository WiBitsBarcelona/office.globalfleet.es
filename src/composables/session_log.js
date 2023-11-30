import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useSessionLog() {

	const sessionLog = ref([]);
	const sessionLogs = ref([]);
	const sessionLogErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getSessionLogs = async (params = null) => {
		sessionLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}session-logs/list`+ params,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				sessionLogErrors.value = res.errors;
			}else{
				sessionLogs.value = res.data;
			}
		})
		.catch((e) => {
			sessionLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const getSessionLog = async (id) => {
		sessionLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}session-logs/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				sessionLogErrors.value = res.errors;
			}else{
				sessionLog.value = res.data;
			}
		})
		.catch((e) => {
			sessionLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeSessionLog = async (data) => {
		sessionLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}session-logs/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				sessionLogErrors.value = res.errors;
			}else{
				sessionLog.value = res.data;
			}
		})
		.catch((e) => {
			sessionLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateSessionLog = async (id, data) => {
		sessionLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}session-logs/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				sessionLogErrors.value = res.errors;
			}else{
				sessionLog.value = res.data;
			}
		})
		.catch((e) => {
			sessionLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroySessionLog = async (id) => {
		sessionLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}session-logs/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				sessionLogErrors.value = res.errors;
			}else{
				sessionLog.value = res.data;
			}
		})
		.catch((e) => {
			sessionLogErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		sessionLogErrors,
		sessionLog,
		sessionLogs,
		getSessionLog,
		getSessionLogs,
		storeSessionLog,
		updateSessionLog,
		destroySessionLog,
	}

}
