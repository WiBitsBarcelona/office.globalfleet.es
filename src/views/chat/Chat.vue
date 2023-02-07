<template>
  <div class="flex w-full h-14 items-center justify-start">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
  </div>
  <div class="flex">
    <div class="w-1/4">
      <input type="text" name="username" id="username" placeholder="Usuari" />
      <button type="submit" v-on:click="createUser()">Accedir</button>
    </div>
    <div class="flex flex-col w-full h-screen justify-between items-center box">
      <div id="messages" class="h-5/6 w-full"></div>
      <div
        class="pt-4 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400 w-full"
      >
        <textarea
          id="message"
          rows="1"
          class="w-5/6 chat__box__input form-control dark:bg-darkmode-600 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
          placeholder="Escribe el mensaje..."
        ></textarea>
        <div
          class="flex items-center justify-center w-1/6 text-2xl text-center"
        >
          <button
            type="submit"
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

const createUser = () => {
  const username = document.getElementById("username").value;
  console.log("username", username);

  const authKey = "b1809c12cf23a929539a2ac076b68277f7a4df9b";
  const UID = username;
  const name = username;

  const user = new CometChat.User(UID);
  user.setName(name);

  CometChat.createUser(user, authKey).then(
    (user) => {
      logUserIn(user, authKey, UID);
    },
    (error) => {
      if (error.code === "ERR_UID_ALREADY_EXISTS") {
        logUserIn(user, authKey, UID);
      }
    }
  );
};

const logUserIn = (user, authKey, UID) => {
  CometChat.login(UID, authKey).then(
    (user) => {
      createMsgListener();
      console.log("Login Successful:", { user });
      const GUID = "global";
      const password = "";
      const groupType = CometChat.GROUP_TYPE.PUBLIC;

      CometChat.joinGroup(GUID, groupType, password).then(
        (group) => {
          console.log("Se ha accedido al grupo:", group);
        },
        (error) => {
          console.log("Error al entrar al grupo:", error);
        }
      );
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};

const createMsgListener = () => {
  const listenerID = "GLOBAL_LISTENER_ID";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageRecieved: (textMessage) => {
        document.getElementById(
          "messages"
        ).innerHTML += `<div class="message">${textMessage.sender.name}: ${textMessage.text}</div>`;
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

const removeMsgListener = () => {
  const listenerID = "GLOBAL_LISTENER_ID";

  CometChat.removeMessageListener(listenerID);
};

const sendMessage = (msg) => {
  const receiverID = "Global";
  const messageText = document.getElementById("message").value;
  const receiverType = CometChat.RECEIVER_TYPE.GROUP;
  const textMessage = CometChat.TextMessage(
    receiverID,
    messageText,
    receiverType
  );

  CometChat.sendMessage(textMessage).then(
    (message) => {
      console.log("Mensaje enviado correctamente:", message);
    },
    (error) => {
      console.log("Error al enviar el mensaje:", error);
    }
  );
};
</script>
<style></style>
