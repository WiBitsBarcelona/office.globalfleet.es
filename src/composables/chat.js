import { ref } from 'vue';
import axios from 'axios';

export default function useChat() {

    let cometData = ref({}) 

	let config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	}

    const getCometChatCredentials = async () => {
        try {
            let response = await axios.get(`${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/cometchat`, config);

            cometData.value = response.data.data.company.cometchat

        } catch (e) {
            console.log(e)
        }
    }

    return {
        cometData,
        getCometChatCredentials
    }
}