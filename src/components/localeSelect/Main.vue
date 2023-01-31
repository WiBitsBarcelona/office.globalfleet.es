<script setup>
  import { allLocales, setLocale } from "@/i18n";
</script>

<template>
  <div class="text-right">
    <select
      :value="$i18n.locale"
      @change="setLocale($event.target.value)"
      id="locale"
  >
    <option v-for="locale in allLocales" :value="locale">{{ locale }}</option>
  </select>
  </div>
</template>

<style scoped>
  label, select {
    width: 150px;
  }
  select {
    height: 50px;
  }
</style>