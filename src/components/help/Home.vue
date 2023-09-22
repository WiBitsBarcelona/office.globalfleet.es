<template>
    <div class="box intro-x w-full h-full p-5">
        <h2 class="font-medium text-xl sm:text-2xl">{{ $t('help_screen.content.home.title') }}</h2>
        <div class="text-justify leading-relaxed mt-5">
            <p class="mb-5">{{ $t('help_screen.content.home.intro_text') }}</p>
            <h2 class="font-medium">{{ $t('help_screen.content.home.trips_title') }}</h2>
            <img class="inline-flex mt-3 mb-5 shadow-md" :src = "imageAssets['/src/assets/images/help/home/h-1.png'].default"/>
            <ul class="ml-10 mb-5 list-disc">
                <li class="mb-1"><span class="font-medium">{{ $t('help_screen.content.home.new_trips') }}</span>{{ $t('help_screen.content.home.new_trips_text') }}</li>
                <li class="mb-1"><span class="font-medium">{{ $t('help_screen.content.home.pending_trips') }}</span>{{ $t('help_screen.content.home.pending_trips_text') }}</li>
                <li class="mb-1"><span class="font-medium">{{ $t('help_screen.content.home.current_trips') }}</span>{{ $t('help_screen.content.home.current_trips_text') }}</li>
                <li class="mb-1"><span class="font-medium">{{ $t('help_screen.content.home.finished_trips') }}</span>{{ $t('help_screen.content.home.finished_trips_text') }}</li>
            </ul>
            <h2 class="font-medium">{{ $t('help_screen.content.home.devices_title') }}</h2>
            <img class="inline-flex mt-3 mb-5 shadow-md" :src = "imageAssets['/src/assets/images/help/home/h-2.png'].default"/>
            <p class="mb-5">{{ $t('help_screen.content.home.devices_text_1') }}<sup class="text-orange-500">1</sup>{{ $t('help_screen.content.home.devices_text_2') }}<sup class="text-orange-500">2</sup>{{ $t('help_screen.content.home.devices_text_3') }}</p>
            <p class="mb-5">{{ $t('help_screen.content.home.devices_text_4') }}</p>
            <img class="inline-flex mt-3 mb-5 w-1/4 shadow-md" :src = "imageAssets['/src/assets/images/help/home/h-3.png'].default"/>
            <p class="mb-5">{{ $t('help_screen.content.home.devices_text_5') }}</p>
            <p class="mb-5">{{ $t('help_screen.content.home.devices_text_6') }}</p>
            <ul class="ml-10 list-decimal mt-5 mb-5">
                <li>{{ $t('help_screen.content.home.devices_li_1') }}</li>
                <li>{{ $t('help_screen.content.home.devices_li_2') }}
                    <ul class="ml-5 mt-1">
                        <li><span class="font-medium text-gray-300">{{ $t('help_screen.content.home.devices_li_2_1_title') }}</span> - {{ $t('help_screen.content.home.devices_li_2_1_text') }}</li>
                        <li><span class="font-medium text-gray-500">{{ $t('help_screen.content.home.devices_li_2_2_title') }}</span> - {{ $t('help_screen.content.home.devices_li_2_2_text') }}</li>
                        <li><span class="font-medium text-orange-500">{{ $t('help_screen.content.home.devices_li_2_3_title') }}</span> - {{ $t('help_screen.content.home.devices_li_2_3_text') }}</li>
                        <li><span class="font-medium text-blue-500">{{ $t('help_screen.content.home.devices_li_2_4_title') }}</span> - {{ $t('help_screen.content.home.devices_li_2_4_text') }}</li>
                        <li><span class="font-medium text-green-500">{{ $t('help_screen.content.home.devices_li_2_5_title') }}</span> - {{ $t('help_screen.content.home.devices_li_2_5_text') }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { useI18n } from "vue-i18n";
    const { t } = useI18n();
    const imageAssets = import.meta.globEager(
    `/src/assets/images/help/home/*.{jpg,jpeg,png,svg}`
    );
</script>