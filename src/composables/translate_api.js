
export default function translateApi() {

    const translateText = async (text, target_lang, source_lang) => {

        try {

            const bodyData = new URLSearchParams();
            bodyData.append('auth_key', `${import.meta.env.VITE_API_TOKEN_DEEPL}`);
            bodyData.append('text', text);
            bodyData.append('text', 'Texto Original');
            bodyData.append('target_lang', target_lang);
            bodyData.append('source_lang', source_lang);

            const response = await fetch(`${import.meta.env.VITE_API_URL_DEEPL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: bodyData
            });

            const data = await response.json();

            return data.translations

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return {
        translateText
    }
}