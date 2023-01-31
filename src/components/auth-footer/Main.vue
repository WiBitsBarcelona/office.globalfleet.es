<template>
  <!-- BEGIN: Login Footer-->
  <div
    class="fixed bottom-0 right-0 h-12 flex items-right justify-right z-50 mb-5 mr-10 p-3"
  >
    <div class="mr-4 text-slate-600 dark:text-slate-200">&copy; {{new Date().getFullYear()}} - GlobalFleet - {{ $t("auth_footer.all_rights") }}  - {{ $t("auth_footer.developed") }}  <a class="text-dark" href="https://www.globaldevelopers.eu" target="_blank">Globaldevelopers</a></div>
  </div>
  <!-- END: Login Footer-->
</template>

<script setup>
import { computed } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
</script>
