import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useTripStatus() {

	const tripStatus = ref([])
	const tripStatuses = ref([])
	const errors = ref('')
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTripStatuses = async () => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/list`, config);
			
            tripStatuses.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getTripStatus = async (id) => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/show/${id}`, config);
			tripStatus.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeTripStatus = async (data) => {
		errors.value = ''
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/store`, data, config);
			//await router.push({ name: 'tripStatus.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateTripStatus = async (id, data) => {
		errors.value = ''
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/update/${id}`, data, config);
			//await router.push({ name: 'tripStatus.index' });
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyTripStatus = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-statuses/destroy/${id}`, config);
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	return {
		errors,
		tripStatus,
		tripStatuses,
		getTripStatus,
		getTripStatuses,
		storeTripStatus,
		updateTripStatus,
		destroyTripStatus,
	}

}
