import { ref } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';



export default function useDashboard() {

	const dashboard = ref([]);
	const errors = ref('');
	//const router = useRouter()

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}


	const getDashboard = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}office/dashboard`, config);
			dashboard.value = response.data.data;

		} catch (e) {
			console.log(e);
		}
	}


	return {
		errors,
		dashboard,
		getDashboard,
	}

}
