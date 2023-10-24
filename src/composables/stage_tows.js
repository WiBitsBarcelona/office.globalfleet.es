import { ref } from 'vue';
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
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/list`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageTowErrors.value = res.errors;
			}else{
				stageTows.value = res.data;
			}
		})
		.catch((e) => {
			stageTowErrors.value.push(t("errors.error_internal"));
		});
	}


	const getStageTow = async (id) => {
		stageTowErrors.value = [];
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-tows/show/${id}`,{
			method: 'GET',
			headers: config.headers,
		})
		.then(res => res.json())
		.then((res) => {
			if (!res.success) {
				stageTowErrors.value = res.errors;
			}else{
				stageTow.value = res.data;
			}
		})
		.catch((e) => {
			stageTowErrors.value.push(t("errors.error_internal"));
		});
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
			if (!res.success) {
				stageTowErrors.value = res.errors;
			}else{
				stageTow.value = res.data;
			}
		})
		.catch((e) => {
			stageTowErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				stageTowErrors.value = res.errors;
			}else{
				stageTow.value = res.data;
			}
		})
		.catch((e) => {
			stageTowErrors.value.push(t("errors.error_internal"));
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
			if (!res.success) {
				stageTowErrors.value = res.errors;
			}else{
				stageTow.value = res.data;
			}
		})
		.catch((e) => {
			stageTowErrors.value.push(t("errors.error_internal"));
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
