<template>
  <router-view />
</template>

<script setup>
import { useI18n } from "vue-i18n";

const i18n = useI18n();
i18n.locale.value = localStorage.getItem('locale');

</script>
