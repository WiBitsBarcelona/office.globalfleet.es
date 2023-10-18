<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
  <!-- Chat -->
  <div class="flex flex-col w-1/3 gap-4">

    <Preloader v-if="loading" />

    <!-- Botons menú -->
    <div class="box p-2 grid grid-cols-2 justify-between">


      <button id="chat-button"
        class="flex items-center justify-center gap-1 py-2 w-full bg-[#0096b2] chat-button active text-white rounded-lg"
        :class="conversationList.length == 0 ? 'opacity-60 cursor-not-allowed' : ''"
        @click="conversationList.length == 0 ? '' : LoadChatsList()">
        <span class="material-symbols-outlined"> chat </span>
        {{ $t("chat.chats") }}
      </button>
      <button id="new-chat-button" class="flex items-center justify-center gap-1 py-2 w-full chat-button"
        :class="conversationList.length == 0 ? 'opacity-60 cursor-not-allowed' : ''"
        @click="conversationList.length == 0 ? '' : toggleNewChat()">
        <span class="material-symbols-outlined"> add_comment </span>
        {{ $t("chat.newChat") }}
      </button>
      <div id="new-chat-menu"
        class="hidden flex-col w-60 bg-white absolute z-10 right-0 top-14 border border-gray-100 rounded">
        <div class="pl-5 py-2 w-full cursor-pointer border border-bottom hover:bg-[#0096b2] hover:text-white">
          <p>Nuevo chat</p>
        </div>
      </div>
    </div>
    <div class="w-full relative mr-auto mt-3 sm:mt-0">
      <SearchIcon class="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500" />
      <input id="search-conversation" type="text" class="form-control w-full box px-10"
        :placeholder="$t('chat.searchTitle')" v-on:input="conversationList.length == 0 ? '' : searchConversationByName"
        :class="conversationList.length == 0 ? 'opacity-60 cursor-not-allowed' : ''" />
    </div>

    <!-- Llista de xats -->
    <div id="group-list" class="flex flex-col gap-[6px] h-full overflow-y-scroll scrollbar-hidden">
      <!-- Per cada xat farem un botó -->
      <button v-if="!inNewChat" v-for="conversation in conversationList" @click="enviarVariable(conversation.conversationId,
        conversation.conversationWith.uid ? conversation.conversationWith.uid : conversation.conversationWith.guid,
        conversation.conversationType, conversation.conversationWith.name)"
        :id="conversation.conversationWith.uid ? conversation.conversationWith.uid : conversation.conversationWith.guid"
        :key="conversation.conversationWith"
        class="flex gap-3 p-3 pl-2 h-16 box cursor-pointer border-b bg-white items-center conversations-list-item">
        <!-- En cas de ser un xat amb un usuari -->
        <!-- <p>{{conversation.conversationId}} - {{ conversation.conversationWith.uid}} - {{conversation.conversationType}} - 
        {{ conversation.conversationWith.name}}</p> -->

        <img v-if="conversation.conversationType === 'user'" class="w-14 h-14 rounded-full" :src="conversation.conversationWith.avatar
          ? conversation.conversationWith.avatar
          : `https://ui-avatars.com/api/?name=${chatsTitle(conversation.conversationWith.name)}&color=FFFFFF&background=4EDDFF&font-size=0.38`
          " />
        <!-- En cas de ser un grup -->
        <img v-if="conversation.conversationType === 'group'" class="w-14 h-14 rounded-full" :src="conversation.conversationWith.icon
          ? conversation.conversationWith.icon
          : `https://ui-avatars.com/api/?name=${chatsTitle(conversation.conversationWith.name)}&color=FFFFFF&background=BCBCBC&font-size=0.38`
          " />
        <div class="flex flex-col justify-between h-full w-full text-left gap-1">
          <div class="flex w-full justify-between">
            <h2 class="font-semibold">
              {{ conversation.conversationWith.name }}
            </h2>
            <div v-if="conversation.unreadMessageCount != 0 &&
              conversation.unreadMessageCount < 100
              "
              class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-[#FF9F46] text-white rounded-full inner-messages-balloon">
              <p class="w-full text-center mt-[1px]">
                {{ conversation.unreadMessageCount }}
              </p>
            </div>
            <div v-else-if="conversation.unreadMessageCount != 0 &&
              conversation.unreadMessageCount > 100
              "
              class="flex items-center justify-between h-5 min-w-[1.25rem] p-1 bg-[#FF9F46] text-white rounded-full inner-messages-balloon">
              <p class="w-full text-center mt-[1px]">+99</p>
            </div>
          </div>
          <p :id="'last-' + conversation.conversationId">
            <!-- {{
              conversationList.length > 0 &&
              conversation.lastMessage &&
              conversation.lastMessage.data &&
              conversation.lastMessage.data.text
              ? conversation.lastMessage.data.text.length < 30 ? conversation.lastMessage.data.text :
                conversation.lastMessage.data.text.substring(0, 30) + "..." : "" }}</p> -->
          <div v-if="conversation.conversationType == 'group'">
            <div v-if="conversation.lastMessage.data.customData">
              <div v-for="itemGM in conversation.lastMessage.data.customData.groupText">
                <div v-if="itemGM.Lang == myLang">
                  {{ itemGM.TextTranslate }}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="conversation.lastMessage.sender == userInfo.uid">
              {{ conversation.lastMessage.data.text }}
            </div>
            <div v-else>
              {{ conversation.lastMessage.data.customData.translateText }}
            </div>
          </div>
          </p>
        </div>
      </button>

      <!-- Per cada nou possible xat, farem un botó també -->
      <button v-if="inNewChat" v-for="chatList in newChatsList"
        class="flex gap-3 p-3 pl-2 h-16 box cursor-pointer border-b bg-white items-center"
        @click="enviarVariable(chatList.conversationId, chatList.uid ? chatList.uid : chatList.guid, chatList.uid ? 'user' : 'group', chatList.name)">

        <!-- <p>{{ chatList.conversationId }}</p> -->
        <!-- En cas de ser un xat amb un usuari -->
        <img v-if="chatList.uid" class="w-14 h-14 rounded-full" :src="chatList.avatar
          ? chatList.avatar
          : `https://ui-avatars.com/api/?name=${chatList.name.charAt(
            0
          )}&color=FFFFFF&background=4EDDFF&font-size=0.38`
          " />
        <!-- En cas de ser un grup -->
        <img v-if="chatList.guid" class="w-14 h-14 rounded-full" :src="chatList.icon
          ? chatList.icon
          : `https://ui-avatars.com/api/?name=${chatList.name.charAt(
            0
          )}&color=FFFFFF&background=BCBCBC&font-size=0.38`
          " />
        <div class="flex flex-col justify-between h-full w-full text-left gap-1">
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
  <ChatsV2 :idConversation="propsConversationId" :ChatId="propsChatId" :receiverType="propsChatType"
    :nameConversation="propsNameConversation" @dataSend="calltoRecived" />
</template>

<script>
import ChatsV2 from "../../components/chat/ChatsV2.vue";
export default {
  components: {
    ChatsV2,
  },
}
</script>

<script setup>
import { CometChat } from "@cometchat-pro/chat";
import { ref, onMounted, onBeforeUnmount } from "vue";
import Preloader from '@/components/preloader/Preloader.vue';

// Hooks
import { useAuthenticationStore } from "@/stores/auth/authentications";
import useChat from "@/composables/chat";
import Swal from "sweetalert2";

const {
  cometData,
  conversationList,
  getCometChatCredentials,
  getConversationsList,
  loadChatMessages,
  markUserConversationAsRead,
  markGroupConversationAsRead,
  getUserGroups,
  getGroupMembers,
  checkUnreadMessages,
  getUserConversation,
  getLangxuid
} = useChat();

const loading = ref(false);
let selectedChat = ref("");
let inChat = ref(false);
let inNewChat = ref(false);
let userInfo = ref("");
let newChatsList = ref("");
let myLang = ref("");;

const propsConversationId = ref(null)
const propsChatType = ref(null)
const propsChatId = ref(null)
const propsNameConversation = ref(null)

onMounted(async () => {
  //set value
  loading.value = true;
  initialize();
})

onBeforeUnmount(() => {
  const chatListenerID = "chat_incoming_messages_unique_id_globaltank_apliemporda";
  //const chatListenerID = 'INCOMING_MESSAGES_LISTENER'
  CometChat.removeUserListener(chatListenerID);

});



// Funcion que va a correr al iniciar la pagina
const initialize = async () => {
  // funcion para listar los datos de cometchat
  await getCometChatCredentials();

  let appID = cometData.value.company.cometchat.app_id;
  let region = "eu";
  let authKey = cometData.value.company.cometchat.auth_key;
  let apiKey = cometData.value.company.cometchat.rest_api_key;

  let isLoggued = ref(false);

  // Variable amb la configuració de la App
  const appSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();

  // Inicialitzem la App
  CometChat.init(appID, appSettings).then(async () => {

    //console.log("Initialization completed successfully");

    // Iniciem la sessió al xat
    const UID = useAuthenticationStore().user.employee.cometchat_uid;
    const name = useAuthenticationStore().user.employee.name;

    const user = new CometChat.User(UID);
    user.setName(name);

    userInfo = user;

    myLang = await getLangxuid(userInfo.uid);

    CometChat.login(UID, authKey).then(
      (user) => {
        //console.log("Loggued successful:", { user });
        LoadChatsList();
      },
      (error) => {
        console.log("Login failed with exception:", { error });
        loading.value = false;

        Swal.fire({
          icon: 'info',
          title: '',
          text: "No existe ninguna conversacion",
          //toast: true,
          position: 'center',
          showConfirmButton: false,
        });
      }
    );

    // CometChat.getLoggedinUser().then((e) => {
    //   if (e) {
    //     isLoggued = true;
    //     LoadChatsList();
    //   }
    // });

    // if (!isLoggued) {
    //   // Creem l'usuari
    //   CometChat.createUser(user, authKey).then(
    //     async () => {
    //       // Un cop creat, ens loguejarem
    //       const Logued = await logUserIn(authKey, UID);
    //       // Si la sessió s'ha iniciat correctament
    //       if (Logued) {
    //         LoadChatsList();
    //       }
    //     },
    //     async (error) => {
    //       if (error.code === "ERR_UID_ALREADY_EXISTS") {
    //         // En cas d'existir, farem login
    //         const Logued = await logUserIn(authKey, UID);
    //         if (Logued) {
    //           LoadChatsList();
    //         }
    //       }
    //     }
    //   );
    // }

    // Afegirem un listener dels missatges
    const chatListenerID = "chat_incoming_messages_unique_id_globaltank_apliemporda";

    CometChat.addMessageListener(chatListenerID, new CometChat.MessageListener({

      onTextMessageReceived: (textMessage) => {
        //console.log("Text message received successfully", textMessage);
        printTextMessage(textMessage);
      },

      onMediaMessageReceived: (mediaMessage) => {
        //console.log("Media message received successfully", mediaMessage);
      },

      onCustomMessageReceived: (customMessage) => {
        //console.log("Custom message received successfully", customMessage);
      },

    })
    );
  },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );

  // Funció per loguejar un usuari
  // const logUserIn = async (authKey, UID) => {
  //   const response = await CometChat.login(UID, authKey).then(
  //     async () => {
  //       return true;
  //     },
  //     (error) => {
  //       console.log("Login failed with exception:", { error });
  //       return false;
  //     }
  //   );

  //   return response;
  // };
};

// FUNCION UE RECOGE LOS VALORES
const enviarVariable = async (value, value2, value3, value4) => {

  if (value == undefined || value == null) {
    // Revisem que no tinguem alguna conversa amb aquest usuari
    const response = await getUserConversation(userInfo.uid, value2);

    if ('data' in response) {
      propsConversationId.value = response.data.conversationId // idConversation
    } else if ('error' in response) {
      propsConversationId.value = value
    }

  } else {
    propsConversationId.value = value
  }

  propsChatId.value = value2 //ChatId
  propsChatType.value = value3 // receiverType
  propsNameConversation.value = value4

  if (inNewChat.value == false) {

    if (propsChatType.value === "group") {
      await markGroupConversationAsRead(userInfo.uid, propsChatId.value);
    } else {
      await markUserConversationAsRead(userInfo.uid, propsChatId.value);
    }

    await checkUnreadMessages();
    await LoadChatsList();
  }

}

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

    if (groups != undefined) {
      for (const group of groups) {
        otherUsers.push(group);
        const members = await getGroupMembers(group.guid);
        const otherMembers = members.filter((user) => user.uid !== userInfo.uid);
        for (const member of otherMembers) {
          otherUsers.push(member);
        }
      }
    }


    newChatsList.value = otherUsers;
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

  loading.value = false;

  if (propsChatId.value != null) {
    document.querySelectorAll(".conversations-list-item").forEach((element) => {
      element.classList.replace("bg-gray-200", "bg-white");
      element.classList.remove("selected");
    });

    const elementSeleccionat = document.getElementById(propsChatId.value);

    if (elementSeleccionat != null) {
      elementSeleccionat.classList.remove("bg-white");
      elementSeleccionat.classList.add("bg-gray-200");
    }

  }

};

const printTextMessage = async (textMessage) => {
  const receiver = textMessage.receiverId;
  const sender = textMessage.sender.uid;
  const header = document.getElementById("chat-header");
  //const messageBody = document.getElementById("chat");

  // Comprobem la data del missatge
  const currentMessageDate = getMessageDate(textMessage.sentAt);

  // Comprobem l'ultim missatge d'aquesta mateixa conversació
  /*const lastMessageDate = await loadChatMessages(textMessage.conversationId);
  const lastDate =
    lastMessageDate.data.length > 1
      ? getMessageDate(
        lastMessageDate.data[lastMessageDate.data.length - 2].sentAt
      )
      : "Hoy";

  if (lastDate !== currentMessageDate) {
    messageBody.innerHTML += `<div class="flex justify-center align-center"><p class="p-2 rounded-lg bg-gray-200">${currentMessageDate}</p></div>`;
  }*/

  // En caso de no encontrar ningun xat abierto
  if (!inChat || !header) {
    // Simplemente cargamos la lista de xats de nuevo
    await getConversationsList(userInfo.uid);
    return;
  }

  // En caso de estar en un chat pero no es del que recibimos el mensaje
  if (document.getElementById("chat-header") !== receiver && document.getElementById("chat-header") !== sender) {
    // Actualizamos lista de xats
    await getConversationsList(userInfo.uid);
    // Volvemos a pintar el elemento

    document.getElementById(propsChatId.value).classList.add("selected");
    // Volvemos a seleccionar el chat con el color gris
    return;


  }

  const senderClass = textMessage.sender.uid === userInfo.uid ? "missatgePropi" : "missatgeEntrant";
  const bgColorClass = textMessage.sender.uid === userInfo.uid ? "bg-[#0096b2] text-white" : "bg-gray-200";
  const messageText = textMessage.text;
  const messageDate = convertStringToDate(textMessage.sentAt);

  // Marcamos el nuevo mensaje como leido
  if (sender != userInfo.uid) {
    console.log(userInfo.uid)
    if (textMessage.receiverType === "group") {
      markGroupConversationAsRead(userInfo.uid, receiver);
    } else {
      markUserConversationAsRead(userInfo.uid, sender);
    }
  }

  messageBody.innerHTML += `
    <div class="${senderClass} mensaje" style="display: flex; width: 100%; justify-content: ${senderClass === "missatgePropi" ? "flex-end" : "flex-start"};" 
      date="${textMessage.sentAt}-${textMessage.deliveredAt}-${textMessage.readAt}">
      <div class="flex gap-3 py-2 px-3 ${bgColorClass} rounded-lg max-w-md">
        <p style="margin: 0px; display: flex; word-break: break-word;">${messageText}</p>
        <div style="display: flex; justify-content: flex-end; align-items: center">
          <p style="font-size: 12px; margin: 0; heigh: 100%">${messageDate}</p>
          
          ${textMessage.senderClass == "missatgePropi" ? '' :
      `<img src="${textMessage.sentAt > 0 && textMessage.deliveredAt == null && textMessage.readAt == null ? '../src/assets/images/checkmark.svg' :
        textMessage.sentAt > 0 && textMessage.deliveredAt > 0 && textMessage.readAt == 'null' &&
          textMessage.sentAt > 0 && textMessage.deliveredAt > 0 && textMessage.readAt > 0 ? '../src/assets/images/checkallmark.svg' :
          '../src/assets/images/allcheckmark.svg'}" 
            alt="Checkmark" style="width: 15px; height: 15px; margin-left: 5px;">`}
          
        </div>
      </div>
    </div>`;

  messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

  await getConversationsList(userInfo.uid);

  // Volvemos a seleccionar el chat con el color gris
  document.getElementById(propsChatId.value).classList.add("selected");
};

const searchConversationByName = async () => {
  const element = document.getElementById("search-conversation");
  const searchTerm = element.value.toString().toLowerCase();

  const conversations = await getConversationsList(userInfo.uid);

  const r = conversations.filter((conversation) => {
    const name = conversation.conversationWith.name;
    return name.toString().toLowerCase().includes(searchTerm);
  });

  conversationList.value = r;
};

const chatsTitle = (value) => {

  const words = value.split(" ");

  if (words.length >= 2) {
    // Obtén las dos primeras palabras
    const firstwords = words[0];
    const secondwords = words[1];

    // Obtiene la primera letra de cada palabra
    const firstletter1 = firstwords.charAt(0).toUpperCase();
    const firstletter2 = secondwords.charAt(0).toUpperCase();

    // Combina las primeras letras en un resultado final
    const finalletters = firstletter1 + firstletter2;

    // Imprime el resultado final
    return finalletters
  }
  else {
    return value.charAt(0);
  }
}

// funcion que recive un emit de ChatsV2 para actualizar el conteo de mensajes leidos
const calltoRecived = async (datos) => {
  if (datos.mensaje == 'true') {
    await checkUnreadMessages();
    await LoadChatsList();
  }
};
</script>

<style>
.selected {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
</style>
