
<template>
  <Dropdown class="intro-x">
    <DropdownToggle tag="div" role="button" class="cursor-pointer">
      <Tippy tag="button" class="intro-x notification mr-4 z-50" @click="switchMode" :content="$t('lang_select')" :options="{theme: 'light',}">
        <span class="uppercase font-medium text-white border rounded-md p-1">{{ $i18n.locale }}</span>
      </Tippy>
    </DropdownToggle>
    <DropdownMenu class="w-40">
      <DropdownContent>
        <DropdownItem v-for="locale in allLocales" :key="locale.code" @click="chanlng(locale.code)">
          <GlobeIcon class="w-4 h-4 mr-2" /> {{ locale.name }}
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  </Dropdown>
</template>

<script setup>
import { allLocales, setLocale } from "@/i18n";

const chanlng = (lang) => {
  setLocale(lang);
  document.querySelector("html").setAttribute("lang", lang)
}

</script>

<style scoped>
#dropdownDefaultButton {
  z-index: 9999;
}
</style>