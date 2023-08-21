import { ref } from 'vue';
import axios from 'axios';


export default function useStageIncident() {

	const stageIncident = ref([]);
	const stageIncidents = ref([]);
	const errors = ref('');

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStageIncidents = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/list`, config);
			stageIncidents.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}

	const getStageIncidentsById = async (id) => {
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/${id}/list`, config);
			stageIncidents.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getStageIncident = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/show/${id}`, config);
			stageIncident.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const storeStageIncident = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/store`, data, config);
		} catch (e) {
			console.log(e);
		}
	}


	const updateStageIncident = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/update/${id}`, data, config);
		} catch (e) {
			console.log(e);
		}
	}


	const destroyStageIncident = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incidents/delete/${id}`, config);
		} catch (e) {
			console.log(e);
		}
	}

	return {
		errors,
		stageIncident,
		stageIncidents,
		getStageIncident,
		getStageIncidents,
		getStageIncidentsById,
		storeStageIncident,
		updateStageIncident,
		destroyStageIncident,
	}

}
