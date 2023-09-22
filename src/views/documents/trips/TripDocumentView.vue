<template>
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("documents.trip_files") }} <span class="text-xl font-bold">{{ company.name }}</span></h2>
            </div>
        </div>
    <div>
        <DocumentButtons />
    </div>

    <div>

        <TripsDocuments />

    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import TripsDocuments from "@/components/documents/TripsDocuments.vue";
    import DocumentButtons from '@/components/documents/DocumentButtons.vue';


    import useCompany from '@/composables/companies.js';
    import { useAuthenticationStore } from '@/stores/auth/authentications';

    const { company, getCompany } = useCompany();
    const useAuthentication = useAuthenticationStore();

    onMounted(async () => {
      await getCompany(useAuthentication.getUser.employee.company_id);
    });
</script>

<style lang="scss" scoped>

</style>