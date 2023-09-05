<template>
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("documents.driver_files") }}</h2>
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

    import DriversDocuments from "@/components/documents/DriversDocuments.vue";
    import DocumentButtons from '@/components/documents/DocumentButtons.vue';

</script>

<style lang="scss" scoped>

</style>