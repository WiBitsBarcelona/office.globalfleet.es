import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useDriverIncident() {

	const driverIncident = ref([]);
	const driverIncidents = ref([]);
	const errors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getDriverIncidents = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-incidents/list`, config);
			driverIncidents.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getDriverIncident = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-incidents/show/${id}`, config);
			driverIncident.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeDriverIncident = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-incidents/store`, data, config);
			//await router.push({ name: 'driverIncident.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateDriverIncident = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-incidents/update/${id}`, data, config);
			//await router.push({ name: 'driverIncident.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyDriverIncident = async (id) => {
        errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-incidents/delete/${id}`, config);
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
		driverIncident,
		driverIncidents,
		getDriverIncident,
		getDriverIncidents,
		storeDriverIncident,
		updateDriverIncident,
		destroyDriverIncident,
	}

}
