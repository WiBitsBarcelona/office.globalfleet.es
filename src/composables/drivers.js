import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useDriver() {

	const driver = ref([]);
	const drivers = ref([]);
	const errors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getDrivers = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/drivers/list`, config);
			drivers.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getDriver = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/drivers/show/${id}`, config);
			driver.value = response.data.data;
		} catch (e) {
			console.log(e);
			if (e.response.status_code === 422) {
			    for (const key in e.response.data.errors) {
			        errors.value = e.response.data.errors
			    }
			}
		}
	}


	const storeDriver = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/drivers/store`, data, config);
			//await router.push({ name: 'driver.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateDriver = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/drivers/update/${id}`, data, config);
			//await router.push({ name: 'driver.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyDriver = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/drivers/destroy/${id}`, config);
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
		driver,
		drivers,
		getDriver,
		getDrivers,
		storeDriver,
		updateDriver,
		destroyDriver,
	}

}
