import { ref } from "vue";
import axios from "axios";

export default function useChat() {
  let cometData = ref({});

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // Función para conseguir los datos de cometchat del usuario que se ha logueado
  const getCometChatCredentials = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/cometchat`,
        config
      );

      cometData.value = response.data.data.company.cometchat;
    } catch (e) {
      console.log(e);
    }
  };

  // Función para comprobar si el usuario está logueado o no.
  const isLoggued = async () => {
    CometChat.getLoggedinUser().then(() => {
      isLoggued = true;
      LoadChatsList();
    });

    if (!isLoggued) {
      // Creem l'usuari
      CometChat.createUser(user, authKey).then(
        async () => {
          // Un cop creat, ens loguejarem
          const Logued = await logUserIn(authKey, UID);
          // Si la sessió s'ha iniciat correctament
          if (Logued) {
            LoadChatsList();
          }
        },
        async (error) => {
          if (error.code === "ERR_UID_ALREADY_EXISTS") {
            // En cas d'existir, farem login
            const Logued = await logUserIn(authKey, UID);
            if (Logued) {
              LoadChatsList();
            }
          }
        }
      );
    } else {
        // Vamos a retornar true cuando el usuario esté logueado
        return true;
    }
  };

  return {
    cometData,
    getCometChatCredentials,
  };
}
