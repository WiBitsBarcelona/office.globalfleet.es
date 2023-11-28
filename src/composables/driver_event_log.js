import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useDriverEventLog() {

	const driverEventLog = ref([]);
	const driverEventLogs = ref([]);
	const driverEventLogErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getDriverEventLogs = async () => {
		driverEventLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-event-logs/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				driverEventLogErrors.value = res.errors;
			}else{
				driverEventLogs.value = res.data;
			}
		})
		.catch((e) => {
			driverEventLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const getDriverEventLog = async (id) => {
		driverEventLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-event-logs/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				driverEventLogErrors.value = res.errors;
			}else{
				driverEventLog.value = res.data;
			}
		})
		.catch((e) => {
			driverEventLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeDriverEventLog = async (data) => {
		driverEventLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-event-logs/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				driverEventLogErrors.value = res.errors;
			}else{
				driverEventLog.value = res.data;
			}
		})
		.catch((e) => {
			driverEventLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateDriverEventLog = async (id, data) => {
		driverEventLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-event-logs/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				driverEventLogErrors.value = res.errors;
			}else{
				driverEventLog.value = res.data;
			}
		})
		.catch((e) => {
			driverEventLogErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyDriverEventLog = async (id) => {
		driverEventLogErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-event-logs/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				driverEventLogErrors.value = res.errors;
			}else{
				driverEventLog.value = res.data;
			}
		})
		.catch((e) => {
			driverEventLogErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		driverEventLogErrors,
		driverEventLog,
		driverEventLogs,
		getDriverEventLog,
		getDriverEventLogs,
		storeDriverEventLog,
		updateDriverEventLog,
		destroyDriverEventLog,
	}

}
