import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useTaskIncidentImage() {

	const taskIncidentImage = ref([]);
	const taskIncidentImages = ref([]);
	const errors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTaskIncidentImages = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-incident-images/list`, config);
			taskIncidentImages.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getTaskIncidentImage = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-incident-images/show/${id}`, config);
			taskIncidentImage.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeTaskIncidentImage = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-incident-images/store`, data, config);
			//await router.push({ name: 'taskIncidentImage.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateTaskIncidentImage = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-incident-images/update/${id}`, data, config);
			//await router.push({ name: 'taskIncidentImage.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyTaskIncidentImage = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}task-incident-images/delete/${id}`, config);
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
		taskIncidentImage,
		taskIncidentImages,
		getTaskIncidentImage,
		getTaskIncidentImages,
		storeTaskIncidentImage,
		updateTaskIncidentImage,
		destroyTaskIncidentImage,
	}

}
