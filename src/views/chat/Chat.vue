<template>
  <div class="flex w-full h-14 items-center justify-start">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
    <input type="text" name="username" id="username" placeholder="Usuari" />
    <button type="submit" v-on:click="createUser()">Accedir</button>
  </div>
  <div class="flex">
    <div id="group-list" class="flex flex-col gap-5 w-1/4"></div>
    <div class="flex flex-col w-full h-[85vh] justify-between items-center box">
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

// Credenciales de la Aplicacion de CometChat
const appID = "23195116ca7e245f";
const region = "eu";

let userData;

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

// Funció per rebre la llista de grups
const getGroupsList = () => {
  const limit = 30;
  const groupsRequest = new CometChat.GroupsRequestBuilder()
    .setLimit(limit)
    .build();

  groupsRequest.fetchNext().then(
    (groupList) => {
      console.log("Lista de grupos:", groupList);
      groupList.map((group) => {
        document.getElementById(
          "group-list"
        ).innerHTML += `<button class="flex p-3 box h-24 w-[17rem] cursor-pointer" @click="loadGroup('${group.guid}')">
            <b>${group.name}</b>
          </button>`;
      });
    },
    (error) => {
      console.log("Error al obtener la lista de grupos:", error);
    }
  );
};

const createUser = () => {
  const username = document.getElementById("username").value;
  console.log("username", username);

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

const logUserIn = (authKey, UID) => {
  CometChat.login(UID, authKey).then(
    (user) => {
      console.log("Login Successful:", { user });
      loadGroup("global");
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};

const loadGroup = (GID) => {
  const user = userData;

  const GUID = GID;
  const password = "";
  const groupType = CometChat.GROUP_TYPE.PUBLIC;

  getGroupsList();
  getMessageHistory(user);
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

const getMessageHistory = (user) => {
  console.log("Usuari: ", user);

  const GUID = "global";
  const limit = 30;
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build();

  messagesRequest.fetchPrevious().then(
    (messages) => {
      messages = messages.filter((message) => message.type === "text");
      console.log("Mensajes anteriores: ", messages);
      messages.map((message) => {
        if (message.text !== undefined) {
          if (user.name === message.sender.name) {
            document.getElementById(
              "messages"
            ).innerHTML += `<div class="message flex gap-1 justify-end"><p class="py-2 px-7 bg-blue-600 rounded-3xl text-white">${message.text}</p></div>`;
          } else {
            document.getElementById(
              "messages"
            ).innerHTML += `<div class="message flex flex-col gap-1 rounded-3xl w-fit py-2 px-5 bg-gray-200"><b>${message.sender.name}</b><p>${message.text}</p></div>`;
          }
        }
      });
    },
    (error) => {
      console.log("Message fetching failed with error:", error);
    }
  );
};

const sendMessage = () => {
  const receiverID = "Global";
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
      ).innerHTML += `<div class="message flex gap-1 justify-end"><p class="py-2 px-7 bg-blue-600 rounded-3xl text-white">${message.text}</p></div>`;
      console.log("Mensaje enviado correctamente:", message);
    },
    (error) => {
      console.log("Error al enviar el mensaje:", error);
    }
  );
};
</script>
<style></style>
