import { ref } from 'vue';
import axios from 'axios';


export default function useStage() {

	const stage = ref([]);
	const stages = ref([]);
	const errors = ref('');
	const stageErrors = ref('');
	//const router = useRouter();

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

	const getStages = async () => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/list`, config);
			stages.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const getStage = async (id) => {
		errors.value = '';
		try {
			let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/show/${id}`, config);
			stage.value = response.data.data;
		} catch (e) {
			console.log(e);
			// if (e.response.status_code === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const storeStage = async (data) => {
		stageErrors.value = '';
		
		await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/store`,{
			method: 'POST',
			headers: config.headers,
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.then((res) => {
				stage.value = res.data;
			})
			.catch((e) => {
                // Errors 500
                if (e.response.status >= 500 &&  e.response.status <= 599) {
                    stageErrors.value.push(t("errors.error_internal"));
                }
                // Errors 400
                if (e.response.status_code === 422) {
                    for (const key in e.response.data.errors) {
                        stageErrors.value = key
                    }
                }
            });

		
	}


	const updateStage = async (id, data) => {
		errors.value = '';
		try {
			await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/update/${id}`, data, config);
			//await router.push({ name: 'stage.index' });
		} catch (e) {
			console.log(e);
			// if (e.response.status === 422) {
			//     for (const key in e.response.data.errors) {
			//         errors.value = e.response.data.errors
			//     }
			// }
		}
	}


	const destroyStage = async (id) => {
		errors.value = '';
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}stages/delete/${id}`, config);
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
		stage,
		stages,
		getStage,
		getStages,
		storeStage,
		updateStage,
		destroyStage,
	}

}
