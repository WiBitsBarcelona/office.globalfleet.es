import { ref } from 'vue';
import axios from 'axios';
import { useAuthenticationStore } from '@/stores/auth/authentications';



export default function useTripDocument() {

	const tripDocument = ref([]);
	const tripDocuments = ref([]);
	const errors = ref('');
	const tripDocumentData = ref([]);
	//const router = useRouter();

    const useAuthentication = useAuthenticationStore();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}
	const getTripDocuments = async (trip_id) => {
		errors.value = '';
        const user = useAuthentication.user;
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-documents/${trip_id}/list`, config);
			tripDocuments.value = response.data.data;
		} catch (e) {
			console.log(e);
		}
	}


	const getTripDocument = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-documents/show/${id}`, config);
			tripDocument.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeTripDocument = async (data) => {
		errors.value = '';
		try {
			await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-documents/store`, data, config);
		} catch (e) {
			console.log(e);
		}
	}


	const updateTripDocument = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-documents/update/${id}`, data, config);
			//await router.push({ name: 'tripDocument.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyTripDocument = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trip-documents/delete/${id}`, config);
		} catch (e) {
			console.log(e);
			if (e.response.status === 422) {
				for (const key in e.response.data.errors) {
			    	errors.value = e.response.data.errors
			    }
			}
		}
	}

	const downloadTripDocument = async (path) => {
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
			  tripDocumentData.value = response.data;
		} catch (e) {
			console.log(e);
		}
	}

	return {
		errors,
		tripDocument,
		tripDocuments,
		tripDocumentData,
		getTripDocument,
		getTripDocuments,
		storeTripDocument,
		updateTripDocument,
		destroyTripDocument,
		downloadTripDocument,
	}

}
