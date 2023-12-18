<template>
    <div class="grid grid-cols-12 gap-6 mt-8">
        <div class="col-span-12 intro-y">
            <h2 class="text-lg font-medium truncate mr-5">{{ $t("documents.driver_files") }} <span class="text-xl font-bold">{{ useAuthentication.getUser?.employee.company.name }}</span></h2>
        </div>
    </div>
<div>
    <DocumentButtons />
</div>

<div>
    <DriversDocuments />
</div>
</template>

<script setup>
import DriversDocuments from "@/components/documents/driver_documents/DriverDocumentShow.vue";
import DocumentButtons from '@/components/documents/DocumentButtons.vue';
import { useAuthenticationStore } from '@/stores/auth/authentications';

const useAuthentication = useAuthenticationStore();
</script>