<template>
    <div class="grid grid-cols-3 gap-3 mt-4 mb-4">

        <div>

            <router-link :to="`/documents`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'documents'}">
                {{ $t("documents.general_files") }}
            </router-link>

        </div>

        <div>

            <router-link :to="`/drivers-documents`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'drivers-documents'}">
                {{ $t("documents.driver_files") }}
            </router-link>

        </div>


        <div>

            <router-link :to="`/trip-documents`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'trip-documents'}">
                {{ $t("documents.trip_files") }}
            </router-link>

        </div>

    </div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    const route= useRoute();
</script>
