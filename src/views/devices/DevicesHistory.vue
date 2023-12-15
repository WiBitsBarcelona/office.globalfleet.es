<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-1 mt-8">
            <div class="col-span-10 intro-y mb-5">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("devices_history_of") }} <span class="text-xl font-bold">{{ useAuthentication.getUser?.employee.company.name }}</span></h2>
            </div>
            <div class="col-span-2 intro-y mb-5 text-end">
                <router-link :to="`/devices`" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2"
                    :class="{ 'btn-primary': route.name == 'devices' }">
                    <CornerUpLeftIcon class="w-4 h-4 mr-2" /> {{ $t("documents.return") }}
                </router-link>
            </div>
            <!-- BEGIN: History -->
             <History /> 
            <!-- END: History -->

        </div>
    </div>
</template>

<script setup>
import History from "@/components/devices/History.vue";
import { useRoute } from "vue-router";
import { useAuthenticationStore } from '@/stores/auth/authentications';

const useAuthentication = useAuthenticationStore();
const route = useRoute();

</script>