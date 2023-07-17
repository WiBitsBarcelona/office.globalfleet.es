<template>
    <div class="col-span-12 mt-5 mb-1 text-center intro-y">
        <p class="text-slate-600 dark:text-slate-200">
            &copy; {{ new Date().getFullYear() }} - {{ appName }} - {{ appVersion }} - {{ $t("auth_footer.all_rights") }}
        </p>
    </div>
</template>

<script setup>
const appName = import.meta.env.VITE_APP_TITLE;
const appVersion = import.meta.env.VITE_APP_VERSION;

</script>