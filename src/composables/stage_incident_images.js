import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useStageIncidentImage() {

	const stageIncidentImage = ref([]);
	const stageIncidentImages = ref([]);
	const errors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStageIncidentImages = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incident-images/list`, config);
			stageIncidentImages.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getStageIncidentImage = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incident-images/show/${id}`, config);
			stageIncidentImage.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeStageIncidentImage = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incident-images/store`, data, config);
			//await router.push({ name: 'stageIncidentImage.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateStageIncidentImage = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incident-images/update/${id}`, data, config);
			//await router.push({ name: 'stageIncidentImage.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyStageIncidentImage = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stage-incident-images/delete/${id}`, config);
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	return {
		errors,
		stageIncidentImage,
		stageIncidentImages,
		getStageIncidentImage,
		getStageIncidentImages,
		storeStageIncidentImage,
		updateStageIncidentImage,
		destroyStageIncidentImage,
	}

}
