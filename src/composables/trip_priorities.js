import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useTripPriority() {

	const tripPriority = ref([])
	const tripPriorities = ref([])
	const errors = ref('')
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getTripPriorities = async () => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-priorities/list`, config);

            console.log(response);

			tripPriorities.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getTripPriority = async (id) => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-priorities/show/${id}`, config);
			tripPriority.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeTripPriority = async (data) => {
		errors.value = ''
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-priorities/store`, data, config);
			//await router.push({ name: 'tripPriority.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateTripPriority = async (id, data) => {
		errors.value = ''
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-priorities/update/${id}`, data, config);
			//await router.push({ name: 'tripPriority.index' });
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyTripPriority = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-priorities/destroy/${id}`, config);
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
		tripPriority,
		tripPriorities,
		getTripPriority,
		getTripPriorities,
		storeTripPriority,
		updateTripPriority,
		destroyTripPriority,
	}

}
