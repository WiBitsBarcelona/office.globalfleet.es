import { ref } from 'vue'; 
import axios from 'axios';


export default function useTrips(){

    const trip = ref([]);
    const trips = ref([]);
    const errors = ref('');
    const tripErrors = ref('');


    // By Axios
    let config = {
        headers: {
            "Accept": "application/json", //
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }


    const getTrips = async () => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`, config);
        trips.value = response.data.data;
    }

    const getTrip = async (id) => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/show/${id}`, config)
        trip.value = response.data.data
    }


    const storeTrip = async (data) => {
        tripErrors.value = '';
        
        await fetch(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/store`,{
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((res) => {
                trip.value = res.data;
            })
            .catch((e) => {
                // Errors 500
                if (e.response.status >= 500 &&  e.response.status <= 599) {
                    tripErrors.value.push(t("errors.error_internal"));
                }
                // Errors 400
                if (e.response.status_code === 422) {
                    for (const key in e.response.data.errors) {
                        tripErrors.value = key
                    }
                }
            });

    }

    const updateTrip = async (id, data) => {
        errors.value = '';
        try {
            await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/update/${id}`, data, config)
            //await router.push({ name: 'note.index' })
        } catch (e) {
            // Errors 500
			if (e.response.status >= 500 &&  e.response.status <= 599) {
				errors.value.push(t("errors.error_internal"));
			}
			// Errors 400
			if (e.response.status_code === 422) {
			     for (const key in e.response.data.errors) {
			         errors.value = key
			     }
			}
        }
    }


    const destroyTrip = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/delete/${id}`, config)
    }

    return {
        errors,
        trip,
        trips,
        getTrip,
        getTrips,
        storeTrip,
        updateTrip,
        destroyTrip,
    }

}