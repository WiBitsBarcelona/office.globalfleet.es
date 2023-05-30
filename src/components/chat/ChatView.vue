<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
  />
  <!-- Chat -->
  <div class="flex flex-col w-1/3 gap-4">
    <!-- Botons menú -->
    <div class="box p-2 grid grid-cols-2 justify-between">
      <button
        id="chat-button"
        class="flex items-center justify-center gap-1 py-2 w-full bg-[#0096b2] chat-button active text-white rounded-lg"
        @click="LoadChatsList"
      >
        <span class="material-symbols-outlined"> chat </span>
        Chats
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
    <div class="w-full relative mr-auto mt-3 sm:mt-0">
      <SearchIcon
        class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
      />
      <input
        id="search-conversation"
        type="text"
        class="form-control w-full box px-10"
        placeholder="Buscar conversación"
        v-on:input="searchConversation"
      />
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
        :id="
          conversation.conversationWith.uid
            ? conversation.conversationWith.uid
            : conversation.conversationWith.guid
        "
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
        class="flex gap-3 p-3 pl-2 h-16 box cursor-pointer border-b bg-white items-center conversations-list-item"
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
              class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-green-500 text-white rounded-full inner-messages-balloon"
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
              class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-green-500 text-white rounded-full inner-messages-balloon"
            >
              <p class="w-full text-center">+99</p>
            </div>
          </div>
          <p :id="'last-' + conversation.conversationId">
            {{
              conversationList.length > 0 &&
              conversation.lastMessage &&
              conversation.lastMessage.data &&
              conversation.lastMessage.data.text
                ? conversation.lastMessage.data.text.length < 35
                  ? conversation.lastMessage.data.text
                  : conversation.lastMessage.data.text.substring(0, 35) + "..."
                : ""
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
            chatList.name,
            chatList.uid ? 'user' : 'group'
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
        v-on:keyup.enter="sendMessage"
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
          v-on:click="sendMessage"
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
</template>

<script setup>
import { CometChat } from "@cometchat-pro/chat";
import { ref } from "vue";

// Hooks
import { useAuthenticationStore } from "@/stores/auth/authentications";
import useChat from "@/composables/chat";

const {
  cometData,
  conversationList,
  getCometChatCredentials,
  getConversationsList,
  getUserConversation,
  getGroupConversation,
  getUserData,
  getGroupData,
  loadChatMessages,
  markUserConversationAsRead,
  markGroupConversationAsRead,
  sendTextMessage,
  getUserGroups,
  getGroupMembers,
} = useChat();

let selectedChat = ref("");
let inChat = ref(false);
let inNewChat = ref(false);
let userInfo;
let newChatsList = ref("");

// Funcion que va a correr al iniciar la pagina
const initialize = async () => {
  // funcion para listar los datos de cometchat
  await getCometChatCredentials();

  let appID = cometData.value.company.cometchat.app_id;
  let region = "eu";
  let authKey = cometData.value.company.cometchat.auth_key;
  let apiKey = cometData.value.company.cometchat.rest_api_key;

  let conversationList2 = ref("");
  let searching = ref(false);
  let isLoggued = ref(false);

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
            printTextMessage(textMessage);
          },
          onMediaMessageReceived: (mediaMessage) => {
            console.log("Media message received successfully", mediaMessage);
          },
          onCustomMessageReceived: (customMessage) => {
            console.log("Custom message received successfully", customMessage);
          },
        })
      );

      const userListenerID = "USER_LISTENER_ID";

      CometChat.addUserListener(
        userListenerID,
        new CometChat.UserListener({
          onUserOnline: (onlineUser) => {
            console.log("On User Online:", { onlineUser });
          },
          onUserOffline: (offlineUser) => {
            console.log("On User Offline:", { offlineUser });
          },
        })
      );
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );

  // Iniciem la sessió al xat
  const UID = useAuthenticationStore().user.employee.cometchat_uid;
  const name = useAuthenticationStore().user.employee.name;

  const user = new CometChat.User(UID);
  user.setName(name);

  userInfo = user;

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
  }

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

  // Funció per buscar un xat des del buscador
  const searchConversation = (e) => {
    if (e.target.value.length != 0) {
      searching.value = true;
      conversationList2.value = conversationList.value.filter((conversation) =>
        conversation.conversationWith.name.includes(e.target.value)
      );
    } else {
      searching.value = false;
      LoadChatsList();
    }
  };
};

initialize();

// Funció per montar la pantalla del xat
const buildChat = async (ConversationId, ChatType, ChatId) => {
  let lastMessageDate = "";

  const messagesBalloon = document.getElementById(ChatId)?.querySelector(".inner-messages-balloon");
  if (messagesBalloon) {
    messagesBalloon.remove();
  }

  document.querySelectorAll(".conversations-list-item").forEach((element) => {
    element.classList.replace("bg-gray-200", "bg-white");
    element.classList.remove("selected");
  });

  const elementSeleccionat = document.getElementById(ChatId);
  elementSeleccionat.classList.remove("bg-white");
  elementSeleccionat.classList.add("bg-gray-200");

  const response = ChatType === "user" ? await getUserData(ChatId) : await getGroupData(ChatId);
  selectedChat.value = response.data;
  inChat.value = true;

  const conversations = await loadChatMessages(ConversationId);
  const chat = document.getElementById("chat");
  chat.innerHTML = "";

  conversations.data.forEach((conversation) => {
    if (conversation.sender !== userInfo.uid) {
      if (conversation.receiverType === "user")
        markUserConversationAsRead(userInfo.uid, conversation.sender);
      else
        markGroupConversationAsRead(userInfo.uid, conversation.receiver);
    }

    const currentMessageDate = getMessageDate(conversation.sentAt);

    if (lastMessageDate !== currentMessageDate) {
      chat.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
    }

    lastMessageDate = currentMessageDate;

    const messageClass = userInfo.uid === conversation.sender ? "missatgePropi" : "missatgeEntrant";
    chat.innerHTML += `<div class="${messageClass}" style="display: flex; width: 100%; justify-content: flex-${userInfo.uid === conversation.sender ? "end" : "start"};">
                          <div class="flex gap-3 ${userInfo.uid === conversation.sender ? "py-2 px-3 bg-[#0096b2] text-white rounded-lg w-fit" : "rounded-lg w-fit py-2 px-3 bg-gray-200"} max-w-md">
                            <p style="margin: 0px;">${conversation.data.text}</p>
                            <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
                              <p style="font-size: 12px; margin: 0px; heigh: 100%">
                                ${convertStringToDate(conversation.sentAt)}
                              </p>
                            </div>
                          </div>
                        </div>`;
  });

  const messageBody = document.getElementById("chat");
  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
};

// Funció per a alternar la vista de xat a llista de xat
const toggleInChat = () => {
  inChat.value = false;
  selectedChat.value = "";

  // Recarreguem la llista de missatges per reposicionar i per actualitzar el últim missatge enviat
  LoadChatsList();
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

// Funció per a enviar missatges
const sendMessage = () => {
  const message = document.getElementById("message");
  const header = document.getElementById("chat-header");
  const chatId = header.getAttribute("chatId");
  const receiverType = header.getAttribute("type");

  sendTextMessage(userInfo.uid, message.value, chatId, receiverType);

  // Netejem el text
  message.value = "";
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

    const groups = await getUserGroups(userInfo.uid);
    const otherUsers = [];

    for (const group of groups) {
      otherUsers.push(group);
      const members = await getGroupMembers(group.guid);
      const otherMembers = members.filter((user) => user.uid !== userInfo.uid);

      for (const member of otherMembers) {
        otherUsers.push(member);
      }
    }

    newChatsList.value = otherUsers;
  }
};

// Funció per carregar un nou xat
const buildNewChat = async (id, name, type) => {
  let lastMessageDate = "";
  let currentMessageDate;

  if (type === "user") {
    // Obtenim les dades de l'usuari en cuestió
    const response = await getUserData(id);
    selectedChat.value = response.data;
  } else if (type === "group") {
    // Obtenim les dades de l'usuari en cuestió
    const response = await getGroupData(id);
    selectedChat.value = response.data;
  }

  if (!inChat.value) inChat.value = true;

  if (type === "user") {
    // Revisem que no tinguem alguna conversa amb aquest usuari
    const conversation = await getUserConversation(userInfo.uid, id);
    const hasConversation = conversation.error ? false : true;

    // Netejem el xat
    const chat = document.getElementById("chat");
    chat.innerHTML = "";

    LoadChatsList();

    // En cas de tenir alguna conversa la carregarem
    if (hasConversation) {
      const messages = await loadChatMessages(conversation.data.conversationId);

      messages.data.map((message) => {
        if (message.sender != userInfo.uid) {
          if (message.receiverType === "user")
            markUserConversationAsRead(userInfo.uid, message.sender);
          else markGroupConversationAsRead(userInfo.uid, message.receiver);
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
  } else if (type === "group") {
    // Revisem que no tinguem alguna conversa amb aquest usuari
    const conversation = await getGroupConversation(userInfo.uid, id);
    const hasConversation = conversation.error ? false : true;

    // Netejem el xat
    const chat = document.getElementById("chat");
    chat.innerHTML = "";

    LoadChatsList();

    // En cas de tenir alguna conversa la carregarem
    if (hasConversation) {
      const messages = await loadChatMessages(conversation.data.conversationId);

      messages.data.map((message) => {
        if (message.sender != userInfo.uid) {
          if (message.receiverType === "user")
            markUserConversationAsRead(userInfo.uid, message.sender);
          else markGroupConversationAsRead(userInfo.uid, message.receiver);
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

      document.getElementById(document.getElementById('chat-header').getAttribute('ChatId')).classList.add('selected')

    }
  }
};

// Funció per carregar/reiniciar els xats
const LoadChatsList = async () => {
  const chatButton = document.getElementById("chat-button");
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

    if (!chatButton.classList.contains("bg-[#0096b2]"))
      chatButton.classList.add("bg-[#0096b2]", "text-white", "rounded-lg");
  }

  // Carregarem la llista de xats
  await getConversationsList(userInfo.uid);
};

const printTextMessage = async (textMessage) => {
  const receiver = textMessage.receiverId;
  const sender = textMessage.sender.uid;
  const header = document.getElementById("chat-header");
  const messageBody = document.getElementById("chat");

  // Comprobem la data del missatge
  const currentMessageDate = getMessageDate(textMessage.sentAt);

  // Comprobem l'ultim missatge d'aquesta mateixa conversació
  const lastMessageDate = await loadChatMessages(textMessage.conversationId);
  const lastDate =
    lastMessageDate.data.length > 1
      ? getMessageDate(
          lastMessageDate.data[lastMessageDate.data.length - 2].sentAt
        )
      : "Hoy";

  if (lastDate !== currentMessageDate) {
    messageBody.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
  }

  if (
    !header ||
    (header.getAttribute("chatId") !== receiver &&
      header.getAttribute("chatId") !== sender)
  ) {
    await getConversationsList(userInfo.uid);
    return;
  }

  const senderClass =
    textMessage.sender.uid === userInfo.uid
      ? "missatgePropi"
      : "missatgeEntrant";
  const bgColorClass =
    textMessage.sender.uid === userInfo.uid
      ? "bg-[#0096b2] text-white"
      : "bg-gray-200";
  const messageText = textMessage.text;
  const messageDate = convertStringToDate(textMessage.sentAt);

  // Marcamos el nuevo mensaje como leido
  if (sender !== userInfo.uid) {
    if (textMessage.receiverType === "group") {
      markGroupConversationAsRead(userInfo.uid, receiver);
    } else {
      markUserConversationAsRead(userInfo.uid, sender);
    }
  }

  messageBody.innerHTML += `
    <div class="${senderClass}" style="display: flex; width: 100%; justify-content: ${
    senderClass === "missatgePropi" ? "flex-end" : "flex-start"
  };">
      <div class="flex gap-3 py-2 px-3 ${bgColorClass} rounded-lg max-w-md">
        <p style="margin: 0;">${messageText}</p>
        <div style="display: flex; flex-direction: column; justify-content: flex-end; align-items: center">
          <p style="font-size: 12px; margin: 0; heigh: 100%">${messageDate}</p>
        </div>
      </div>
    </div>`;

  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

  await getConversationsList(userInfo.uid);
  
  // Volvemos a seleccionar el chat con el color gris
  document.getElementById(header.getAttribute("chatId")).classList.add("selected");

};
</script>

<style>
  .selected {
    --tw-bg-opacity: 1;
    background-color: rgb(229 231 235 / var(--tw-bg-opacity));
  }
</style>