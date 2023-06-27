import { ref } from 'vue';
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/auth/authentications';


export default function useCompanyDriver() {

	const companyDriver = ref([]);
	const companyDrivers = ref([]);
	const errors = ref('');

    const useAuthentication = useAuthenticationStore();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getCompanyDrivers = async () => {
		errors.value = '';
        const user = useAuthentication.user;
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-drivers/${user.company_id}/list`, config);
			companyDrivers.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getCompanyDriver = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-drivers/show/${id}`, config);
			companyDriver.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const storeCompanyDriver = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-drivers/store`, data, config);
			//await router.push({ name: 'companyDriver.index' });
		} catch (e) {
			console.log(e);
		}
	}


	const updateCompanyDriver = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-drivers/update/${id}`, data, config);
			//await router.push({ name: 'companyDriver.index' });
		} catch (e) {
			console.log(e);
		}
	}


	const destroyCompanyDriver = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-drivers/destroy/${id}`, config);
		} catch (e) {
			console.log(e);
		}
	}


	return {
		errors,
		companyDriver,
		companyDrivers,
		getCompanyDriver,
		getCompanyDrivers,
		storeCompanyDriver,
		updateCompanyDriver,
		destroyCompanyDriver,
	}

}
