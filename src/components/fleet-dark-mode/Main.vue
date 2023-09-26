<template v-slot="darkMode">
  <!-- BEGIN: Dark Mode Switcher-->

  <Tippy tag="button" class="intro-x notification mr-4 z-50" @click="switchMode" :content="$t('mode_select')" :options="{theme: 'light',}">
    <MoonIcon v-show="darkMode === false" />
    <SunIcon v-show="darkMode === true" />
  </Tippy>
  <!-- END: Dark Mode Switcher-->
</template>

<script setup>
import { computed } from "vue";
import { useDarkModeStore } from "@/stores/dark-mode";
import dom from "@left4code/tw-starter/dist/js/dom";

const darkModeStore = useDarkModeStore();
const darkMode = computed(() => darkModeStore.darkMode);

const setDarkModeClass = () => {
  darkMode.value
    ? dom("html").addClass("dark")
    : dom("html").removeClass("dark");
};

const switchMode = () => {
  darkModeStore.setDarkMode(!darkMode.value);
  setDarkModeClass();
};

setDarkModeClass();
</script>
