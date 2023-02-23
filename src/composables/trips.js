import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';






export default function useTrips(){

    const trip = ref([]);
    const trips = ref([]);

    const errors = ref('');
    const router = useRouter();


    const URL = ''



    const getTrips = async () => {

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/list`, config);
        trips.value = response.data.data;
    }

    const getTrip = async (id) => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/show/${id}`, )
        trip.value = response.data.data
    }


    const storeTrip = async (data) => {
        errors.value = ''
        try {
            await axios.post(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/store`, data)
            await router.push({ name: 'note.index' })
        } catch (e) {
            console.log(e)
            // if (e.response.status_code === 422) {
            //     for (const key in e.response.data.errors) {
            //         errors.value = e.response.data.errors
            //     }
            // }
        }

    }

    const updateTrip = async (id, note) => {
        errors.value = ''
        try {
            await axios.put(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/update/${id}`, note)
            await router.push({ name: 'note.index' })
        } catch (e) {
            console.log(e)
            // if (e.response.status === 422) {
            //     for (const key in e.response.data.errors) {
            //         errors.value = e.response.data.errors
            //     }
            // }
        }
    }


    const destroyTrip = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_URL_GLOBALFLEET}trips/destroy/${id}`)
    }

    

    return {
        errors,
        trip,
        trips,
        getTrip,
        getTrips,
        storeTrip,
        updateTrip,
        destroyTrip
    }

}