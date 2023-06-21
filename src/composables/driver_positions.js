import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useDriverPosition() {

	const driverPosition = ref([]);
	const driverPositions = ref([]);
	const errors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getDriverPositions = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-positions/list`, config);
			driverPositions.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getDriverPosition = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-positions/show/${id}`, config);
			driverPosition.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const storeDriverPosition = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-positions/store`, data, config);
			//await router.push({ name: 'driverPosition.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateDriverPosition = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-positions/update/${id}`, data, config);
			//await router.push({ name: 'driverPosition.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyDriverPosition = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-positions/destroy/${id}`, config);
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
		driverPosition,
		driverPositions,
		getDriverPosition,
		getDriverPositions,
		storeDriverPosition,
		updateDriverPosition,
		destroyDriverPosition,
	}

}
