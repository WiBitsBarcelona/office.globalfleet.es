<template>
  <div class="py-5 md:py-0">

    <!-- <FleetModeSwitcher /> -->
    <MobileMenu />
    <TopBar class="top-bar-boxed--simple-menu" />
    <div class="flex overflow-hidden">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav side-nav--simple">
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li v-if="menu == 'devider'" :key="menu + menuKey" class="side-nav__devider my-6"></li>
            <li v-else :key="menu + menuKey" class="text-end">
              <Tippy tag="a" :content="t(menu.title)" :options="{
                placement: 'left',
              }" :href="menu.subMenu
  ? 'javascript:;'
  : router.resolve({ name: menu.pageName }).path
  " class="side-menu" :class="{
    'side-menu--active': menu.active,
    'side-menu--open': menu.activeDropdown,
  }" @click="linkTo(menu, router, $event)">
                <div class="side-menu__icon mt-4 mb-4">
                  <span v-if="menu.pageName == 'chat' && unreadMessageCount"
                    class="ml-5 px-2 py-1 text-white rounded-full bg-primary relative z-50">{{ unreadMessageCount
                    }}</span>
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  {{ menu.title }}
                  <div v-if="menu.subMenu" class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180': menu.activeDropdown }">
                    <ChevronDownIcon />
                  </div>
                </div>
              </Tippy>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                    <Tippy tag="a" :content="t(subMenu.title)" :options="{
                      placement: 'left',
                    }" :href="subMenu.subMenu
  ? 'javascript:;'
  : router.resolve({ name: subMenu.pageName }).path
  " class="side-menu" :class="{ 'side-menu--active': subMenu.active }" @click="linkTo(subMenu, router, $event)">
                      <div class="side-menu__icon">
                        <ActivityIcon />
                      </div>
                      <div class="side-menu__title">
                        {{ subMenu.title }}
                        <div v-if="subMenu.subMenu" class="side-menu__sub-icon" :class="{
                          'transform rotate-180': subMenu.activeDropdown,
                        }">
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </Tippy>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li v-for="(
                            lastSubMenu, lastSubMenuKey
                          ) in subMenu.subMenu" :key="lastSubMenuKey">
                          <Tippy tag="a" :content="t(lastSubMenu.title)" :options="{
                            placement: 'left',
                          }" :href="lastSubMenu.subMenu
  ? 'javascript:;'
  : router.resolve({
    name: lastSubMenu.pageName,
  }).path
  " class="side-menu" :class="{
    'side-menu--active': lastSubMenu.active,
  }" @click="linkTo(lastSubMenu, router, $event)">
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title">
                              {{ lastSubMenu.title }}
                            </div>
                          </Tippy>
                        </li>
                      </ul>
                    </transition>
                    <!-- END: Third Child -->
                  </li>
                </ul>
              </transition>
              <!-- END: Second Child -->
            </li>
          </template>
          <!-- END: First Child -->
        </ul>
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">

        <router-view />

        <!-- BEGIN: Footer Text -->
        <FleetFooter />
        <!-- END: Footer Text -->

      </div>
      <!-- END: Content -->

    </div>
  </div>
</template>

<script setup>

import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSimpleMenuStore } from "@/stores/simple-menu";
import { helper as $h } from "@/utils/helper";
import TopBar from "@/components/top-bar/Main.vue";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import FleetModeSwitcher from "@/components/fleet-dark-mode/Main.vue";
import MainColorSwitcher from "@/components/main-color-switcher/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "@/layouts/side-menu";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useAuthenticationStore } from "@/stores/auth/authentications";
// Chat hooks
import useChat from "@/composables/chat";
import enumRoles from '@/enums/enum_roles.js';
import FleetFooter from "@/components/fleet-footer/Main.vue";
import { useI18n } from "vue-i18n";
import { Toast } from '@/utils/toast';


//Firebase & CometchatSDK
import { cometchatLogin } from '@/models/cometchat/CometchatSDK';






const { unreadMessageCount, checkUnreadMessages, getCometChatCredentials } = useChat();

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const simpleMenuStore = useSimpleMenuStore();
const simpleMenu = computed(() => nestedMenu(simpleMenuStore.menu, route));
const useAuthentication = useAuthenticationStore();

const { t } = useI18n();




// /******************
//  * Firebase
//  ******************/

// const firebaseConfig = {
//   apiKey: "AIzaSyAnqeT7eqxzObiyOLJ_aGgVIf_5CDSVmQU",
//   authDomain: "globalfleet-cometchat.firebaseapp.com",
//   projectId: "globalfleet-cometchat",
//   storageBucket: "globalfleet-cometchat.appspot.com",
//   messagingSenderId: "767180935601",
//   appId: "1:767180935601:web:add4c6e5364aa7c40fad90",
//   measurementId: "G-9YTMREBTS7"
// };

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebase);

// const APP_ID = "231046aa8ee568e3";
// const REGION = "eu";
// const AUTH_KEY = "f588a52d5487c195325e84aee5b610d0647a43bf";

// const APP_SETTING = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(REGION).build();
// let FCM_TOKEN = '';

// let UID = 'emp_67'; //GEstor de trafico






provide("forceActiveMenu", (pageName) => {
  route.forceActiveMenu = pageName;
  formattedMenu.value = $h.toRaw(simpleMenu.value);
});

watch(
  computed(() => route.path),
  async () => {
    delete route.forceActiveMenu;
    //formattedMenu.value = $h.toRaw(simpleMenu.value);
    await formattedMenuList();

    //Firebase & CometchatSDK
    await cometchatLogin();

  }
);

onMounted(async () => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  //formattedMenu.value = $h.toRaw(simpleMenu.value);
  await formattedMenuList();


  //Firebase & CometchatSDK
  await cometchatLogin();


  //TODO
  // pendiente por revisar: cuando no tiene cometchat activo igualmente falla 
  // por que un setInterval cada vez que se recarga un menu. ¿El setInterval se reemplaza?
  // No en recomendable haceer esto directamente "useAuthenticationStore().user.employee" crear un objeto antes. Tambien se puede reemplazar por: "useAuthentication.getUser"

  const response = await checkUnreadMessages();

  if (response != false) {
    if (!localStorage.getItem("token") || useAuthenticationStore().user.employee !== null) {
      await checkUnreadMessages();
    }
  }

});

setInterval(async () => {
  const response = await checkUnreadMessages();

  if (response != false) {
    if (!localStorage.getItem("token") || useAuthenticationStore().user.employee !== null) {
      setTimeout(async () => {
        await checkUnreadMessages();
      }, 4000);
    }
  }
}, 4000);




/**
 * Formatted menu && LocalStorage Messages
 */
const formattedMenuList = async () => {
  
  /************************
   * formattedMenu
   ************************/
  //formattedMenu.value = $h.toRaw(simpleMenu.value);
  const menuFormat = $h.toRaw(simpleMenu.value);

  let menuNew = [];
  if (useAuthentication.getUser.roles[0].id === parseInt(enumRoles.MANAGER_ID)) {
    menuNew = menuFormat;
  } else {
    menuNew = menuFormat.filter((m) => m.isManager !== true);
  }

  formattedMenu.value = menuNew;



  

  /************************
   * LocalStorage Messages
   ************************/
  if(localStorage.getItem('message_success')){
    await Toast(localStorage.getItem('message_success'), 'success');
    localStorage.removeItem('message_success');
  }

  if(localStorage.getItem('message_error')){
    //await Toast(t('message.error'), 'error');
    await Toast(localStorage.getItem('message_error'), 'error');
    localStorage.removeItem('message_error');
  }

}



/******************
 * Firebase 
 ******************/

// const connectCometChat = async() => {
//   try {
//     // CC init
//     await CometChat.init(APP_ID, APP_SETTING);


//     // User login
//     const loginResponse = await CometChat.login(UID, AUTH_KEY);
//     console.log('1. User login complete', loginResponse);

//     CometChat.getLoggedinUser().then(user => console.log(user.name));


//     //Fetch the FCM Token
//     getToken(messaging, { vapidKey: 'BJubSjGb5alNAd9ebq7JWHKHVd5ui52dFcQjpQ-FEJMkaQ9thIv0d9qb_867gf1iDXniQf-Wfn3ksLcI1OrZnRk' }).then((currentToken) => {
//       if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         console.log("TOKEN is: " + currentToken);
//         FCM_TOKEN = currentToken;

//       } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         FCM_TOKEN = '';
//         // ...
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       FCM_TOKEN = '';
//       // ...
//     });
//     console.log('2. Received FCM Token', FCM_TOKEN);



//     // Register the FCM Token
//     await CometChat.registerTokenForPushNotification(FCM_TOKEN);
//     console.log('3. Registered FCM Token');


//   } catch (error) {
//     console.error(error);
//   }

// }



</script>
