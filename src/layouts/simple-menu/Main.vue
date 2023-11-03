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
            <li v-else :key="[menu + menuKey]" class="text-end">
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
                    <Tippy tag="a" :content="subMenu.title" :options="{
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
                          <Tippy tag="a" :content="lastSubMenu.title" :options="{
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

const { unreadMessageCount, checkUnreadMessages, getCometChatCredentials } = useChat();

const route = useRoute();
const router = useRouter();
const formattedMenu = ref([]);
const simpleMenuStore = useSimpleMenuStore();
const simpleMenu = computed(() => nestedMenu(simpleMenuStore.menu, route));
const useAuthentication = useAuthenticationStore();

const { t } = useI18n();


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
  }
);

onMounted(async () => {
  dom("body").removeClass("error-page").removeClass("login").addClass("main");
  //formattedMenu.value = $h.toRaw(simpleMenu.value);
  await formattedMenuList();


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




const formattedMenuList = async () => {
  //formattedMenu.value = $h.toRaw(simpleMenu.value);
  const menuFormat = $h.toRaw(simpleMenu.value);

  let menuNew = [];
  if (useAuthentication.getUser.roles[0].id === parseInt(enumRoles.MANAGER_ID)) {
    menuNew = menuFormat;
  } else {
    menuNew = menuFormat.filter((m) => m.isManager !== true);
  }

  formattedMenu.value = menuNew;

}

</script>
