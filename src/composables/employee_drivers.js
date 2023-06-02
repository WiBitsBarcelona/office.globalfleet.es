import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useEmployeeDriver() {

	const employeeDriver = ref([])
	const employeeDrivers = ref([])
	const errors = ref('')
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getEmployeeDrivers = async () => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employee-drivers/list`, config);
			employeeDrivers.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getEmployeeDriver = async (id) => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employee-drivers/show/${id}`, config);
			employeeDriver.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeEmployeeDriver = async (data) => {
		errors.value = ''
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employee-drivers/store`, data, config);
			//await router.push({ name: 'employeeDriver.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateEmployeeDriver = async (id, data) => {
		errors.value = ''
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employee-drivers/update/${id}`, data, config);
			//await router.push({ name: 'employeeDriver.index' });
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyEmployeeDriver = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employee-drivers/destroy/${id}`, config);
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
		employeeDriver,
		employeeDrivers,
		getEmployeeDriver,
		getEmployeeDrivers,
		storeEmployeeDriver,
		updateEmployeeDriver,
		destroyEmployeeDriver,
	}

}
