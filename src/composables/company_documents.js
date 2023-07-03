import { ref } from 'vue';
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/auth/authentications';



export default function useCompanyDocument() {

	const companyDocument = ref([]);
	const companyDocuments = ref([]);
	const errors = ref('');
	//const router = useRouter();


    const useAuthentication = useAuthenticationStore();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getCompanyDocuments = async () => {
		errors.value = '';
        const user = useAuthentication.user;
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-documents/${user.employee.company_id}/list`, config);
			companyDocuments.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getCompanyDocument = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-documents/show/${id}`, config);
			companyDocument.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const storeCompanyDocument = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-documents/store`, data, config);
			//await router.push({ name: 'companyDocument.index' });
		} catch (e) {
			console.log(e);
		}
	}


	const updateCompanyDocument = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-documents/update/${id}`, data, config);
			//await router.push({ name: 'companyDocument.index' });
		} catch (e) {
			console.log(e);
		}
	}


	const destroyCompanyDocument = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}company-documents/destroy/${id}`, config);
		} catch (e) {
			console.log(e);
		}
	}


	return {
		errors,
		companyDocument,
		companyDocuments,
		getCompanyDocument,
		getCompanyDocuments,
		storeCompanyDocument,
		updateCompanyDocument,
		destroyCompanyDocument,
	}

}
