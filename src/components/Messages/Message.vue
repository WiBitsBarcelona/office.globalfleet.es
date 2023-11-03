<template>
    <div>
    </div>
</template>

<script setup>

import { Toast } from '@/utils/toast';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

Toast(t('message.success'), 'success');

</script>

<style scoped>

</style>