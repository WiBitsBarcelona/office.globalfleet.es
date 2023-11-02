import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useStageStatus() {

	const stageStatus = ref([]);
	const stageStatuses = ref([]);
	const stageStatusErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStageStatuses = async () => {
		stageStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-statuses/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageStatusErrors.value = res.errors;
			}else{
				stageStatuses.value = res.data;
			}
		})
		.catch((e) => {
			stageStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const getStageStatus = async (id) => {
		stageStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-statuses/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageStatusErrors.value = res.errors;
			}else{
				stageStatus.value = res.data;
			}
		})
		.catch((e) => {
			stageStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeStageStatus = async (data) => {
		stageStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-statuses/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageStatusErrors.value = res.errors;
			}else{
				stageStatus.value = res.data;
			}
		})
		.catch((e) => {
			stageStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateStageStatus = async (id, data) => {
		stageStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-statuses/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageStatusErrors.value = res.errors;
			}else{
				stageStatus.value = res.data;
			}
		})
		.catch((e) => {
			stageStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyStageStatus = async (id) => {
		stageStatusErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-statuses/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageStatusErrors.value = res.errors;
			}else{
				stageStatus.value = res.data;
			}
		})
		.catch((e) => {
			stageStatusErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		stageStatusErrors,
		stageStatus,
		stageStatuses,
		getStageStatus,
		getStageStatuses,
		storeStageStatus,
		updateStageStatus,
		destroyStageStatus,
	}

}
