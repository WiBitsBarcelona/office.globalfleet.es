<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-1 mt-8">
            <div class="col-span-12 intro-y mb-5">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("devices") }}</h2>
            </div>
            <!-- BEGIN: Devices Map -->
            <DevicesMap />
            <!-- END: Devices Map -->

        </div>
    </div>
</template>

<script setup>
import DevicesMap from "@/components/devices/Map.vue";
</script>