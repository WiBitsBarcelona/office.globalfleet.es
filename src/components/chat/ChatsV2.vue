<template>
    <div class="w-full">
        <div v-if="nameConversation">

            <div class="flex flex-col h-[80vh] justify-between items-center box overflow-hidden">
                <!-- Header -->
                <div class="bg-white w-full p2 pt-3 pb-3 flex items-center" id="chat-header">
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
                <div class="overflow-scroll scrollbar-hidden w-full h-full p-4 bg-white" id="chat" @scroll="detectScroll">

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
                            <div style="flex: 1px;" v-if="mensaje.data.entities.sender.entity.uid === myUid">
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
                                                        <button style="width: 100%; align-items: center; display: flex; background: rgba(223, 242, 245, 0.1); 
                                                                padding: 8px; border-radius: 8px;"
                                                            @click="openDriverFile(item.url)">
                                                            <img src="../../assets/images/file.svg"
                                                                style="width: 30px; height: 30px;" />
                                                            <div style="display: grid;">
                                                                <p
                                                                    style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: white; margin-left: 10px;">
                                                                    {{ item.name.length > 15 ? item.name.substring(0, 15) +
                                                                        "..." : item.name }}</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div v-else-if="item.extension == 'pdf'">
                                                        <button style="width: 100%; align-items: center; display: flex; background: rgba(223, 242, 245, 0.1);
                                                                padding: 8px; border-radius: 8px;"
                                                            @click="openDriverFile(item.url)">
                                                            <img src="../../assets/images/pdf.svg"
                                                                style="width: 30px; height: 30px;" />
                                                            <div style="display: grid;">
                                                                <p
                                                                    style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: white; margin-left: 10px;">
                                                                    {{ item.name.length > 15 ? item.name.substring(0, 15) +
                                                                        "..." : item.name }}</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div style="display: flex; margin-top: 8px;"
                                                    @click="showModal(true), infoTrip(mensaje.sentAt, mensaje.deliveredAt, mensaje.readAt,
                                                        !mensaje.data.metadata ? null : mensaje.data.metadata['confirmetAt'])">
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
                                        <div @click="showModal(true),
                                            infoTrip(mensaje.sentAt, mensaje.deliveredAt, mensaje.readAt,
                                                !mensaje.data.metadata ? null : mensaje.data.metadata['confirmetAt'])">

                                            <div class="contMensajeEnviado">
                                                <p class="txtMensajesEnviado" style="padding-right: 4px;">{{
                                                    mensaje.data.text }}</p>
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
                            </div>
                            <!-- MENSAJES RECIBIDOS -->
                            <div v-else>
                                <!-- MENSAJES RECIBIDOS CON FICHEROS -->
                                <div v-if="mensaje.data.attachments">
                                    <div style="padding: 8px;" class="contMensajeRecibidoArchivos">
                                        <div v-for="item in mensaje.data.attachments" :key="item.id">
                                            <div
                                                v-if="item.extension == 'jpg' || item.extension == 'jpeg' || item.extension == 'png'">
                                                <button style="width: 100%; align-items: center; display: flex; background: rgba(146, 148, 156, 0.1); 
                                                    padding: 8px; border-radius: 8px;"
                                                    @click="openDriverFile(item.url)">
                                                    <img src="../../assets/images/file.svg"
                                                        style="width: 30px; height: 30px;" />
                                                    <div style="display: grid;">
                                                        <p
                                                            style="font-size: 16px; margin: 0px; margin-right: 8px; display: flex; color: #545454; margin-left: 10px;">
                                                            {{ item.name.length > 15 ? item.name.substring(0, 15) + "..." :
                                                                item.name }}</p>
                                                    </div>
                                                </button>
                                            </div>
                                            <div v-else-if="item.extension == 'pdf'">
                                                <button style="width: 100%; align-items: center; display: flex; background: rgba(146, 148, 156, 0.1); 
                                                    padding: 8px; border-radius: 8px;"
                                                    @click="openDriverFile(item.url)">
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
                                                </button>
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

                                    <!-- Cuando el mensaje tiene un texto traducido -->
                                    <div v-if="mensaje.data.customData">
                                        <div v-if="mensaje.data.customData.senderLang != myLang">

                                            <!-- Si el chat es typo grupo -->
                                            <div v-if="receiverType == 'group'">
                                                <div style="background: #E5E7EB; padding: 8px; border-radius: 2px 8px 8px 8px; 
                                                    gap: 8px; margin-bottom: 8px;max-width: 253px">
                                                    <div v-for="itemGM in mensaje.data.customData.groupText">
                                                        <div v-if="itemGM.Lang == myLang">
                                                            <div style="margin-top: 8px; display: flex; flex-direction: row; justify-content: space-between; 
                                                                align-items: end;">
                                                                <p class="txtMensajes" style="padding-right: 4px;">{{
                                                                    itemGM.TextTranslate }}</p>
                                                                <p class="txtHora">{{ convertStringToDate(mensaje.sentAt) }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div style="background: #E5E7EB; padding: 8px; border-radius: 2px 8px 8px 8px; 
                                                    gap: 8px; margin-bottom: 8px;max-width: 253px">

                                                    <div>
                                                        <p style="color: #92949C; font-size: 16px; margin: 8px 0px 0px 0px">
                                                            {{ mensaje.data.customData.titleText }}
                                                        </p>
                                                        <p style="color: #92949C; font-size: 16px; margin: 8px 0px 0px 0px">
                                                            {{ mensaje.data.text }}
                                                        </p>
                                                    </div>

                                                    <div
                                                        style="margin-top: 8px; display: flex; flex-direction: row; justify-content: space-between; align-items: end;">
                                                        <p class="txtMensajes" style="padding-right: 4px;">{{
                                                            mensaje.data.customData.translateText }}</p>
                                                        <p class="txtHora">{{ convertStringToDate(mensaje.sentAt) }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div class="contMensajeRecibido">
                                                <p class="txtMensajes" style="padding-right: 4px;">{{ mensaje.data.text }}
                                                </p>
                                                <p class="txtHora">{{ convertStringToDate(mensaje.sentAt) }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- cuando solo es texto normal sin traducir -->
                                    <div v-else>
                                        <div class="contMensajeRecibido">
                                            <p class="txtMensajes" style="padding-right: 4px;">{{ mensaje.data.text }}</p>
                                            <p class="txtHora">{{ convertStringToDate(mensaje.sentAt) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botón "Ir al último mensaje" fuera del bucle -->
                        <button @click="scrollToLast" style="position: absolute; bottom: 13%; right: 1%; width: 50px; height: 50px; 
                            background-color: white; border-radius: 50px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);"
                            class="hidden items-center justify-center" id="btnScroll">

                            <div v-if="countUnreadMessage > 0">
                                <p class="absolute -top-1 -right-1 rounded-full bg-amber-500 text-white"
                                    style="width: 20px;">
                                    {{ countUnreadMessage }}
                                </p>
                            </div>


                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 21 21">
                                <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.5 8.5l-4 4l-4-4" />
                            </svg>
                        </button>

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

                <div class="pt-4 sm:py-4 flex items-center border-t-8 border-slate-200/60 dark:border-darkmode-400 w-full">
                    <textarea v-on:keyup.enter="sendMessage" id="message" @click="onpresskey" class="overflow-y-scroll scrollbar-hidden chat__box__input form-control dark:bg-darkmode-600 h-11 resize-none border-transparent 
                        px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                        :placeholder="$t('chat.messageInput')"></textarea>

                    <div
                        style="display: flex; justify-content: center; align-items: center; width:200px; margin-right: 10px;">
                        <p style="font-size: 16px; margin-right: 5px; ">{{ $t("chat.confirmRead") }}</p>
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
                <!-- FIN BARRA DE ENVIO -->

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
        },
    },

});
</script>

<script setup>
import { ref, onMounted, defineProps, watch, onBeforeUnmount, defineEmits  } from 'vue';
import { CometChat } from "@cometchat-pro/chat";
import useChat from "@/composables/chat";
import useDriverDocument from "@/composables/driver_documents";
import translateApi from "@/composables/translate_api"
import { useAuthenticationStore } from "@/stores/auth/authentications";
import Swal from "sweetalert2";
import { useI18n } from 'vue-i18n';

const { cometData, getCometChatCredentials, loadChatMessages, markUserConversationAsRead, markGroupConversationAsRead, 
    sendTextMessage, mark_user_conversation_as_delivered,
    mark_group_conversation_as_delivered, checkUnreadMessages, getConversationsList, getLangxuid, getGroupMembers } = useChat();
const { storeDriverDocumentV2, downloadDriverDocument, driverDocumentData } = useDriverDocument();
const { translateText } = translateApi()
const { t } = useI18n();

const chatContainer = ref(null);

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
const mediaAttachments = ref(null)

let countUnreadMessage;
let isMoving = false;
// Array de mensajes
const mensajes = ref([]);
let myLang;

let membersLang = []

const emit = defineEmits();

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
        console.log(ChatId.value)

        if (receiverType.value == 'group') {
            getUidxGroup()
        }

        commetInit()

        setTimeout(() => {
            const chatCont = document.getElementById('chat');
            chatCont.scrollTop = chatCont.scrollHeight;
        }, 500);
    }
);


setInterval(async () => {
    if (idConversation.value != null) {
        await commetInit()
    }
}, 4000);

const commetInit = async () => {
    await loadMessages();
}

onMounted(async () => {
    initialize();
})

onBeforeUnmount(() => {
    const UNIQUE_LISTENER_ID = "INCOMING_MESSAGES_LISTENER";
    CometChat.removeUserListener(UNIQUE_LISTENER_ID);
});

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
    CometChat.init(appID, appSettings).then(async () => {

        //console.log("Initialization completed successfully");

        // Iniciem la sessió al xat
        const UID = useAuthenticationStore().user.employee.cometchat_uid;
        const name = useAuthenticationStore().user.employee.name;

        const user = new CometChat.User(UID);
        user.setName(name);

        userInfo = user;

        myUid.value = user.uid

        myLang = await getLangxuid(myUid.value);

        /*CometChat.login(UID, authKey).then(
            (user) => {
                //console.log("Loggued successful:", { user });
            },
            (error) => {
                console.log("Login failed with exception:", { error });
            }
        );*/

        // Afegirem un listener dels missatges
        const listenerID = "INCOMING_MESSAGES_LISTENER";

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage) => {
                    // Cuando llegue un nuevo mensaje
                    //console.log("Text message received successfully", textMessage);

                    mensajes.value.push(textMessage);

                    unreadMessageCount()

                    // Actualizamos los mensajes
                    if (nameConversation.value == undefined) {
                        nameConversation.value = textMessage.conversationId
                    }

                    // Si mi usuario recibe los mensajes y esta en el ultimo mensaje
                    if (textMessage.receiverId == myUid.value) {
                        //markUserConversationAsRead(myUid.value, ChatId.value)
                        if (isMoving == true) {
                            setTimeout(() => {
                                // Obtén el elemento que representa el último mensaje
                                const chatContainer = document.getElementById('chat');
                                const lastMessage = chatContainer.lastElementChild;

                                if (lastMessage) {
                                    // Haz scroll hasta el último mensaje
                                    lastMessage.scrollIntoView({ behavior: 'smooth' });
                                }
                            }, 1000)
                        }
                    }

                },
                onMediaMessageReceived: (mediaMessage) => {
                    //console.log("Media message received successfully", mediaMessage);
                    // if (mediaMessage.receiverId == myUid.value) {
                    //     markUserConversationAsRead(myUid.value, ChatId.value)
                    // }
                },
                onCustomMessageReceived: (customMessage) => {
                    //console.log("Custom message received successfully", customMessage);
                    // if (customMessage.receiverId == myUid.value) {
                    //     markUserConversationAsRead(myUid.value, ChatId.value)
                    // }
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

    if (mensajes.value.length > 0) {
        //Para leer los mensajes
        //markUserConversationAsRead(myUid.value, ChatId.value);
        if (receiverType.value == 'user') {
            await mark_user_conversation_as_delivered(myUid.value, ChatId.value)
        } else {
            await mark_group_conversation_as_delivered(myUid.value, ChatId.value)
        }

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
    const valueText = message.value.trim();

    // Envio de mensjae con archivos
    if (mediaSource.value != null) {

        const mediaPath = await storeDriverDocumentV2(mediaAttachments.value);

        // creamos un array con los datos
        let arrayMedia = { url: mediaPath.data.path, name: mediaAttachments.value.file_name, extension: mediaAttachments.value.type }

        if (receiverType.value == 'user') {
            
            const chatUserLang = await getLangxuid(ChatId.value)
            
            let textTranslateA = '';
            if (message.value == '') {
                textTranslateA = await translateText('Documento Adjunto', chatUserLang, myLang)
            } else {
                textTranslateA = await translateText( message.value, chatUserLang, myLang)
            }
            
            const chatsLang = { sender: myLang, received: chatUserLang }

            await sendTextMessage(myUid.value, message.value == '' ? 'Documento Adjunto' : message.value, ChatId.value, receiverType.value, isChecked.value, arrayMedia, textTranslateA, chatsLang, '');
            isChecked.value = false
            mediaSource.value = null
        }

        setTimeout(() => {
            const chatCont = document.getElementById('chat');
            chatCont.scrollTop = chatCont.scrollHeight;
        }, 800);

        if (receiverType.value == 'user') {
            await mark_user_conversation_as_delivered(myUid.value, ChatId.value)
        } else {
            await mark_group_conversation_as_delivered(myUid.value, ChatId.value)
        }


        // Netejem el text
        message.value = "";


        await loadMessages()

    } else {
        // Envio de mensjae sin archivos

        if (valueText != '') {

            // Si el tipo de chat es user
            if (receiverType.value == 'user') {
                const chatUserLang = await getLangxuid(ChatId.value)
                const textTranslate = await translateText(message.value, chatUserLang, myLang)

                const chatsLang = { sender: myLang, received: chatUserLang }

                await sendTextMessage(myUid.value, message.value, ChatId.value, receiverType.value, isChecked.value, '', textTranslate, chatsLang, '');
                isChecked.value = false

            } else {

                const groupTextTranslate = [];
                
                for (let i = 0; i < membersLang.length; i++) {
                    let element = membersLang[i];
                    const translatedText = await translateText(message.value, element, myLang);
                    const arrayText = { Lang: element, TextTranslate: translatedText[0].text, TitleTranslate: translatedText[1].text };
                    groupTextTranslate.push(arrayText);
                }

                const chatsLang = { sender: myLang };
                await sendTextMessage(myUid.value, message.value, ChatId.value, receiverType.value, isChecked.value, '', '', chatsLang, groupTextTranslate);
                isChecked.value = false;
            }

            setTimeout(() => {
                const chatCont = document.getElementById('chat');
                chatCont.scrollTop = chatCont.scrollHeight;
            }, 800);

            if (receiverType.value == 'user') {
                await mark_user_conversation_as_delivered(myUid.value, ChatId.value)
            } else {
                await mark_group_conversation_as_delivered(myUid.value, ChatId.value)
            }

            // Netejem el text
            message.value = "";

            await loadMessages()
        }

    }
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
    //console.log(fileData);
    //console.log(filePath); // Muestra el web path en la consola

    let data64 = await toBase64(fileData)

    let driver_id = ChatId.value.substr(ChatId.value?.lastIndexOf("_") + 1);
    let fileType = fileData.type.substr(fileData.type?.lastIndexOf("/") + 1);

    const arrayFile = { driver_id: driver_id, file_name: fileData.name, size: fileData.size, type: fileType, data: data64, has_ask_confirm: 0, }

    mediaAttachments.value = arrayFile
}

// eliminar archivo que se subira
const removeMediaFile = () => {
    mediaSource.value = null
}

//convertir a base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

// abrir pdf o imagenes
const openDriverFile = async (path) => {
    /*Swal.fire({
        icon: 'info',
        title: '',
        text: t("documents.swal.document_wait_viewing"),
        //toast: true,
        position: 'center',
        showConfirmButton: false,
    });*/
    await downloadDriverDocument(path);
    //Swal.close();
    switch (driverDocumentData.value.type) {
        case 'pdf':
            window.open(driverDocumentData.value.data);
            break;
        case 'png':
        case 'jpg':
        case 'jpeg':
            window.open(URL.createObjectURL(new Blob(["<img width='100%' src='" + driverDocumentData.value.data + "' />"], { type: "text/html" })));
            break;
        default:
            Swal.fire({
                icon: 'error',
                title: '',
                text: t("documents.swal.document_error_viewing"),
                confirmButtonText: t("documents.swal.all_right_btn"),
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary shadow-md',
                },
            });
    }
}

// Actualizar mensajes no leidos cuando se pulsa el textarea o el boton de desplazamientos
const onpresskey = async () => {

    if (receiverType.value == 'group') {
      await markGroupConversationAsRead(myUid.value, ChatId.value);
    } else {
      await markUserConversationAsRead(myUid.value, ChatId.value);
    }
    
    await checkUnreadMessages();

    if (ChatId.value != null) {
        // Suponiendo que ChatId.value contiene el ID del componente
        const elementSeleccionat = document.getElementById(ChatId.value);

        // Verifica si se encontró el elemento con el ID
        if (elementSeleccionat) {

            // emitimos un evento para ejecutar en la vista de lista de chats que se ha leido un mensaje
            emit('dataSend', { mensaje: 'true' })
            countUnreadMessage = 0
            
            /*
            // Obtén todos los divs dentro del elemento seleccionado
            const divs = elementSeleccionat.getElementsByTagName('div');

            // Verifica si hay al menos tres divs
            if (divs.length >= 3) {
                // Obtén el tercer div (índice 2 porque los índices comienzan en 0)
                const tercerDiv = divs[2];

                // Elimina la clase 'baloon' del tercer div
                tercerDiv.parentNode.removeChild(tercerDiv);
                countUnreadMessage = 0
            } else {
                //console.log("No hay al menos tres divs dentro del elemento seleccionado.");
            }*/
        } else {
            //console.log("No se encontró ningún elemento con el ID proporcionado.");
        }

    }
}

// desplazar hacia el ultimo mensaje
const scrollToLast = async () => {

    // Obtén el elemento que representa el último mensaje
    const chatContainer = document.getElementById('chat');
    const lastMessage = chatContainer.lastElementChild;

    if (lastMessage) {
        // Haz scroll hasta el último mensaje
        lastMessage.scrollIntoView({ behavior: 'smooth' });
    }

    if (countUnreadMessage > 0) {
        onpresskey()
    }
}

// detectar el moviemiento del scroll de los mensajes
const detectScroll = () => {
    const chatContainer = document.getElementById('chat');
    const btnScroll = document.getElementById("btnScroll");

    // Calcula la distancia entre la parte inferior del contenedor y la parte inferior del último mensaje
    const distanceToBottom = chatContainer.scrollHeight - (chatContainer.scrollTop + chatContainer.clientHeight);

    if (distanceToBottom <= 1) {
        // Está en el último mensaje o muy cerca de él, añade la clase "hidden" al botón
        btnScroll.classList.add("hidden");
        isMoving = true;
    } else {
        // No está en el último mensaje, elimina la clase "hidden" del botón
        btnScroll.classList.remove("hidden");
        isMoving = false;
    }
};

// verificar cuantos mensajes existen sin leer
const unreadMessageCount = async () => {
    const conversations = await getConversationsList(userInfo.uid);

    conversations.forEach(i => {
        if (i.conversationId == idConversation.value) {
            countUnreadMessage = i.unreadMessageCount
        }
    });
}

// Obtener los uid de los usuarios del grupo
const getUidxGroup = async () => {
    const uids = await getGroupMembers(ChatId.value);

    const uniqueMembersLang = new Set();

    for (let i = 0; i < uids.length; i++) {
        const element = uids[i];
        const uid_lang = await getLangxuid(element.uid);
        uniqueMembersLang.add(uid_lang); // Agregar elementos al conjunto
    }

    // Convertir el conjunto nuevamente a un array si es necesario
    membersLang = Array.from(uniqueMembersLang);
}
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
}</style>
