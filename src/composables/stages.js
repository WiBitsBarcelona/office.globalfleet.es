import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


export default function useStage() {

	const stage = ref([]);
	const stages = ref([]);
	const stageErrors = ref([]);
	const { t } = useI18n();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStages = async () => {
		stageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageErrors.value = res.errors;
			}else{
				stages.value = res.data;
			}
		})
		.catch((e) => {
			stageErrors.value.push(t("errors.error_internal"));
		});
	}


	const getStage = async (id) => {
		stageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageErrors.value = res.errors;
			}else{
				stage.value = res.data;
			}
		})
		.catch((e) => {
			stageErrors.value.push(t("errors.error_internal"));
		});
	}


	const storeStage = async (data) => {
		stageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageErrors.value = res.errors;
			}else{
				stage.value = res.data;
			}
		})
		.catch((e) => {
			stageErrors.value.push(t("errors.error_internal"));
		});
	}


	const updateStage = async (id, data) => {
		stageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/update/${id}`,{
			method: 'PUT',
			headers: config.headers,
			body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageErrors.value = res.errors;
			}else{
				stage.value = res.data;
			}
		})
		.catch((e) => {
			stageErrors.value.push(t("errors.error_internal"));
		});
	}


	const destroyStage = async (id) => {
		stageErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/delete/${id}`,{
			method: 'DELETE',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageErrors.value = res.errors;
			}else{
				stage.value = res.data;
			}
		})
		.catch((e) => {
			stageErrors.value.push(t("errors.error_internal"));
		});
	}


	return {
		stageErrors,
		stage,
		stages,
		getStage,
		getStages,
		storeStage,
		updateStage,
		destroyStage,
	}

}
