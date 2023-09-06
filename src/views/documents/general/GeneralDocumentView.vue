<template>
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("documents.general_files") }}</h2>
            </div>
        </div>
    <div>
        <DocumentButtons />
    </div>

    <div>
        <GeneralDocuments />
    </div>

</template>

<script setup>

    import GeneralDocuments from "@/components/documents/GeneralDocuments.vue";
    import DocumentButtons from '@/components/documents/DocumentButtons.vue';

</script>
