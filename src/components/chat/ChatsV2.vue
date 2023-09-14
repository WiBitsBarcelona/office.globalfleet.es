<template>
    <div class="w-full">
        <div v-if="idConversation">

            <div class="flex flex-col h-[85vh] justify-between items-center box overflow-hidden">
                <!-- Header -->
                <div class="bg-white h-24 w-full p2 flex items-center">
                    <div v-if="nameConversation" class="ml-4 flex items-center gap-4">
                        <div v-if="receiverType === 'user'">
                            <img class="w-14 h-14 rounded-full"
                                :src="`https://ui-avatars.com/api/?name=${chatsTitle(nameConversation)}&color=FFFFFF&background=4EDDFF&font-size=0.38`" />
                        </div>
                        <div v-if="receiverType === 'group'">
                            <img class="w-14 h-14 rounded-full"
                                :src="`https://ui-avatars.com/api/?name=${chatsTitle(nameConversation)}&color=FFFFFF&background=BCBCBC&font-size=0.38`" />
                        </div>
                        <p class="text-xl">{{ nameConversation }}</p>
                    </div>
                </div>
                <!-- Chat -->
                <div class="scrollbar-hidden w-full" id="chat"
                    style="overflow: scroll; height: 100%; background-color: white; padding: 8px;">
                    <div v-for="(mensaje, index) in mensajes" :key="mensaje.id">

                        <!-- Verificar si la fecha actual es diferente a la fecha anterior -->
                        <div style="width: 100%; display: flex; justify-content: center; padding: 20px;"
                            v-if="index === 0 || convertStringToDates(mensaje.sentAt) !== convertStringToDates(mensajes[index - 1].sentAt)">
                            <div style="display: flex; align-items: center; justify-content: center; 
                                background-color: #EFEFEF; border-radius: 5px; padding: 8px 12px;">
                                {{ convertStringToDates(mensaje.sentAt) }}
                            </div>
                        </div>

                        <div style="display: flex;">
                            <!-- MENSAJES ENVIADOS -->
                            <div style="flex: 1px;" v-if="mensaje.data.entities.sender.entity.uid === myUid" @click="showModal(true), infoTrip(mensaje.sentAt, mensaje.deliveredAt, mensaje.readAt,
                                !mensaje.data.metadata ? null : mensaje.data.metadata['confirmetAt'])">
                                <div style="display: flex; float: right;">
                                    <div v-if="mensaje.data.metadata">
                                        <div v-if="mensaje.data.metadata['reader'] == 0">
                                            <div
                                                style="display: flex; margin-top: 25%; margin-bottom: 50%; margin-right: 5px;">
                                                <img src="../../assets/images/alertCircle.svg"
                                                    style="width: 25px; height: 25px;" />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div
                                                style="display: flex; margin-top: 25%; margin-bottom: 50%; margin-right: 5px;">
                                                <img src="../../assets/images/checkCircle.svg"
                                                    style="width: 25px; height: 25px;" />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- MENSAJES ENVIADO CON FICHEROS -->
                                    <div v-if="mensaje.data.attachments">
                                        <div class="contMensajeEnviado">
                                            <div class="contMensajeEnviadoArchivos">
                                                <div v-for="item in mensaje.data.attachments" :key="item.id">
                                                    <div
                                                        v-if="item.extension == 'jpg' || item.extension == 'jpeg' || item.extension == 'png'">
                                                        <div style="align-items: center; display: flex; background: rgba(223, 242, 245, 0.1); 
                                                                padding: 8px; border-radius: 8px;">
                                                            <img src="../../assets/images/file.svg"
                                                                style="width: 30px; height: 30px;" />
                                                            <div style="display: grid;">
                                                                <p
                                                                    style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: white; margin-left: 10px;">
                                                                    {{ item.name.length > 15 ? item.name.substring(0, 15) +
                                                                        "..." : item.name }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else-if="item.extension == 'pdf'">
                                                        <div style="align-items: center; display: flex; background: rgba(223, 242, 245, 0.1);
                                                                padding: 8px; border-radius: 8px;">
                                                            <img src="../../assets/images/pdf.svg"
                                                                style="width: 30px; height: 30px;" />
                                                            <div style="display: grid;">
                                                                <p
                                                                    style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: white; margin-left: 10px;">
                                                                    {{ item.name.length > 15 ? item.name.substring(0, 15) +
                                                                        "..." : item.name }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="display: flex; margin-top: 8px;"
                                                    v-on:click="openModalInfo(true), infoTrip(mensaje.sentAt, mensaje.deliveredAt, mensaje.readAt)">
                                                    <p class="txtMensajesEnviado" style="margin: 0px; margin-right: 5px;">{{
                                                        mensaje.data.text }}</p>
                                                    <p class="txtHoraEnviado" style="margin: 0px ;margin-left: 5px">{{
                                                        convertStringToDate(mensaje.sentAt) }}</p>
                                                    <div style="display: flex; align-items: flex-end; text-align: right;">

                                                        <p style="margin-left: 5px;"
                                                            v-if="mensaje.sentAt > 0 && mensaje.deliveredAt == null && mensaje.readAt == null">
                                                            <img src="../../assets/images/checkmark.svg" alt="Checkmark"
                                                                style="width: 15px; height: 15px; margin-left: 5px;" />
                                                        </p>

                                                        <p style="margin-left: 5px"
                                                            v-if="mensaje.sentAt > 0 && mensaje.deliveredAt > 0 && mensaje.readAt == null">
                                                            <img src="../../assets/images/allcheckmark.svg" alt="Checkmark"
                                                                style="width: 15px; height: 15px; margin-left: 5px;" />
                                                        </p>

                                                        <p style="margin-left: 5px"
                                                            v-if="mensaje.sentAt > 0 && mensaje.deliveredAt > 0 && mensaje.readAt > 0">
                                                            <img src="../../assets/images/checkallmark.svg" alt="Checkmark"
                                                                style="width: 15px; height: 15px; margin-left: 5px;" />
                                                        </p>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- MENSAJES ENVIADO NORMAL -->
                                    <div v-else>
                                        <div class="contMensajeEnviado">
                                            <p class="txtMensajesEnviado">{{ mensaje.data.text }}</p>
                                            <p class="txtHoraEnviado">{{ convertStringToDate(mensaje.sentAt) }}</p>

                                            <div style="display: flex; align-items: flex-end; text-align: right;">

                                                <p
                                                    v-if="mensaje.sentAt > 0 && mensaje.deliveredAt == null && mensaje.readAt == null">
                                                    <img src="../../assets/images/checkmark.svg" alt="Checkmark"
                                                        style="width: 15px; height: 15px; margin-left: 5px;" />
                                                </p>

                                                <p
                                                    v-if="mensaje.sentAt > 0 && mensaje.deliveredAt > 0 && mensaje.readAt == null">
                                                    <img src="../../assets/images/allcheckmark.svg" alt="Checkmark"
                                                        style="width: 15px; height: 15px; margin-left: 5px;" />
                                                </p>

                                                <p
                                                    v-if="mensaje.sentAt > 0 && mensaje.deliveredAt > 0 && mensaje.readAt > 0">
                                                    <img src="../../assets/images/checkallmark.svg" alt="Checkmark"
                                                        style="width: 15px; height: 15px; margin-left: 5px;" />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- MENSAJES RECIBIDOS -->
                            <div v-else>
                                <!-- MENSAJES RECIBIDOS CON FICHEROS -->
                                <div v-if="mensaje.data.attachments">
                                    <div style="padding: 8px;" class="contMensajeRecibidoArchivos">
                                        <div v-for="item in mensaje.data.attachments" :key="item.id">
                                            <div
                                                v-if="item.extension == 'jpg' || item.extension == 'jpeg' || item.extension == 'png'">
                                                <div style="align-items: center; display: flex; background: rgba(146, 148, 156, 0.1); 
                                                    padding: 8px; border-radius: 8px;">
                                                    <img src="../../assets/images/file.svg"
                                                        style="width: 30px; height: 30px;" />
                                                    <div style="display: grid;">
                                                        <p
                                                            style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: #545454; margin-left: 10px;">
                                                            {{ item.name.length > 15 ? item.name.substring(0, 15) + "..." :
                                                                item.name }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else-if="item.extension == 'pdf'">
                                                <div style="align-items: center; display: flex; background: rgba(146, 148, 156, 0.1); 
                                                    padding: 8px; border-radius: 8px;">
                                                    <img src="../../assets/images/pdf.svg"
                                                        style="width: 30px; height: 30px;" />
                                                    <div style="display: grid;">
                                                        <p
                                                            style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: #545454; margin-left: 10px;">
                                                            {{ item.name.length > 15 ? item.name.substring(0, 15) + "..." :
                                                                item.name }}</p>
                                                        <p
                                                            style="font-size: 12px; margin: 0px; display: flex; color: #545454; margin-left: 10px;">
                                                            {{ item.extension }} · {{ item.size }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="display: flex; margin-top: 8px;">
                                            <p class="txtMensajesRecibido" style="margin: 0px;">{{ mensaje.data.text }}</p>
                                            <p class="txtHoraRecibido" style="margin: 0px; margin-left: 5px;">{{
                                                convertStringToDate(mensaje.sentAt) }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <!-- MENSAJES RECIBIDOS NORMAL -->
                                    <div class="contMensajeRecibido">
                                        <p class="txtMensajesRecibido">{{ mensaje.data.text }}</p>
                                        <p class="txtHoraRecibido">{{ convertStringToDate(mensaje.sentAt) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BARRA DE ENVIO -->
                <div v-if="mediaSource != null" class="flex w-full bg-[#F1F5F9] p-4 border-gray-200 border-2 rounded">
                    <div class="flex items-center gap-2">
                        <img src="../../assets/images/file.svg" style="width: 30px; height: 30px;" />
                        <h1>{{ mediaSource }}</h1>
                        <button @click="removeMediaFile">
                            <img src="../../assets/images/close-circle-outline.svg" style="width: 30px; height: 30px;" />
                        </button>
                    </div>
                </div>

                <div
                    class="pt-4 sm:py-4 flex items-center border-t-[6px] border-slate-200/60 dark:border-darkmode-400 w-full">
                    <textarea v-on:keyup.enter="sendMessage" id="message" class="overflow-y-scroll scrollbar-hidden chat__box__input form-control dark:bg-darkmode-600 h-11 resize-none border-transparent 
                        px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                        placeholder="Escribe el mensaje..."></textarea>

                    <div
                        style="display: flex; justify-content: center; align-items: center; width:200px; margin-right: 10px;">
                        <p style="font-size: 16px; margin-right: 5px; ">Confirmar lectura</p>
                        <input type="checkbox" value="first_checkbox" v-model="isChecked" @change="handleCheckboxChange" />
                    </div>

                    <label for="file-image"
                        style="margin-right: 10px; height: 100%; display: flex; align-items: center; justify-content: center; ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-6 h-6">
                            <path
                                d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48">
                            </path>
                        </svg>
                    </label>
                    <input type="file" id="file-image" accept=".pdf, image/jpeg, image/jpg, image/png"
                        style="width: 0.1px;  height: 0.1px;  opacity: 0;  overflow: hidden;  z-index: -1;"
                        @change="onFileChange" />


                    <button id="sendMsgBtn" @click="sendMessage"
                        class="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex-none flex items-center justify-center"
                        style="margin-right: 8px;">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide w-6 h-6 mt-1 mr-1">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>

                    </button>
                </div>

                <!-- Modal Checkmark -->
                <div v-if="modalMessage == true"
                    style="position: absolute; display: flex; justify-content: center; align-items: center; background-color: rgb(0 0 0 / 40%); width: 100%; height: 100%;">

                    <div style="position: relative; background: white; border-radius: 10px; padding: 16px;">

                        <!-- boton modal -->
                        <button v-on:click="showModal(false)"
                            style="position: absolute; top: -13px; right: -15px; background-color: rgb(0 150 178); border-radius: 100%; padding: 5px 10px;">
                            <h1 style="color: white; margin: 0;">X</h1>
                        </button>

                        <div style="padding: 10px;">
                            <h2 style="font-size: 20px; font-style: normal; font-weight: 500; line-height: normal;">Info del
                                Mensaje</h2>
                            <div style="display: block; margin-top: 8px;">

                                <p style="font-size: 16px;">Enviado</p>
                                <div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 5px;">
                                    <img src="../../assets/images/checkmark.svg" alt="Checkmark"
                                        style="width: 25px; height: 25px; margin-left: 5px;" />
                                    <p style="font-size: 18px; margin-left: 5px;" v-if="sentAt">{{
                                        convertirAFecha(sentAt) }}</p>
                                </div>

                                <p style="font-size: 16px;">Entregado</p>
                                <div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 5px;">
                                    <img src="../../assets/images/allcheckmark.svg" alt="Checkmark"
                                        style="width: 25px; height: 25px; margin-left: 5px;" />
                                    <p style="font-size: 18px; margin-left: 5px;" v-if="deliveredAt">{{
                                        convertirAFecha(deliveredAt) }}</p>
                                </div>

                                <p style="font-size: 16px;">Leido</p>
                                <div style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 5px;">
                                    <img src="../../assets/images/checkallmark.svg" alt="Checkmark"
                                        style="width: 25px; height: 25px; margin-left: 5px;" />
                                    <p style="font-size: 18px; margin-left: 5px;" v-if="readAt">{{
                                        convertirAFecha(readAt) }}</p>
                                </div>

                                <!-- Confirmacion de Lectura -->
                                <div style="margin-top: 5px; margin-bottom: 5px;">
                                    <div v-if="confirmetAt">
                                        <p style="font-size: 16px;">Confirmado</p>
                                        <div
                                            style="display: flex; align-items: center; margin-top: 5px; margin-bottom: 5px;">
                                            <img src="../../assets/images/checkmarkCircleSky.svg" alt="Checkmark"
                                                style="width: 25px; height: 25px; margin-left: 5px;" />
                                            <p style="font-size: 18px; margin-left: 5px;" v-if="confirmetAt != 'undefined'">
                                                {{ convertirAFecha(confirmetAt) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <!-- Fin Modal Checkmark -->
            </div>

        </div>

    </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({

    methods: {
        onFileChange(event) {
            var fileData = event.target.files[0];
            this.fileName = fileData.name;
            console.log(console.log(event.target.files[0]))
        },
        convertirAFecha(timestamp) {
            const fecha = new Date(timestamp * 1000);
            const opciones = {
                day: 'numeric', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            };
            return fecha.toLocaleString("es-ES", opciones);
        },
        convertStringToDates(strTime) {
            const timestamp = Number(strTime) * 1000;
            const currentDate = new Date();
            const date = new Date(timestamp);

            if (this.isToday(date)) {
                return 'Hoy';
            } else if (this.isYesterday(date, currentDate)) {
                return 'Ayer';
            } else {
                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                return day + "/" + month + "/" + year;
            }
        },
        isToday(date) {
            const today = new Date();
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        },
        isYesterday(date, currentDate) {
            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);
            return (
                date.getDate() === yesterday.getDate() &&
                date.getMonth() === yesterday.getMonth() &&
                date.getFullYear() === yesterday.getFullYear()
            );
        }
    },

});
</script>
<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import { CometChat } from "@cometchat-pro/chat";
import useChat from "@/composables/chat";
import useDriverDocument from "@/composables/driver_documents";
import { useAuthenticationStore } from "@/stores/auth/authentications";

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
    mark_user_conversation_as_delivered,
    update_datameta_message
} = useChat();

const { storeDriverDocumentV2 } = useDriverDocument();

let userInfo;
const isChecked = ref(false);
const ChatId = ref(null)
const myUid = ref(null)
const receiverType = ref(null)
const idConversation = ref(null)
const modalMessage = ref(false)
const nameConversation = ref(null)

const sentAt = ref(null);
const deliveredAt = ref(null);
const readAt = ref(null);
const confirmetAt = ref(null)

const mediaSource = ref(null)
const Media64 = ref(null)
const mediaAttachments = ref(null)
// Array de mensajes
const mensajes = ref([]);

const props = defineProps({
    idConversation: String, //idConversation
    ChatId: String, // ChatId
    receiverType: String, // receiverType
    nameConversation: String
})

watch(
    [() => props.idConversation, () => props.ChatId, () => props.receiverType, () => props.nameConversation],
    ([newIdConversation, newChatId, newReceiverType, newNameConversation]) => {
        idConversation.value = newIdConversation
        ChatId.value = newChatId;
        receiverType.value = newReceiverType;
        nameConversation.value = newNameConversation;

        setTimeout(() => {
            const chatCont = document.getElementById('chat');
            chatCont.scrollTop = chatCont.scrollHeight;
        }, 500);

        commetInit()
    }
);

if(idConversation.value != null){
    setInterval(async () => {
        await commetInit()
    }, 5000);
}

const commetInit = async () => {
    await loadMessages();
}

onMounted(async () => {
    initialize();
})

// Funcion que va a correr al iniciar la pagina
const initialize = async () => {
    // funcion para listar los datos de cometchat
    await getCometChatCredentials();

    let appID = cometData.value.company.cometchat.app_id;
    let region = "eu";
    let authKey = cometData.value.company.cometchat.auth_key;

    // Variable amb la configuració de la App
    const appSettings = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .autoEstablishSocketConnection(true)
        .build();

    // Inicialitzem la App
    CometChat.init(appID, appSettings).then(() => {

        //console.log("Initialization completed successfully");

        // Iniciem la sessió al xat
        const UID = useAuthenticationStore().user.employee.cometchat_uid;
        const name = useAuthenticationStore().user.employee.name;

        const user = new CometChat.User(UID);
        user.setName(name);

        userInfo = user;

        myUid.value = user.uid

        CometChat.login(UID, authKey).then(
            (user) => {
                //console.log("Loggued successful:", { user });
            },
            (error) => {
                console.log("Login failed with exception:", { error });
            }
        );

        // Afegirem un listener dels missatges
        const listenerID = "INCOMING_MESSAGES_LISTENER";

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage) => {
                    // Cuando llegue un nuevo mensaje
                    //console.log("Text message received successfully", textMessage);

                    // Actualizamos los mensajes
                    mensajes.value.push(textMessage);

                    //Para leer los mensajes
                    markUserConversationAsRead(myUid.value, ChatId.value)

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
};

const loadMessages = async () => {
    const response = await loadChatMessages(idConversation.value);
    mensajes.value = response.data

    if (response) {
        //Para leer los mensajes
        markUserConversationAsRead(myUid.value, ChatId.value);
        await mark_user_conversation_as_delivered(myUid.value, ChatId.value);
    }
}

// Funcion para convertir los del mensaje a hora
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

// funcion para saber si esta o no activado el checkbox
const handleCheckboxChange = async () => {
    if (isChecked.value) {
        console.log('El checkbox está activado.');
    } else {
        console.log('El checkbox está desactivado.');
    }
}

// Funció per a enviar missatges
const sendMessage = async () => {
    const message = document.getElementById("message");

    // Controlamos que el mensaje no esté vacio
    const value = message.value.trim();
    // Envio de mensjae con archivos
    if (mediaSource.value != null) {

        const mediaPath = await storeDriverDocumentV2(mediaAttachments.value);
        // creamos un array con los datos
        let arrayMedia = { url: mediaPath.data.path, name: mediaAttachments.value.file_name, extension: mediaAttachments.value.type }
        await sendTextMessage(myUid.value, message.value == '' ? 'Documento Adjunto' : message.value, ChatId.value, receiverType.value, '', arrayMedia);

        mediaSource.value = null

        const chatCont = document.getElementById('chat');
        chatCont.scrollTop = chatCont.scrollHeight;

        await mark_user_conversation_as_delivered(myUid.value, ChatId.value);
        await loadMessages()

    } else {
        // Envio de mensjae sin archivos
        await sendTextMessage(myUid.value, message.value, ChatId.value, receiverType.value, isChecked.value, '');
        isChecked.value = false

        const chatCont = document.getElementById('chat');
        chatCont.scrollTop = chatCont.scrollHeight;

        await mark_user_conversation_as_delivered(myUid.value, ChatId.value);
        await loadMessages()
    
    }

    // Netejem el text
    message.value = "";
};

// Funcion para mostrar el modal
const showModal = (value) => {
    modalMessage.value = value;
    //console.log(value)
}

// FUNCION PARA ABRIR EL MODAL INFO DETALLES
const infoTrip = (value1, value2, value3, value4) => {
    sentAt.value = value1
    deliveredAt.value = value2
    readAt.value = value3
    confirmetAt.value = value4
}

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

// Funcion para abrir solo archivos
const onFileChange = async (event) => {
    let fileData = event.target.files[0];
    let filePath = URL.createObjectURL(fileData); // Obtiene el web path del archivo

    mediaSource.value = fileData.name
    console.log(fileData);
    console.log(filePath); // Muestra el web path en la consola

    let data64 = await toBase64(fileData)

    let driver_id = ChatId.value.substr(ChatId.value?.lastIndexOf("_") + 1);
    let fileType = fileData.type.substr(fileData.type?.lastIndexOf("/") + 1);

    const arrayFile = { driver_id: driver_id, file_name: fileData.name, size: fileData.size, type: fileType, data: data64, has_ask_confirm: 0, }

    mediaAttachments.value = arrayFile
}

const removeMediaFile = () => {
    mediaSource.value = null
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
</script>
<style>
.contMensajeRecibido {
    display: flex;
    background: #E5E7EB;
    flex-direction: row;
    padding: 8px;
    border-radius: 2px 8px 8px 8px;
    gap: 8px;
    margin-bottom: 8px;
    max-width: 253px;
}

.contMensajeRecibidoArchivos {
    background: #E5E7EB;
    flex-direction: row;
    padding: 0px 8px 0px 8px;
    border-radius: 2px 8px 8px 8px;
    gap: 8px;
    margin-bottom: 8px;
    max-width: 253px;
}


.contMensajeEnviado {
    display: flex;
    background: #0096B2;
    flex-direction: row;
    padding: 8px;
    float: right;
    border-radius: 8px 2px 8px 8px;
    gap: 8px;
    margin-bottom: 8px;
    max-width: 253px;
}

.txtMensajesEnviado {
    display: flex;
    color: white;
    font-size: 14px;
    flex: 10;
    word-break: break-word;
}

.txtHoraEnviado {
    margin-left: 5px;
    color: white;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    text-align: right;
}

.txtMensajesRecibido {
    display: flex;
    color: #3C3C3C;
    font-size: 14px;
    flex: 10;
    word-break: break-word;
}

.txtHoraRecibido {
    margin-left: 5px;
    color: #92949C;
    font-size: 12px;
    display: flex;
    align-items: flex-end;
    text-align: right;
}
</style>
