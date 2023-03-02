<template>
  <!-- Modal nou chat -->
  <div
    id="new-chat-modal"
    class="hidden items-center justify-center absolute z-10 top-0 bottom-80 left-0 right-0"
  >
    <div
      class="flex flex-col bg-gray-200 box border border-gray-100 items-center gap-5 w-64"
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
          class="overflow-y-scroll scrollbar-hidden"
        >
          <option v-for="user in usersList" :value="user.uid">
            {{ user.name }}
          </option>
        </select>
      </div>
      <button class="box p-2 font-bold" @click="createNewChat()">Crear</button>
    </div>
  </div>

  <!-- Barra superior -->
  <div class="flex w-full h-14 items-center justify-start">
    <div class="text-lg font-medium mr-auto w-1/4"></div>
    <div class="flex w-full">
      <div class="flex justify-end w-full gap-4">
        <input type="text" name="username" id="username" placeholder="Usuari" />
        <div class="flex gap-1">
          <button type="submit" class="box mr-4 p-3" @click="createUser()">
            Accedir
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Chat -->
  <div id="app" class="flex gap-6 mt-5">
    <div class="flex flex-col w-2/6 gap-4">
      <!-- Botons menú -->
      <div class="box p-2 grid grid-cols-3 justify-between">
        <button
          v-on:click="toggleActiveButtons"
          id="chat-button"
          class="py-2 w-full bg-[#0096b2] chat-button active text-white rounded-lg"
        >
          Chats
        </button>
        <button
          v-on:click="toggleActiveButtons"
          id="profile-button"
          class="py-2 w-full chat-button"
        >
          Perfil
        </button>
        <button
          v-on:click="toggleMenu()"
          id="new-chat-button"
          class="py-2 w-full chat-button text-xl font-bold"
        >
          ⋮
        </button>
        <div
          id="new-chat-menu"
          class="hidden flex-col w-60 bg-white absolute z-10 right-0 top-14 border border-gray-100 rounded"
        >
          <!-- <div
            class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-gray-200"
            @click="newChat('grupo')"
          >
            <p>Nuevo grupo</p>
          </div> -->
          <div
            class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-[#0096b2] hover:text-white"
            @click="newChat('chat')"
          >
            <p>Nuevo chat</p>
          </div>
        </div>
      </div>

      <!-- Llista de xats -->
      <div
        v-if="currentActive === 'chat-button'"
        id="group-list"
        class="flex flex-col gap-[6px] overflow-y-scroll scrollbar-hidden"
      >
        <button
          v-if="toggleList === false"
          v-for="group in allGroups"
          :key="group.conversationWith.guid"
          class="flex gap-3 p-3 h-16 box cursor-pointer border-b bg-white"
          @click="loadGroup(group.conversationWith.guid)"
        >
          <div
            :id="group.conversationWith.guid + '-image'"
            class="h-full w-14 flex items-center justify-center"
          ></div>
          <div class="flex flex-col justify-between h-full text-left">
            <b :id="group.conversationWith.guid"></b>
            <p :id="'last-message-' + group.conversationWith.guid"></p>
          </div>
        </button>

        <!-- Crear nou chat -->
        <h2
          v-if="toggleList === true"
          class="text-lg font-semibold text-gray-500"
        >
          Nuevo chat
        </h2>
        <button
          v-if="toggleList === true"
          v-for="user in usersList"
          @click="createNewChat(user.uid)"
          class="flex box gap-3 p-3 h-16 cursor-pointer border-b bg-white text-left"
        >
          <div class="h-full w-14 flex items-center justify-center">
            <img
              class="rounded-full w-14 h-14"
              :src="
                user.avatar
                  ? user.avatar
                  : `https://ui-avatars.com/api/?name=${user.name.charAt(
                      0
                    )}&color=7F9CF5&background=EBF4FF`
              "
              alt=""
            />
          </div>
          {{ user.name }}
        </button>
      </div>

      <!-- Perfil de l'usuari -->
      <div
        v-if="currentActive === 'profile-button'"
        class="flex flex-col gap-8"
      >
        <div
          id="profile-image"
          class="flex flex-col box w-full py-10 items-center justify-center gap-3"
        ></div>
        <div
          class="flex flex-col w-full h-80 box px-5 justify-between items-center"
        >
          <div
            class="flex flex-col border-b w-full h-full items-left justify-center gap-2"
          >
            <p class="text-gray-400">Empresa</p>
            <p>GlobalFleet</p>
          </div>
          <div
            class="flex flex-col border-b w-full h-full items-left justify-center gap-2"
          >
            <p class="text-gray-400">Telefono</p>
            <p>654875415</p>
          </div>
          <div
            class="flex flex-col border-b w-full h-full items-left justify-center gap-2"
          >
            <p class="text-gray-400">Correo</p>
            <p>webmaster@globalfleet.com</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full h-[85vh] justify-between items-center box">
      <div id="current-chat-container" class="flex items-center h-20 w-full">
        <div
          id="current-chat"
          class="flex gap-5 items-center justify-center h-14 p-2"
        ></div>
      </div>
      <div
        id="messages"
        class="flex flex-col gap-2 h-5/6 w-full p-5 overflow-y-scroll scrollbar-hidden"
      ></div>
      <div
        class="pt-4 sm:py-4 flex items-center border-t-[6px] border-slate-200/60 dark:border-darkmode-400 w-full"
      >
        <textarea
          id="message"
          class="overflow-y-scroll scrollbar-hidden chat__box__input form-control dark:bg-darkmode-600 h-11 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
          placeholder="Escribe el mensaje..."
        ></textarea>
        <div
          class="flex gap-4 items-center justify-center w-1/6 text-2xl text-center"
        >
          <!-- SVG del clip -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide w-6 h-6"
          >
            <path
              d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
            ></path>
          </svg>

          <!-- Botó d'enviar el missatge -->
          <button
            id="sendMsgBtn"
            v-on:click="sendMessage()"
            class="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex-none flex items-center justify-center"
          >
            <!-- SVG de l'avió de paper -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide w-6 h-6 mt-1 mr-1"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
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
let appId = "23195116ca7e245f";
let apiKey = "a76fca94f28c87446b3de6dd7785355fbc9d8d78";
let authKey = "b1809c12cf23a929539a2ac076b68277f7a4df9b";
const region = "eu";

// Variables globales
let userData;
let actualGroup;
let allGroups = ref("");
let chatType = ref("");
let chatTag = ref("");
let usersList = ref("");
let toggleList = ref(false);
let currentActive = ref("chat-button");

// let appSettings = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(region)
//   .autoEstablishSocketConnection(true)
//   .build();

// CometChat.init(appId, appSettings).then(
//   () => {
//     console.log("App iniciada");

//     // Log-in the user
//     CometChat.getLoggedinUser().then((user) => {
//       if (!user) {
//         // Usuari no loguejat
//         CometChat.login(authKey).then(
//           (user) => {
//             console.log("Login correcte", user);
//             getConversationsList(user.uid);
//           },
//           (error) => {
//             console.log("Login faied", error);
//           }
//         );
//       } else {
//         console.log("Usuari ja loguejat", user);
//         getConversationsList(user.uid);

//         // Invoquem al listener
//         const listenerID = "incoming_messages";

// CometChat.addMessageListener(
//   listenerID,
//   new CometChat.MessageListener({
//     onTextMessageReceived: (textMessage) => {
//       // document.getElementById(
//       //   "messages"
//       // ).innerHTML += `<div class="message flex flex-col gap-1 rounded-3xl w-fit py-2 px-5 bg-gray-200"><b>${message.sender.name}</b><p>${message.text}</p></div>`;
//       console.log("Text message received successfully", textMessage);
//     },
//     onMediaMessageReceived: (mediaMessage) => {
//       console.log("Media message received successfully", mediaMessage);
//     },
//     onCustomMessageReceived: (customMessage) => {
//       console.log(
//         "Custom message received successfully",
//         customMessage
//       );
//     },
//   })
// );
//       }
//     });
//   },
//   (error) => {
//     console.log("Error al iniciar la App", error);
//   }
// );

// Función para crear un usuario en caso de que el nuevo no exista
const createUser = () => {
  const username = document.getElementById("username").value;
  const userInfo = users.filter((user) => username === user.name);

  appId = userInfo[0].appId;
  apiKey = userInfo[0].apiKey;
  authKey = userInfo[0].authKey;

  // Variable de configuración del chat
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();

  // Iniciamos una conexion con comet chat
  CometChat.init(appId, appSetting).then(
    () => {
      console.log("Chat iniciado correctamente");

      let listenerID = "incoming_messages";

      CometChat.addMessageListener(
        listenerID,
        new CometChat.MessageListener({
          onTextMessageReceived: (textMessage) => {
            console.log("Text message received successfully", textMessage);
            if (textMessage.receiverId === actualGroup) {
              document.getElementById(
                "messages"
              ).innerHTML += `<div class="message flex flex-col gap-1 rounded-3xl w-fit py-2 px-5 bg-gray-200"><b>${textMessage.sender.name}</b><p>${textMessage.text}</p></div>`;
            }
          },
          onMediaMessageReceived: (mediaMessage) => {
            console.log("Media message received successfully", mediaMessage);
          },
          onCustomMessageReceived: (customMessage) => {
            console.log("Custom message received successfully", customMessage);
          },
        })
      );
    },
    (error) => {
      console.log("Error durante el inicio del chat:", error);
    }
  );

  const UID = userInfo[0].uid;
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
      getConversationsList(user.uid);
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};

const toggleActiveButtons = (e) => {
  const elementId = e.target.getAttribute("id");
  // Posem el tag de "chats" en Active
  const activeElements = document.getElementsByClassName("active chat-button");
  console.log(activeElements);

  // Canviem els estils del botó que estigui en actiu
  for (let i = 0; i < activeElements.length; i++) {
    activeElements[i].classList = "py-2 w-full chat-button";
  }

  // Posem en actiu el nou botó seleccionat
  document
    .getElementById(elementId)
    .classList.add("bg-[#0096b2]", "active", "rounded", "text-white");

  // Segons el botó presionat, farem una cosa o una altre
  if (elementId === "chat-button") {
    toggleList.value = false;
    getConversationsList(userData.uid);
    currentActive.value = "chat-button";
  } else if (elementId === "profile-button") {
    loadProfile(userData.uid);
    currentActive.value = "profile-button";
  }
};

// Función para obtener lista de chats
const getConversationsList = (user) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      onBehalfOf: user,
      apikey: apiKey,
    },
  };

  fetch(
    `https://${appId}.api-${region}.cometchat.io/v3/conversations?perPage=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.data);
      allGroups.value = response.data;
      response.data.map((chat) => {
        getGroupMembers(
          chat.conversationWith.guid,
          chat.conversationWith.type,
          chat.conversationWith.name,
          false
        );
        getLastMessage(user, chat.conversationWith.guid);
      });
    })
    .catch((err) => console.error(err));
};

// Obtener el ultimo mensaje de cada conversación
const getLastMessage = (user, GID) => {
  const GUID = GID;
  const limit = 1;
  let lastMessage = "";

  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build();

  messagesRequest.fetchPrevious().then((messages) => {
    messages = messages.filter((message) => message.type === "text");
    if (messages.length != 0) {
      lastMessage = messages[0].data.text;
    }

    if (lastMessage.length > 19) {
      document.getElementById(`last-message-${GUID}`).innerHTML =
        lastMessage.substring(0, 20) + "...";
    } else {
      document.getElementById(`last-message-${GUID}`).innerHTML =
        lastMessage.substring(0, 20);
    }
  });
};

const lastMessageDay = (GID, message) => {
  const GUID = GID;
  const limit = 1;
  let lastMessage = "";

  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build();

  messagesRequest.fetchPrevious().then((messages) => {
    messages = messages.filter((message) => message.type === "text");
    if (messages.length != 0) {
      lastMessage = messages[0].sentAt;
    }

    console.log(lastMessage, message);

    // Ultim missatge
    const timestamp1 = Number(lastMessage) * 1000;
    const date1 = new Date(timestamp1);

    // Missatge enviat
    const timestamp2 = Number(message) * 1000;
    const date2 = new Date(timestamp2);

    // Comprovem si són del mateix any
    if (date1.getFullYear() === date2.getFullYear()) {
      console.log("Mateix any");
      // Comprovem si son del mateix mes
      if (date1.getMonth() === date2.getMonth()) {
        console.log("Mateix mes");
        // Comprovem si son del mateix dia
        if (date1.getDate() !== date2.getDate()) {
          console.log("Dia diferent");
          document.getElementById(
            "messages"
          ).innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">Hoy</p></div>`;
        }
      } else {
        document.getElementById(
          "messages"
        ).innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-300">Hoy</p></div>`;
      }
    } else {
      document.getElementById(
        "messages"
      ).innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-300">Hoy</p></div>`;
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

  const chatName = document.getElementById(GID).textContent;

  document.getElementById("current-chat-container").className =
    "flex items-center h-20 w-full border-b";

  // Llamamos a la función de cargar el historial de mensajes del grupo en cuestión
  getMessageHistory(user, GUID, chatName);

  // Llamamos a la función para preparar un listener de recibir y enviar mensajes

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
const createMsgListener = async () => {
  const listenerID = "incoming_messages";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage) => {
        document.getElementById(
          "messages"
        ).innerHTML += `<div class="message flex flex-col gap-1 rounded-3xl w-fit py-2 px-5 bg-gray-200"><b>${message.sender.name}</b><p>${message.text}</p></div>`;
        console.log("Text message received successfully", textMessage);
      },
      onMediaMessageReceived: (mediaMessage) => {
        console.log("Media message received successfully", mediaMessage);
      },
      onCustomMessageReceived: (customMessage) => {
        console.log("Custom message received successfully", customMessage);
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
      date.getFullYear()
    );
  }
};

// Obtener la lista de mensajes de un grupo
const getMessageHistory = (user, GID, chatName) => {
  const GUID = GID;
  const limit = 100;
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

      // En cas d'haver algun missatge
      if (messages.length != 0) {
        // Primer colocarem l'icona del xat
        document.getElementById(
          "current-chat"
        ).innerHTML = `<img src="${messages[0].receiver.getIcon()}" class="w-14 h-14" />`;
        if (messages[0].receiver.getIcon() === undefined) {
          document.getElementById(
            "current-chat"
          ).innerHTML = `<img class="rounded-full w-14 h-14" src="https://ui-avatars.com/api/?name=${chatName.charAt(
            0
          )}&color=7F9CF5&background=EBF4FF" />`;
        }

        // Imprimim el nom del xat seleccionat
        document.getElementById(
          "current-chat"
        ).innerHTML += `<h2 id="chat-name-${messages[0].receiver.guid}" class="w-full font-bold text-2xl">${chatName}</h2>`;

        // Recorrem els missatges
        messages.map((message) => {
          // Comprovem la data
          messageDate = getMessageDate(message.sentAt);

          // En cas de ser la data de dies diferents, la mostrarem al xat
          if (missatgeAnterior !== messageDate) {
            document.getElementById(
              "messages"
            ).innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${messageDate}</p></div>`;
          }
          missatgeAnterior = messageDate;

          // Comprovem que hi hagi text al missatge enviat
          if (message.text !== undefined) {
            // En cas d'haver enviat nosaltres el missatge, el mostrarem amb uns estils
            if (user.name === message.sender.name) {
              document.getElementById(
                "messages"
              ).innerHTML += `<div class="message flex gap-1 justify-end">
                              <div class="flex gap-3 py-2 px-7 bg-[#0096b2] text-white rounded-lg max-w-md">
                                <p>
                                  ${message.text}
                                </p>
                                <div class="flex flex-col justify-end items-center">
                                  <p class="text-gray-300 text-xs">${convertStringToDate(
                                    message.sentAt
                                  )}</p>
                                </div>
                              </div>
                            </div>`;
              // En cas d'haver enviat el missatge una persona diferent a nosaltres, mostrarem el missatge amb uns altres estils
            } else {
              document.getElementById(
                "messages"
              ).innerHTML += `<div class="message flex gap-3 rounded-lg w-fit py-2 px-5 bg-gray-200 max-w-md">
                              <div class="flex flex-col">
                                <b>${message.sender.name}</b>
                                <p>${message.text}</p>
                              </div>
                              <div class="flex flex-col justify-end items-center">
                                <p class="text-gray-400 text-xs">${convertStringToDate(
                                  message.sentAt
                                )}</p>
                              </div>
                            </div>`;
            }
          }
        });
        // En cas de no haver cap missatge encara a la conversa
      } else {
        getSingleChatData(GUID);
      }
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
      // Recullim l'ultim missatge per comprovar l'hora
      lastMessageDay(receiverID, message.sentAt);

      document.getElementById(
        "messages"
      ).innerHTML += `<div class="message flex gap-1 justify-end">
                              <div class="flex gap-3 py-2 px-7 bg-[#0096b2] text-white rounded-lg max-w-md">
                                <p>
                                  ${message.text}
                                </p>
                                <div class="flex flex-col justify-end items-center">
                                  <p class="text-gray-300 text-xs">${convertStringToDate(
                                    message.sentAt
                                  )}</p>
                                </div>
                              </div>
                            </div>`;

      console.log("Mensaje enviado correctamente:", message);

      getLastMessage(userData.uid, actualGroup);
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
  // toggleModal();
  chatType.value = tipo;
  if (tipo === "chat") {
    chatTag.value = "usuario";
  } else {
    chatTag.value = "grupo";
  }
};

// Crear un nuevo chat o grupo
const createNewChat = (otherUserUID) => {
  // En cas de ser un grup
  let newChatName;
  // Definim el nom del xat
  newChatName = otherUserUID + "_" + userData.uid + "_chat";

  // Definim que és un chat
  chatTag.value = "private";

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      onBehalfOf: userData.uid,
      "content-type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      members: { participants: [otherUserUID] },
      type: chatTag.value === "grupo" ? "public" : "private",
      guid: newChatName,
      name: newChatName,
    }),
  };

  fetch(`https://${appId}.api-${region}.cometchat.io/v3/groups`, options)
    .then((response) => response.json())
    .then((response) => {
      toggleList.value = false;
      actualGroup = newChatName;
      getConversationsList(userData.uid);
      getSingleChatData(newChatName);
    })
    .catch((err) => console.error(err));
};

// Obtener lista de usuarios registrados
const getUsersList = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  await fetch(
    `https://${appId}.api-${region}.cometchat.io/v3/users?perPage=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then(async (response) => {
      const data = response.data;
      // Llista amb tots els usuaris de l'App
      const otherUsers = data.filter((user) => user.name != userData.name);
      const myUser = data.filter((user) => user.uid === userData.uid);

      // Actualitzem la llista amb els xats que no tenim oberts
      const ConversationList = await getConversationList();

      let excludedUsers = [];

      otherUsers.forEach((otherUser) => {
        ConversationList.data.forEach((conversation) => {
          const conversationId = conversation.conversationId;
          const userUid = otherUser.uid;
          if (conversationId.includes(userUid)) {
            console.log("Inclueix", conversation.conversationId);
            excludedUsers.push(userUid);
          }
        });
      });

      toggleList.value = true;
      usersList.value = otherUsers;
    })
    .catch((err) => console.error(err));
};

// Function para obtener lista de conversaciones del usuario
const getConversationList = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      onBehalfOf: userData.uid,
      apikey: apiKey,
    },
  };

  const data = await fetch(
    `https://${appId}.api-${region}.cometchat.io/v3/conversations?perPage=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => console.error(err));

  // console.log("List", data);
  return data;
};

// Funcion para obtener lista de miembros de un grupo
const getGroupMembers = (guid, type, name, currentChatName) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  // Petició a la API per obtenir la llista de membres d'un grup
  fetch(
    `https://${appId}.api-${region}.cometchat.io/v3/groups/${guid}/members?perPage=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // Variable per definir quin nom e icona apareixeràn a la llista de xats
      let otherUser;
      let otherUserAvatar;
      response.data.map((usr) => {
        // En cas de ser un grup
        if (type === "public") {
          // Definim l'icona del grup
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              apikey: apiKey,
            },
          };

          // Petició a la API per obtenir les dades d'un grup en concret
          fetch(
            `https://${appId}.api-${region}.cometchat.io/v3/groups/${guid}`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              // En cas de tenir icona definida, la mostrarem
              if (response.data.icon) {
                otherUserAvatar = response.data.icon;
                const imgTemplate = `
                      <img
                            src="${otherUserAvatar}"
                            class="w-14 h-14 rounded-full"
                          />
                      `;

                document.getElementById(`${guid}-image`).innerHTML =
                  imgTemplate;
                // En cas de no tenir una icona definida, mostrarem la inicial del nom del grup
              } else {
                const imgTemplate = `
                      <img
                            src="https://ui-avatars.com/api/?name=${response.data.name.charAt(
                              0
                            )}&color=7F9CF5&background=EBF4FF"
                            class="w-14 h-14 rounded-full"
                          />
                      `;

                document.getElementById(`${guid}-image`).innerHTML =
                  imgTemplate;
              }
            })
            .catch((err) => console.error(err));

          // Definim el nom del grup
          if (name.includes("_")) {
            otherUser = name.replaceAll("_", " ");
          } else {
            otherUser = name;
          }
          // En cas de ser un chat
        } else {
          if (usr.name != userData.name) {
            const options = {
              method: "GET",
              headers: {
                accept: "application/json",
                apikey: apiKey,
              },
            };

            // Petició a la API per obtenir les dades d'un usuari en concret
            fetch(
              `https://${appId}.api-${region}.cometchat.io/v3/users/${usr.uid}`,
              options
            )
              .then((response) => response.json())
              .then((response) => {
                // En cas de tenir icona definida, la mostrarem
                if (response.data.avatar) {
                  otherUserAvatar = response.data.avatar;
                  const imgTemplate = `
                      <img
                            src="${otherUserAvatar}"
                            class="w-14 h-14 rounded-full"
                          />
                      `;

                  document.getElementById(`${guid}-image`).innerHTML =
                    imgTemplate;
                  // En cas de no tenir una icona definida, mostrarem la inicial del nom del usuari
                } else {
                  const imgTemplate = `
                      <img
                            src="https://ui-avatars.com/api/?name=${usr.name.charAt(
                              0
                            )}&color=7F9CF5&background=EBF4FF"
                            class="w-14 h-14 rounded-full"
                          />
                      `;

                  document.getElementById(`${guid}-image`).innerHTML =
                    imgTemplate;
                }
              })
              .catch((err) => console.error(err));

            // Definim el nom que apareixerà a la llista de xats
            otherUser = usr.name;
          }
        }
      });
      // Imprimim el nom de l'usuari
      document.getElementById(guid).innerHTML = otherUser;
    })
    .catch((err) => console.error(err));
};

// Funcion para obtener
const getSingleChatData = (guid) => {
  // Obtenim el xat i mirem si és un grup o un xat entre dues persones
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  fetch(
    `https://${appId}.api-${region}.cometchat.io/v3/groups/${guid}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // En cas de ser un grup
      if (response.data.type === "public") {
        let iconTemplate;
        let nameTemplate;
        let otherUser;
        // Mirem si te la icona definida
        if (response.data.icon) {
          iconTemplate = `
              <img class="rounded-full w-14 h-14" src="${response.data.icon}">
            `;
        } else {
          iconTemplate = `
            <img class="rounded-full w-14 h-14" src="https://ui-avatars.com/api/?name=${response.data.name.charAt(
              0
            )}&color=7F9CF5&background=EBF4FF" />
            `;
        }

        // Definim el nom
        if (response.data.name.includes("_")) {
          otherUser = response.data.name.replaceAll("_", " ");
        } else {
          otherUser = response.data.name;
        }

        nameTemplate = `
          <h2 id="chat-name-${response.data.guid}" class="w-full font-bold text-2xl">${otherUser}</h2>
        `;

        // Imprimim les dades
        document.getElementById("current-chat").innerHTML =
          iconTemplate + nameTemplate;

        // En cas de ser un xat
      } else {
        let iconTemplate;
        let nameTemplate;

        // Obtenim els membres del xat
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            apikey: apiKey,
          },
        };

        fetch(
          `https://${appId}.api-${region}.cometchat.io/v3/groups/${guid}/members?perPage=100&page=1`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            // Obtenim la informació de l'altre membre
            const otherUser = response.data.filter(
              (user) => user.name != userData.name
            );

            // En cas de tenir una icona definida
            if (otherUser[0].avatar) {
              iconTemplate = `
              <img class="rounded-full w-14 h-14" src="${otherUser[0].avatar}">
            `;
            } else {
              iconTemplate = `
            <img class="rounded-full w-14 h-14" src="https://ui-avatars.com/api/?name=${otherUser[0].name.charAt(
              0
            )}&color=7F9CF5&background=EBF4FF" />
            `;
            }

            // Definim el nom
            nameTemplate = `
              <h2 id="chat-name-${response.data.guid}" class="w-full font-bold text-2xl">${otherUser[0].name}</h2>
            `;

            // Imprimim les dades
            document.getElementById("current-chat").innerHTML =
              iconTemplate + nameTemplate;

            document.getElementById("current-chat-container").className =
              "flex items-center h-20 w-full border-b";
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));

  // En cas de no tenir una icona definida, mostrem la inicial del seu nom
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

const loadProfile = (uid) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  let iconTemplate = "";

  // Petició a la API per obtenir les dades d'un usuari en concret
  fetch(`https://${appId}.api-${region}.cometchat.io/v3/users/${uid}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.data.avatar) {
        iconTemplate = `
              <img class="rounded-full w-20 h-20" src="${response.data.avatar}">
            `;
      } else {
        iconTemplate = `
            <img class="rounded-full w-20 h-20" src="https://ui-avatars.com/api/?name=${response.data.name.charAt(
              0
            )}&color=7F9CF5&background=EBF4FF" />
            `;
      }

      const nameTemplate = `
        <p class="font-semibold text-lg">
          ${userData.name}
        </p>
      `;

      document.getElementById("profile-image").innerHTML =
        iconTemplate + nameTemplate;
    })
    .catch((err) => console.error(err));
};

const users = [
  {
    name: "Alex",
    uid: "admin_1_alex",
    appId: "23195116ca7e245f",
    apiKey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    authKey: "b1809c12cf23a929539a2ac076b68277f7a4df9b",
  },
  {
    name: "Jordi",
    uid: "g_1_jordi",
    appId: "23195116ca7e245f",
    apiKey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    authKey: "b1809c12cf23a929539a2ac076b68277f7a4df9b",
  },
  {
    name: "Marc",
    uid: "jc_1_marc",
    appId: "23195116ca7e245f",
    apiKey: "a76fca94f28c87446b3de6dd7785355fbc9d8d78",
    authKey: "b1809c12cf23a929539a2ac076b68277f7a4df9b",
  },
  {
    name: "David Romans",
    uid: "superhero2",
    appId: "23376343f2ad7555",
    apiKey: "8b721f4d8ce4d4d4aa49ac790d2240aa4ef93cc5",
    authKey: "f272f99207e0e5a186a8c5134bbd96354b64bc69",
  },
];
</script>
