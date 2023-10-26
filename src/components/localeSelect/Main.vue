
<template>
<!--   <Dropdown class="intro-x">
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
  </Dropdown> -->
  <div class="intro-x z-50 mr-2">
    <select class="uppercase bg-primary text-white rounded border-none form-select" v-model="$i18n.locale" id="locale" @change="changeLocale($i18n.locale)">
    <option v-for="locale in $i18n.availableLocales" :value="locale">{{ locale }}</option>
  </select>
  </div>
</template>

<script setup>
import { computed, onBeforeMount } from "vue";
import { allLocales, setLocale } from "@/i18n";
import { useLocaleStore } from "@/stores/locale";

const localeStore = useLocaleStore();
function changeLocale(locale){
  localeStore.setLocale(locale);
}

onBeforeMount(async () => {
});


</script>
