import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useTripCommStatus() {

	const tripCommStatus = ref([])
	const tripCommStatuses = ref([])
	const errors = ref('')
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTripCommStatuses = async () => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-comm-statuses/list`, config);
			tripCommStatuses.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getTripCommStatus = async (id) => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-comm-statuses/show/${id}`, config);
			tripCommStatus.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeTripCommStatus = async (data) => {
		errors.value = ''
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-comm-statuses/store`, data, config);
			//await router.push({ name: 'tripCommStatus.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateTripCommStatus = async (id, data) => {
		errors.value = ''
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-comm-statuses/update/${id}`, data, config);
			//await router.push({ name: 'tripCommStatus.index' });
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyTripCommStatus = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-comm-statuses/destroy/${id}`, config);
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
		tripCommStatus,
		tripCommStatuses,
		getTripCommStatus,
		getTripCommStatuses,
		storeTripCommStatus,
		updateTripCommStatus,
		destroyTripCommStatus,
	}

}
