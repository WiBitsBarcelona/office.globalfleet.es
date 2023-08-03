import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';


export default function useEmployee() {

	const employee = ref([])
	const employees = ref([])
	const errors = ref('')
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getEmployees = async () => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/list`, config);
			employees.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getEmployee = async (id) => {
		errors.value = ''
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/show/${id}`, config);
			employee.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeEmployee = async (data) => {
		errors.value = ''
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/store`, data, config);
			//await router.push({ name: 'employee.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const updateEmployee = async (id, data) => {
		errors.value = ''
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/update/${id}`, data, config);
			//await router.push({ name: 'employee.index' });
		} catch (e) {
			console.log(e)
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyEmployee = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/delete/${id}`, config);
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
		employee,
		employees,
		getEmployee,
		getEmployees,
		storeEmployee,
		updateEmployee,
		destroyEmployee,
	}

}
