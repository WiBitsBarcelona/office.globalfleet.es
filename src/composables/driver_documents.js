import { ref } from 'vue';
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/auth/authentications';





export default function useDriverDocument() {

	const errors = ref('');
	const driverDocumentData = ref([]);
	const driverDocuments = ref([]);

    const useAuthentication = useAuthenticationStore();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getDriverDocuments = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-documents/${id}/list`, config);
			driverDocuments.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}

	const downloadDriverDocument = async (path) => {
		errors.value = '';
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}downloads/document?p=${path}`, {
				method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  'Authorization': `Bearer ${localStorage.getItem('token')}`,
				}
			  });
			  const response = await res.json();
			  driverDocumentData.value = response.data;
		} catch (e) {
			console.log(e);
		}
	}

	const destroyDriverDocument = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-documents/delete/${id}`, config);
		} catch (e) {
			if (e.response.data.status_code === 422) {
					errors.value = e.response.data.errors.e;
            }
		}
	}

	const storeDriverDocument = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}driver-documents/store`, data, config);
		} catch (e) {
			console.log(e);
		}
	}








	return {
		errors,
		driverDocuments,
		driverDocumentData,
		getDriverDocuments,
		downloadDriverDocument,
		destroyDriverDocument,
		storeDriverDocument,
	}

}
