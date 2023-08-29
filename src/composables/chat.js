import { ref, reactive } from "vue";
import axios from "axios";
import { useAuthenticationStore } from "@/stores/auth/authentications";

export default function useChat() {
  const cometData = ref({});
  const conversationList = ref("");
  const unreadMessageCount = ref(0);
  const token = () => localStorage.getItem("token");

  // Función para conseguir los datos de cometchat del usuario que se ha logueado
  const getCometChatCredentials = async () => {
    if (localStorage.getItem("token")) {
      try {
        let config = reactive({
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token()}`,
          },
        });

        let response = await axios.get(
          `${import.meta.env.VITE_API_URL_GLOBALFLEET}employees/cometchat`,
          config
        );

        cometData.value = response.data.data;
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Funció per a obtenir una llista dels usuaris registrats a la app
  const getRegistredUsers = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/users?perPage=100&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));

    return response;
  };

  // Funció per rebre informació sobre un usuari
  const getUserData = async (user_uid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/users/${user_uid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));

    return response;
  };

  // Funció per rebre informació sobre un grup
  const getGroupData = async (guid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/groups/${guid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));

    return response;
  };

  // Funció per llistar tots els xats
  const getConversationsList = async (user_uid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        onBehalfOf: user_uid,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/conversations`,
      options
    )
      .then(async (response) => await response.json())
      .then((response) => {
        conversationList.value = response.data;
        return response.data;
      })
      .catch((err) => console.error(err));

    return response;
  };

  // Funció per llistar els missatges del xat seleccionat
  const loadChatMessages = async (ConversationId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/messages?limit=100&conversationId=${ConversationId}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => console.error(err));

    return response;
  };

  // Funció per rebre una sola conversació
  const getUserConversation = async (user_uid, other_user_uid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        onBehalfOf: user_uid,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/users/${other_user_uid}/conversation`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // console.error(err);
        return err;
      });

    return response;
  };

  const getGroupConversation = async (user_uid, group_uid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        onBehalfOf: user_uid,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/groups/${group_uid}/conversation`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((err) => {
        // console.error(err);
        return err;
      });

    return response;
  };

  // Funció per a marcar com a llegit un xat entre dos usuaris
  const markUserConversationAsRead = (user_uid, conversationWith) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        onBehalfOf: user_uid,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/users/${conversationWith}/conversation/read`,
      options
    ).catch((err) => console.error(err));
  };

  // Funció per a marcar com a llegit un xat de grup
  const markGroupConversationAsRead = (user_id, guid) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        onBehalfOf: user_id,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/groups/${guid}/conversation/read`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  // Marcar mensajes como enviado una conversacion entre 2 usuarios
  const mark_user_conversation_as_delivered = async (user, conversationWith) => {
    try {
      const response = await fetch(
        `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/users/${user}/conversation/delivered`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            onBehalfOf: conversationWith,
            apikey: cometData.value.company.cometchat.rest_api_key,
          },
        }
      );

      const data = await response.json();

      //console.log(data)

      return data;

    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Funcion para marcar como leida una conversacion en un grupo
  const mark_group_conversation_as_delivered = (conversationWith, user) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        onBehalfOf: conversationWith,
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/groups/${user}/conversation/delivered`,
      options
    ).catch((err) => console.error(err));
  }

  // Funció per a enviar missatges
  const sendTextMessage = async (user_uid, message, chat_id, receiverType, isMetadata) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        onBehalfOf: user_uid,
        "content-type": "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
      body: JSON.stringify({
        category: "message",
        type: "text",
        data: {
          text: message,
          ...(isMetadata
            ? {
                metadata: {
                  reader: '0', // Pruebas -> valor 0 es no confirmado y 1 es Confirmado
                  confirmetAt: 'undefined'
                }
              }
            : ''),
        },
        receiver: chat_id,
        receiverType: receiverType,
      }),
    };

    fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/messages`,
      options
    )
      .then((response) => response.json())
      .then(async () => {
        await getConversationsList(user_uid);
      })
      .catch((err) => console.error(err));
  };

  const getUserGroups = async (user_uid) => {
    const response = await fetch(
      `https://api-eu.cometchat.io/v3.0/users/${user_uid}/groups`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          appid: cometData.value.company.cometchat.app_id,
          apikey: cometData.value.company.cometchat.rest_api_key,
        },
      }
    ).then((response) => {
      return response.json();
    });

    return response.data;
  };

  const getGroupMembers = async (group_guid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        apikey: cometData.value.company.cometchat.rest_api_key,
      },
    };

    const response = await fetch(
      `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/groups/${group_guid}/members?perPage=100&page=1`,
      options
    ).then((response) => {
      return response.json();
    });

    return response.data;
  };

  const checkUnreadMessages = async () => {
    if (
      !localStorage.getItem("token") ||
      useAuthenticationStore().user.employee === null
    ) {
      return 0;
    }

    await getCometChatCredentials();
    const user_uid = useAuthenticationStore().user.employee.cometchat_uid;
    const response = await getConversationsList(user_uid);

    const values = response.reduce((total, conversation) => {
      return total + parseInt(conversation.unreadMessageCount);
    }, 0);

    unreadMessageCount.value = values;
    return values;
  };

  // Funcion para ConfirmarLectura (UpdateMensaje)
  const update_datameta_message = async (idmessage) => {
    try {
      const response = await fetch(
        `https://${cometData.value.company.cometchat.app_id}.api-eu.cometchat.io/v3/messages/${idmessage}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            'content-type': 'application/json',
            apikey: cometData.value.company.cometchat.rest_api_key,
          },
          body: JSON.stringify({
            data: {
              metadata: {
                reader: '0', // Pruebas -> valor 0 es no confirmado y 1 es Confirmado
                confirmetAt: 'undefined'
              }
            }
          }),
        }
      );

      const data = await response.json();
      return data;

    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  return {
    // Variables
    cometData,
    conversationList,
    unreadMessageCount,
    // Funciones
    getCometChatCredentials,
    getConversationsList,
    getUserData,
    getGroupData,
    getRegistredUsers,
    loadChatMessages,
    getUserConversation,
    getGroupConversation,
    markUserConversationAsRead,
    sendTextMessage,
    markGroupConversationAsRead,
    getUserGroups,
    getGroupMembers,
    checkUnreadMessages,
    mark_user_conversation_as_delivered,
    update_datameta_message
  };
}
