<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
  />
  <!-- Chat -->
  <div id="app" class="flex gap-6 mt-5">
    <div class="flex flex-col w-1/3 gap-4">
      <!-- Botons menú -->
      <div class="box p-2 grid grid-cols-3 justify-between">
        <button
          id="chat-button"
          class="flex items-center justify-center gap-1 py-2 w-full bg-[#0096b2] chat-button active text-white rounded-lg"
          @click="LoadChatsList"
        >
          <span class="material-symbols-outlined"> chat </span>
          Chats
        </button>
        <button
          id="profile-button"
          class="flex items-center justify-center gap-1 py-2 w-full chat-button"
        >
          <span class="material-symbols-outlined"> person </span>
          Perfil
        </button>
        <button
          id="new-chat-button"
          class="flex items-center justify-center gap-1 py-2 w-full chat-button"
          @click="toggleNewChat"
        >
          <span class="material-symbols-outlined"> add_comment </span>
          Nuevo
        </button>
        <div
          id="new-chat-menu"
          class="hidden flex-col w-60 bg-white absolute z-10 right-0 top-14 border border-gray-100 rounded"
        >
          <div
            class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-[#0096b2] hover:text-white"
          >
            <p>Nuevo chat</p>
          </div>
        </div>
      </div>

      <!-- Llista de xats -->
      <div
        id="group-list"
        class="flex flex-col gap-[6px] h-[76vh] overflow-y-scroll scrollbar-hidden"
      >
        <!-- Per cada xat farem un botó -->
        <button
          v-if="!inNewChat"
          v-for="conversation in conversationList"
          :key="conversation.conversationWith"
          v-on:click="
            buildChat(
              conversation.conversationId,
              conversation.conversationType,
              conversation.conversationWith.uid
                ? conversation.conversationWith.uid
                : conversation.conversationWith.guid
            )
          "
          class="flex gap-3 p-3 pl-2 h-16 box cursor-pointer border-b bg-white items-center"
        >
          <!-- En cas de ser un xat amb un usuari -->
          <img
            v-if="conversation.conversationType === 'user'"
            class="w-14 h-14 rounded-full"
            :src="
              conversation.conversationWith.avatar
                ? conversation.conversationWith.avatar
                : `https://ui-avatars.com/api/?name=${conversation.conversationWith.name.charAt(
                    0
                  )}&color=7F9CF5&background=EBF4FF`
            "
          />
          <!-- En cas de ser un grup -->
          <img
            v-if="conversation.conversationType === 'group'"
            class="w-14 h-14 rounded-full"
            :src="
              conversation.conversationWith.icon
                ? conversation.conversationWith.icon
                : `https://ui-avatars.com/api/?name=${conversation.conversationWith.name.charAt(
                    0
                  )}&color=7F9CF5&background=EBF4FF`
            "
          />

          <div
            class="flex flex-col justify-between h-full w-full text-left gap-1"
          >
            <div class="flex w-full justify-between">
              <h2 class="font-semibold">
                {{ conversation.conversationWith.name }}
              </h2>
              <div
                v-if="
                  conversation.unreadMessageCount != 0 &&
                  conversation.unreadMessageCount < 100
                "
                class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-green-500 text-white rounded-full"
              >
                <p class="w-full text-center">
                  {{ conversation.unreadMessageCount }}
                </p>
              </div>
              <div
                v-else-if="
                  conversation.unreadMessageCount != 0 &&
                  conversation.unreadMessageCount > 100
                "
                class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-green-500 text-white rounded-full"
              >
                <p class="w-full text-center">+99</p>
              </div>
            </div>
            <p :id="'last-' + conversation.conversationId">
              {{
                conversation.lastMessage.data.text.length < 35
                  ? conversation.lastMessage.data.text
                  : conversation.lastMessage.data.text.substring(0, 35) + "..."
              }}
            </p>
          </div>
        </button>

        <!-- Per cada nou possible xat, farem un botó també -->
        <button
          v-if="inNewChat"
          v-for="chatList in newChatsList"
          v-on:click="
            buildNewChat(
              chatList.uid ? chatList.uid : chatList.guid,
              chatList.name
            )
          "
          class="flex gap-3 p-3 pl-2 h-16 box cursor-pointer border-b bg-white items-center"
        >
          <!-- En cas de ser un xat amb un usuari -->
          <img
            v-if="chatList.uid"
            class="w-14 h-14 rounded-full"
            :src="
              chatList.avatar
                ? chatList.avatar
                : `https://ui-avatars.com/api/?name=${chatList.name.charAt(
                    0
                  )}&color=7F9CF5&background=EBF4FF`
            "
          />
          <!-- En cas de ser un grup -->
          <img
            v-if="chatList.guid"
            class="w-14 h-14 rounded-full"
            :src="
              chatList.icon
                ? chatList.icon
                : `https://ui-avatars.com/api/?name=${chatList.name.charAt(
                    0
                  )}&color=7F9CF5&background=EBF4FF`
            "
          />
          <div
            class="flex flex-col justify-between h-full w-full text-left gap-1"
          >
            <div class="flex w-full justify-between">
              <h2 class="font-semibold">
                {{ chatList.name }}
              </h2>
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- Cuadre de xat -->
    <div
      v-if="inChat"
      class="flex flex-col w-full h-[85vh] justify-between items-center box overflow-hidden"
    >
      <div
        id="current-chat-container"
        class="flex items-center h-20 w-full gap-3 px-4"
      >
        <img
          v-if="selectedChat.icon || selectedChat.avatar"
          :src="selectedChat.icon ? selectedChat.icon : selectedChat.avatar"
          class="rounded-full w-14 h-14"
        />
        <img
          v-else
          :src="`https://ui-avatars.com/api/?name=${selectedChat.name.charAt(
            0
          )}&color=7F9CF5&background=EBF4FF`"
          class="rounded-full w-14 h-14"
        />
        <h2
          id="chat-header"
          class="w-full font-bold text-2xl"
          :type="selectedChat.uid ? 'user' : 'group'"
          :chatId="selectedChat.uid ? selectedChat.uid : selectedChat.guid"
        >
          {{ selectedChat.name }}
        </h2>
      </div>

      <div
        id="chat"
        class="flex flex-col gap-2 h-5/6 w-full p-5 overflow-y-scroll scrollbar-hidden"
      ></div>

      <!-- Textarea per escriure i botons per enviar el missatge -->
      <form
        id="send-message-form"
        @submit.prevent=""
        action="#"
        class="pt-4 sm:py-4 flex items-center border-t-[6px] border-slate-200/60 dark:border-darkmode-400 w-full"
      >
        <textarea
          v-on:keyup.enter="sendTextMessage"
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
            type="submit"
            v-on:click="sendTextMessage"
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
      </form>
    </div>
    <div
      v-else
      class="flex flex-col w-full h-[85vh] justify-between items-center box overflow-hidden"
    ></div>
  </div>
</template>

<script setup>
import { CometChat } from "@cometchat-pro/chat";
import { ref } from "vue";
import { useAuthenticationStore } from "@/stores/auth/authentications";

let appID = "2343812648126b59";
let region = "eu";
let authKey = "65aba0afa100469706ce7d0f9d9febba02a4500d";
let apiKey = "8b55ca7afaa426c86acf3847c9060c1de8e66d3d";

let userInfo;
let conversationList = ref("");
let inChat = ref(false);
let inNewChat = ref(false);
let selectedChat = ref("");
let newChatsList = ref("");

// Variable amb la configuració de la App
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();

// Inicialitzem la App
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");

    // Afegirem un listener dels missatges
    const listenerID = "INCOMING_MESSAGES_LISTENER";

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: async (textMessage) => {
          // Quan arribi un nou missatge
          console.log("Text message received successfully", textMessage);

          let lastMessageDate = "";
          let currentMessageDate;

          // Tornem a carregar tots els xats
          LoadChatsList();

          // Comprobem la data del missatge
          currentMessageDate = getMessageDate(textMessage.sentAt);

          // Comprobem l'ultim missatge d'aquesta mateixa conversació
          lastMessageDate = await loadChatMessages(textMessage.conversationId);

          console.log(lastMessageDate)

          if (lastMessageDate.data.length > 1) {
            lastMessageDate = getMessageDate(
              lastMessageDate.data[lastMessageDate.data.length - 2].sentAt
            );
          } else {
            lastMessageDate = 'Hoy';
          }

          if (lastMessageDate !== currentMessageDate) {
            chat.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
          }

          if (
            textMessage.receiverId ===
            document.getElementById("chat-header").getAttribute("chatId")
          ) {
            if (textMessage.sender.uid === userInfo.uid) {
              document.getElementById("chat").innerHTML += `
                        <div class="missatgePropi" style="display: flex; width: 100%; justify-content: flex-end;">
                            <div class="flex gap-3 py-2 px-3 bg-[#0096b2] text-white rounded-lg max-w-md">
                            <p style="margin: 0px;">${textMessage.text}</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; color: white; margin: 0px; heigh: 100%">
                                ${convertStringToDate(textMessage.sentAt)}
                              </p>
                            </div>
                          </div>
                        </div>`;
            } else {
              document.getElementById("chat").innerHTML += `
                        <div class="missatgePropi" style="display: flex; width: 100%; justify-content: flex-end;">
                          <div class="flex gap-3 rounded-lg w-fit py-2 px-5 bg-gray-200 max-w-md">
                            <p style="margin: 0px;">${textMessage.text}</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; margin: 0px; heigh: 100%">
                                ${convertStringToDate(textMessage.sentAt)}
                              </p>
                            </div>
                          </div>
                        </div>`;
            }
            const messageBody = document.getElementById("chat");
            messageBody.scrollTop =
              messageBody.scrollHeight - messageBody.clientHeight;
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
    console.log("Initialization failed with error:", error);
  }
);

// Iniciem la sessió al xat
const UID = "alex";
const name = "Alex";

const user = new CometChat.User(UID);
user.setName(name);

userInfo = user;

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

// Funció per carregar/reiniciar els xats
const LoadChatsList = async () => {
  const chatButton = document.getElementById("chat-button");
  const profileButton = document.getElementById("profile-button");
  const newChatButton = document.getElementById("new-chat-button");

  // En cas de estar mirant la llista de xats nous
  if (inNewChat.value) {
    inNewChat.value = false;
    // Comprobem quin botó està actiu
    if (newChatButton.classList.contains("bg-[#0096b2]"))
      newChatButton.classList.remove(
        "bg-[#0096b2]",
        "text-white",
        "rounded-lg"
      );
    else if (profileButton.classList.contains("bg-[#0096b2]"))
      profileButton.classList.remove(
        "bg-[#0096b2]",
        "text-white",
        "rounded-lg"
      );

    if (!chatButton.classList.contains("bg-[#0096b2]"))
      chatButton.classList.add("bg-[#0096b2]", "text-white", "rounded-lg");
  }

  // Carregarem la llista de xats
  const response = await getConversationsList();
  conversationList.value = response.data;
  // console.log(response.data)
};

// Funció per loguejar un usuari
const logUserIn = async (authKey, UID) => {
  const response = await CometChat.login(UID, authKey).then(
    async () => {
      return true;
    },
    (error) => {
      console.log("Login failed with exception:", { error });
      return false;
    }
  );

  return response;
};

// Funció per llistar tots els xats
const getConversationsList = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      onBehalfOf: userInfo.uid,
      apikey: apiKey,
    },
  };

  const response = await fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/conversations`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  return response;
};

// Funció per montar la pantalla del xat
const buildChat = async (ConversationId, ChatType, ChatId) => {
  let currentMessageDate;
  let lastMessageDate = "";

  if (ChatType === "user") {
    const response = await getUserData(ChatId);
    selectedChat.value = response.data;
    inChat.value = true;
  } else {
    const response = await getGroupData(ChatId);
    selectedChat.value = response.data;
    inChat.value = true;
  }

  // Recullim els missatges del xat
  const conversations = await loadChatMessages(ConversationId);

  const chat = document.getElementById("chat");

  // Revisem cada missatge qui l'ha enviat per saber quins estils aplicar-li
  conversations.data.map((conversation) => {
    // Marquem el missatge com a llegit
    if (conversation.sender != userInfo.uid) {
      console.log(conversation);
      if (conversation.receiverType === "user")
        markUserConversationAsRead(conversation.sender);
      else markGroupConversationAsRead(conversation.receiver);

      LoadChatsList();
    }

    // Comprobem la data del missatge
    currentMessageDate = getMessageDate(conversation.sentAt);

    if (lastMessageDate !== currentMessageDate) {
      chat.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
    }

    lastMessageDate = currentMessageDate;

    if (userInfo.uid === conversation.sender) {
      chat.innerHTML += `<div class="missatgePropi" style="display: flex; width: 100%; justify-content: flex-end;">
                            <div class="flex gap-3 py-2 px-3 bg-[#0096b2] text-white rounded-lg max-w-md">
                            <p style="margin: 0px;">${
                              conversation.data.text
                            }</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; color: white; margin: 0px; heigh: 100%">
                                ${convertStringToDate(conversation.sentAt)}
                              </p>
                            </div>
                          </div>
                         </div>`;
    } else {
      chat.innerHTML += `<div class="missatgeEntrant" style="display: flex; width: 100%; justify-content: flex-start;">
                            <div class="flex gap-3 rounded-lg w-fit py-2 px-3 bg-gray-200 max-w-md">
                            <p style="margin: 0px;">${
                              conversation.data.text
                            }</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; margin: 0px; heigh: 100%">
                                ${convertStringToDate(conversation.sentAt)}
                              </p>
                            </div>
                          </div>
                        </div>`;
    }
  });

  const messageBody = document.getElementById("chat");
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
};

// Funció per carregar un nou xat
const buildNewChat = async (id, nom) => {
  let lastMessageDate = "";
  let currentMessageDate;
  
  // Obtenim les dades de l'usuari en cuestió
  const response = await getUserData(id);
  selectedChat.value = response.data;
  
  if (!inChat.value) 
  inChat.value = true;
  
  // Revisem que no tinguem alguna conversa amb aquest usuari
  const conversation = await getSingleConversation(id);
  const hasConversation = conversation.error ? false : true;

  // Netejem el xat
  const chat = document.getElementById("chat");
  chat.innerHTML = '';
  
  LoadChatsList();

  // En cas de tenir alguna conversa la carregarem
  if (hasConversation) {
    const messages = await loadChatMessages(conversation.data.conversationId);

    messages.data.map((message) => {
      if (message.sender != userInfo.uid) {
        if (message.receiverType === "user")
          markUserConversationAsRead(message.sender);
        else markGroupConversationAsRead(message.receiver);

      }

      // Comprobem la data del missatge
      currentMessageDate = getMessageDate(message.sentAt);

      if (lastMessageDate !== currentMessageDate) {
        chat.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
      }

      lastMessageDate = currentMessageDate;

      if (userInfo.uid === message.sender) {
        chat.innerHTML += `<div class="missatgePropi" style="display: flex; width: 100%; justify-content: flex-end;">
                            <div class="flex gap-3 py-2 px-3 bg-[#0096b2] text-white rounded-lg max-w-md">
                            <p style="margin: 0px;">${message.data.text}</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; color: white; margin: 0px; heigh: 100%">
                                ${convertStringToDate(message.sentAt)}
                              </p>
                            </div>
                          </div>
                         </div>`;
      } else {
        chat.innerHTML += `<div class="missatgeEntrant" style="display: flex; width: 100%; justify-content: flex-start;">
                            <div class="flex gap-3 rounded-lg w-fit py-2 px-3 bg-gray-200 max-w-md">
                            <p style="margin: 0px;">${message.data.text}</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; margin: 0px; heigh: 100%">
                                ${convertStringToDate(message.sentAt)}
                              </p>
                            </div>
                          </div>
                        </div>`;
      }

      const messageBody = document.getElementById("chat");
      messageBody.scrollTop =
        messageBody.scrollHeight - messageBody.clientHeight;
    });
  }
};

// Funció per a enviar missatges
const sendTextMessage = () => {
  const mensaje = document.getElementById("message");
  const header = document.getElementById("chat-header");

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      onBehalfOf: userInfo.uid,
      "content-type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      category: "message",
      type: "text",
      data: { text: mensaje.value },
      receiver: header.getAttribute("chatId"),
      receiverType: header.getAttribute("type"),
    }),
  };

  fetch(`https://${appID}.api-${region}.cometchat.io/v3/messages`, options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  // Netejem el text
  mensaje.value = "";
};

// Funció per rebre una sola conversació
const getSingleConversation = async (otherUser) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      onBehalfOf: userInfo.uid,
      apikey: apiKey,
    },
  };

  const response = await fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/users/${otherUser}/conversation`,
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

// Funció per llistar els missatges del xat seleccionat
const loadChatMessages = async (ConversationId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  const response = await fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/messages?limit=100&conversationId=${ConversationId}`,
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
const getUserData = async (uid) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  const response = await fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/users/${uid}`,
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
      apikey: apiKey,
    },
  };

  const response = fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/groups/${guid}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  return response;
};

// Funció per a obtenir una llista dels usuaris registrats a la app
const getRegistredUsers = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      apikey: apiKey,
    },
  };

  const response = await fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/users?perPage=100&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  return response;
};

// Funció per a alternar la vista de xat a llista de xat
const toggleInChat = () => {
  inChat.value = false;
  selectedChat.value = "";

  // Recarreguem la llista de missatges per reposicionar i per actualitzar el últim missatge enviat
  LoadChatsList();
};

// Funció per a convertir la data del missatge a hora
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

// Funció per a comparar la data dels missatges
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

// Funció per a carregar la llista de xats nous
const toggleNewChat = async () => {
  const chatButton = document.getElementById("chat-button");
  const profileButton = document.getElementById("profile-button");
  const newChatButton = document.getElementById("new-chat-button");

  inNewChat.value = true;

  // En cas de estar mirant la llista de xats nous
  if (inNewChat.value) {
    // Comprobem quin botó està actiu
    if (chatButton.classList.contains("bg-[#0096b2]"))
      chatButton.classList.remove("bg-[#0096b2]", "text-white", "rounded-lg");
    else if (profileButton.classList.contains("bg-[#0096b2]"))
      profileButton.classList.remove(
        "bg-[#0096b2]",
        "text-white",
        "rounded-lg"
      );

    if (!newChatButton.classList.contains("bg-[#0096b2]"))
      newChatButton.classList.add("bg-[#0096b2]", "text-white", "rounded-lg");

    // Recullim tots els usuaris registrats excloent el nostre
    const response = await getRegistredUsers();
    const otherUsers = response.data.filter(
      (user) => user.uid !== userInfo.uid
    );

    console.log(otherUsers);

    newChatsList.value = otherUsers;
  }
};

// Funció per a marcar com a llegit un xat entre dos usuaris
const markUserConversationAsRead = (conversationWith) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      onBehalfOf: userInfo.uid,
      apikey: apiKey,
    },
  };

  fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/users/${conversationWith}/conversation/read`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

// Funció per a marcar com a llegit un xat de grup
const markGroupConversationAsRead = (guid) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      onBehalfOf: userInfo.uid,
      apikey: apiKey,
    },
  };

  fetch(
    `https://${appID}.api-${region}.cometchat.io/v3/groups/${guid}/conversation/read`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
</script>
