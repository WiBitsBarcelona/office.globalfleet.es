<template>
  <div
    id="new-chat-modal"
    class="hidden items-center justify-center absolute z-10 top-0 bottom-80 left-0 right-0"
  >
    <div
      class="flex flex-col bg-gray-200 box border border-gray-100 items-center gap-5 w-64 pb-5"
    >
      <div class="flex w-full p-3 items-center justify-between">
        <p class="text-xl">Crear nuevo {{ chatType }}</p>
        <div
          class="cursor-pointer text-black font-bold text-2xl"
          @click="toggleModal()"
        >
          X
        </div>
      </div>
      <div class="flex flex-col gap-5">
        <input
          v-if="chatType === 'grupo'"
          id="new-chat-input"
          type="text"
          :placeholder="'Nombre del grupo...'"
        />
        <select
          name="newChatSelect"
          id="new-chat-select"
          :multiple="chatType === 'grupo' ? true : false"
          class="w-48"
        >
          <option v-for="user in usersList" :value="user.uid">
            {{ user.name }}
          </option>
        </select>
      </div>
      <button class="box p-2 font-bold" @click="createNewChat()">Crear</button>
    </div>
  </div>
  <div class="flex w-full h-14 items-center justify-start">
    <h2 class="text-lg font-medium mr-auto w-1/4">Chat</h2>
    <div class="flex w-full">
      <div class="flex justify-between w-full">
        <input type="text" name="username" id="username" placeholder="Usuari" />
        <div class="flex gap-1">
          <button type="submit" class="box mr-4 p-3" @click="createUser()">
            Accedir
          </button>
          <button class="box w-[2.5rem] text-4xl" @click="toggleMenu()">
            ⋮
          </button>
          <div
            id="new-chat-menu"
            class="hidden flex-col w-60 bg-white absolute z-10 right-6 top-12 border border-gray-100 rounded"
          >
            <div
              class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-gray-200"
              @click="newChat('grupo')"
            >
              <p>Nuevo grupo</p>
            </div>
            <div
              class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-gray-200"
              @click="newChat('chat')"
            >
              <p>Nuevo chat</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="app" class="flex">
    <div id="group-list" class="flex flex-col gap-5 w-1/4">
      <button
        v-for="group in allGroups"
        class="flex gap-3 p-3 box h-24 w-[17rem] cursor-pointer"
        @click="loadGroup(group.conversationWith.guid)"
      >
        <div class="h-full w-14 flex items-center justify-center">
          <img
            :src="
              group.conversationWith.icon
                ? group.conversationWith.icon
                : `https://ui-avatars.com/api/?name=${group.conversationWith.name.charAt(
                    0
                  )}&color=7F9CF5&background=EBF4FF`
            "
            class="w-14 h-14 rounded-full"
          />
        </div>
        <div class="flex flex-col justify-between h-full">
          <b>{{ group.conversationWith.name }}</b>
          <p :id="'last-message-' + group.conversationWith.guid"></p>
        </div>
      </button>
    </div>
    <div class="flex flex-col w-full h-[85vh] justify-between items-center box">
      <div class="flex items-center border border-1 h-20 w-full">
        <div
          id="current-chat"
          class="flex gap-5 items-center justify-center h-14 p-2"
        ></div>
      </div>
      <div
        id="messages"
        class="flex flex-col gap-2 h-5/6 w-full p-5 overflow-y-scroll"
      ></div>
      <div
        class="pt-4 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400 w-full"
      >
        <input
          id="message"
          class="w-5/6 focus:outline-none chat__box__input form-control dark:bg-darkmode-600 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
          placeholder="Escribe el mensaje..."
        />
        <div
          class="flex items-center justify-center w-1/6 text-2xl text-center"
        >
          <button
            id="sendMsgBtn"
            v-on:click="sendMessage()"
            class="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex-none flex items-center justify-center"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CometChat } from "@cometchat-pro/chat";
import { ref } from "vue";

// Credenciales de la Aplicacion de CometChat
const appID = "23195116ca7e245f";
const region = "eu";

// Variables globales
let userData;
let actualGroup;
let allGroups = ref("");
let chatType = ref("");
let chatTag = ref("");
let usersList = ref("");

// Variable de configuración del chat
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

// Iniciamos una conexion con comet chat
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Chat iniciado correctamente");
  },
  (error) => {
    console.log("Error durante el inicio del chat:", error);
  }
);

// Función para crear un usuario en caso de que el nuevo no exista
const createUser = () => {
  const username = document.getElementById("username").value;

  const authKey = "b1809c12cf23a929539a2ac076b68277f7a4df9b";
  const UID = username;
  const name = username;

  const user = new CometChat.User(UID);
  user.setName(name);

  userData = user;

  CometChat.createUser(user, authKey).then(
    (user) => {
      logUserIn(authKey, UID);
    },
    (error) => {
      if (error.code === "ERR_UID_ALREADY_EXISTS") {
        logUserIn(authKey, UID);
      }
    }
  );
};

// Función para loguear un usuario
const logUserIn = (authKey, UID) => {
  CometChat.login(UID, authKey).then(
    (user) => {
      console.log("Login Successful:", { user });
      // getGroupsList(user.uid);
      getConversationsList(user.uid);
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};

// Función para obtener lista de chats
const getConversationsList = (user) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      onBehalfOf: user,
      apikey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    },
  };

  fetch(
    "https://23195116ca7e245f.api-eu.cometchat.io/v3/conversations?perPage=100&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      allGroups.value = response.data;
      response.data.map((chat) => {
        console.log(chat.conversationWith);
        getLastMessage(user, chat.conversationWith.guid);
      });
    })
    .catch((err) => console.error(err));
};

// Obtener el ultimo mensaje de cada conversación
const getLastMessage = (user, GID) => {
  const GUID = GID;
  const limit = 1;
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build();

  messagesRequest.fetchPrevious().then((messages) => {
    messages = messages.filter((message) => message.type === "text");
    const lastMessage = messages[0].data.text;

    if (lastMessage.length > 19) {
      document.getElementById(`last-message-${GUID}`).innerHTML =
        lastMessage.substring(0, 20) + "...";
    } else {
      document.getElementById(`last-message-${GUID}`).innerHTML =
        lastMessage.substring(0, 20);
    }
  });
};

// Función para entrar al grupo y cargar los mensajes del mismo
const loadGroup = (GID) => {
  const user = userData;

  const GUID = GID;
  const password = "";
  const groupType = CometChat.GROUP_TYPE.PUBLIC;

  actualGroup = GID;

  // Llamamos a la función de cargar el historial de mensajes del grupo en cuestión
  getMessageHistory(user, GUID);

  // Llamamos a la función para preparar un listener de recibir y enviar mensajes
  createMsgListener();

  CometChat.joinGroup(GUID, groupType, password).then(
    (group) => {
      console.log("Se ha accedido al grupo:", group);
    },
    (error) => {
      console.log("Error al entrar al grupo:", error);
    }
  );
};

// Función para recibir mensajes
const createMsgListener = () => {
  const listenerID = "GLOBAL_LISTENER_ID";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage) => {
        document.getElementById(
          "messages"
        ).innerHTML += `<div class="message flex flex-col gap-1 rounded-3xl w-fit py-2 px-5 bg-gray-200"><b>${message.sender.name}</b><p>${message.text}</p></div>`;
        console.log("Mensaje de text recivido:", textMessage);
      },
      onMediaMessageRecieved: (mediaMessage) => {
        console.log("Mensaje multimedia recivido:", mediaMessage);
      },
      onCustomMessageRecieved: (customMessage) => {
        console.log("Mensaje personalizado recivido:", customMessage);
      },
    })
  );
};

const getMessageDate = (strTime) => {
  const timestamp = Number(strTime) * 1000;
  const date = new Date(timestamp);

  const curdate = new Date();

  if (
    date.getFullYear() === curdate.getFullYear() &&
    date.getMonth() === curdate.getMonth()
  ) {
    if (date.getDate() === curdate.getDate()) {
      return "Hoy";
    } else if (date.getDate() === curdate.getDate() - 1) {
      return "Ayer";
    } else {
      return (
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
        "/" +
        (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth())
      );
    }
  } else {
    return (
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      "/" +
      (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()) +
      "/" +
      date.getFullYear
    );
  }
};

// Obtener la lista de mensajes de un grupo
const getMessageHistory = (user, GID, lim) => {
  const GUID = GID;
  const limit = lim ? lim : 100;
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build();

  document.getElementById("messages").innerHTML = "";

  let messageDate;
  let missatgeAnterior = "";

  messagesRequest.fetchPrevious().then(
    (messages) => {
      messages = messages.filter((message) => message.type === "text");
      console.log("Mensajes anteriores: ", messages);

      document.getElementById(
        "current-chat"
      ).innerHTML = `<img src="${messages[0].receiver.getIcon()}" class="w-12 h-12" />`;
      if (messages[0].receiver.getIcon() === undefined) {
        document.getElementById(
          "current-chat"
        ).innerHTML = `<img class="rounded-full" src="https://ui-avatars.com/api/?name=${messages[0].receiver.name.charAt(
          0
        )}&color=7F9CF5&background=EBF4FF" class="w-12 h-12" />`;
      }
      document.getElementById(
        "current-chat"
      ).innerHTML += `<h2 class="w-full font-bold text-2xl">${messages[0].receiver.name}</h2>`;
      messages.map((message) => {
        // Comprovem la data
        messageDate = getMessageDate(message.sentAt);

        if (missatgeAnterior !== messageDate) {
          document.getElementById(
            "messages"
          ).innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-300">${messageDate}</p></div>`;
        }
        missatgeAnterior = messageDate;

        if (message.text !== undefined) {
          if (user.name === message.sender.name) {
            document.getElementById(
              "messages"
            ).innerHTML += `<div class="message flex gap-1 justify-end">
                              <div class="flex gap-3 py-2 px-7 bg-[#8DF7F2] rounded-lg max-w-md">
                                <p>
                                  ${message.text}
                                </p>
                                <div class="flex flex-col justify-end items-center">
                                  <p class="text-gray-400">${convertStringToDate(
                                    message.sentAt
                                  )}</p>
                                </div>
                              </div>
                            </div>`;
          } else {
            document.getElementById(
              "messages"
            ).innerHTML += `<div class="message flex gap-3 rounded-lg w-fit py-2 px-5 bg-gray-200 max-w-md">
                              <div class="flex flex-col">
                                <b>${message.sender.name}</b>
                                <p>${message.text}</p>
                              </div>
                              <div class="flex flex-col justify-end items-center">
                                <p class="text-gray-400">${convertStringToDate(
                                  message.sentAt
                                )}</p>
                              </div>
                            </div>`;
          }
        }
      });
    },
    (error) => {
      console.log("Message fetching failed with error:", error);
    }
  );
};

// Función para mandar mensajes
const sendMessage = () => {
  const receiverID = actualGroup;
  const messageText = document.getElementById("message").value;

  document.getElementById("message").value = "";

  const receiverType = CometChat.RECEIVER_TYPE.GROUP;
  const textMessage = CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );

  CometChat.sendMessage(textMessage).then(
    (message) => {
      document.getElementById(
        "messages"
      ).innerHTML += `<div class="message flex gap-1 justify-end">
                              <div class="flex gap-3 py-2 px-7 bg-[#8DF7F2] rounded-lg max-w-md">
                                <p>
                                  ${message.text}
                                </p>
                                <div class="flex flex-col justify-end items-center">
                                  <p class="text-gray-400">${convertStringToDate(
                                    message.sentAt
                                  )}</p>
                                </div>
                              </div>
                            </div>`;
      console.log("Mensaje enviado correctamente:", message);
    },
    (error) => {
      console.log("Error al enviar el mensaje:", error);
    }
  );
};

// Funcion para llenar valores del modal de crear un chat/grupo
const newChat = (tipo) => {
  getUsersList();
  toggleMenu();
  toggleModal();
  chatType.value = tipo;
  if (tipo === "chat") {
    chatTag.value = "usuario";
  } else {
    chatTag.value = "grupo";
  }
};

const createNewChat = () => {
  // En cas de ser un grup
  let newChatName;
  if (chatTag.value === "grupo") {
    newChatName = document.getElementById("new-chat-input").value;
  }

  // Variable on guardarem els usuaris seleccionats
  const select = document.getElementById("new-chat-select");

  var selected = [...select.options]
    .filter((option) => option.selected)
    .map((option) => option.value);

  if (selected.length === 1) {
    newChatName = selected[0] + "_" + userData.name + "_chat";
  }

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      onBehalfOf: userData.uid,
      "content-type": "application/json",
      apikey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    },
    body: JSON.stringify({
      members: { participants: selected },
      type: chatTag.value === "grupo" ? "public" : "private",
      guid: newChatName,
      name: newChatName,
    }),
  };

  fetch("https://23195116ca7e245f.api-eu.cometchat.io/v3/groups", options)
    .then((response) => response.json())
    .then((response) => {
      toggleModal();
      getConversationsList(userData.uid);
    })
    .catch((err) => console.error(err));
};

const getUsersList = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    },
  };

  fetch(
    "https://23195116ca7e245f.api-eu.cometchat.io/v3/users?perPage=100&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let data = response.data;
      data = data.filter((user) => user.name != userData.name);
      usersList.value = data;
    })
    .catch((err) => console.error(err));
};

// Funciones Externas al chat

// Convertir la hora del formato numerico a fecha
const convertStringToDate = (strTime) => {
  const timestamp = Number(strTime) * 1000;
  const date = new Date(timestamp);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  // const ampm = hours >= 12 ? "pm" : "am";
  // hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var timeStr = hours + ":" + minutes;

  return timeStr.toString();
};

// Hacer visible o no el menú de "Nuevo grupo/chat"
const toggleMenu = () => {
  const menu = document.getElementById("new-chat-menu");
  if (menu.classList.contains("flex")) {
    menu.classList.remove("flex");
    menu.classList.add("hidden");
  } else {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
  }
};

const toggleModal = () => {
  const modal = document.getElementById("new-chat-modal");
  if (modal.classList.contains("flex")) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  } else {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
};
</script>
