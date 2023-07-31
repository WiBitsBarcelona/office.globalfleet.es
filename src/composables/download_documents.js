import { ref } from 'vue';
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/auth/authentications';



export default function useDownloadDocument() {

	const documentData = ref([]);
	const errors = ref('');


    const useAuthentication = useAuthenticationStore();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const downloadDocument = async (path) => {
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
			  documentData.value = response.data;
		} catch (e) {
			console.log(e);
		}
	}

	return {
		errors,
		downloadDocument,
		documentData,
	}

}
