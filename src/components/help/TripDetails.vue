<template>
    <div class="box intro-x w-full h-full p-5">
        <h2 class="font-medium text-xl sm:text-2xl">{{ $t('help_screen.content.trip_details.title') }}</h2>
        <div class="text-justify leading-relaxed mt-5">
            <p class="mb-5">{{ $t('help_screen.content.trip_details.intro_text_1') }}</p>
            <p class="mb-5">{{ $t('help_screen.content.trip_details.intro_text_2') }} <AlertTriangleIcon class="inline-flex w-4 h-4 text-primary -mt-1 mr-1" />{{ $t('help_screen.content.trip_details.intro_text_3') }}</p>
            <p>{{ $t('help_screen.content.trip_details.image_title') }}</p>
            <img class="inline-flex w-2/4 mt-3 mb-5 shadow-md" :src = "imageAssets['/src/assets/images/help/trips/trips-3.png'].default"/>
            <Alert class="alert-primary-soft flex items-center mb-2">
              <AlertCircleIcon class="w-6 h-6 mr-2" /> {{ $t('help_screen.content.trips.info_alert_1') }} <span class="font-medium uppercase ml-1 mr-1"> {{ $t('help_screen.content.trip_details.title') }} </span> {{ $t('help_screen.content.trips.info_alert_2') }}
            </Alert>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();
    const imageAssets = import.meta.globEager(
    `/src/assets/images/help/trips/*.{jpg,jpeg,png,svg}`
    );
</script>