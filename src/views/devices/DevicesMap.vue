<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-1 mt-8">
            <div class="col-span-10 intro-y mb-5">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("devices_of") }} <span class="text-xl font-bold">{{ useAuthentication.getUser.employee.company.name }}</span></h2>
            </div>
            <div class="col-span-2 intro-y mb-5 text-end">
                <router-link :to="`/devices-history`" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2"
                    :class="{ 'btn-primary': route.name == 'devices-history' }">
                    <ClockIcon class="w-4 h-4 mr-2" /> {{ $t("devices_history") }}
                </router-link>
            </div>
            <!-- BEGIN: Devices Map -->
            <DevicesMap />
            <!-- END: Devices Map -->

        </div>
    </div>
</template>

<script setup>
    import DevicesMap from "@/components/devices/Map.vue";
    import { useRoute } from "vue-router";
    import { useAuthenticationStore } from '@/stores/auth/authentications';
    const route = useRoute();
    const useAuthentication = useAuthenticationStore();
</script>