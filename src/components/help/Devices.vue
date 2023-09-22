<template>
    <div class="box intro-x w-full h-full p-5">
        <h2 class="font-medium text-xl sm:text-2xl">{{ $t('help_screen.content.devices.title') }}</h2>
        <div class="text-justify leading-relaxed mt-5">
            <p class="mb-5">{{ $t('help_screen.content.devices.intro_text_1') }}<sup class="text-orange-500">1</sup>.</p>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();
</script>