<template>
    <div class="grid grid-cols-3 gap-3 mt-4 mb-4">

        <div>

            <router-link 
                :to="`/documents`" 
                class="btn btn-primary shadow-md rounded-md w-full font-medium"
            >
                {{ $t("documents.general_files") }}
            </router-link>

        </div>

        <div>

            <router-link :to="`/drivers-documents`" class="btn btn-primary shadow-md rounded-md w-full font-medium">
                {{ $t("documents.driver_files") }}
            </router-link>

        </div>


        <div>

            <router-link :to="`/trip-documents`" class="btn btn-primary shadow-md rounded-md w-full font-medium">
                {{ $t("documents.trip_files") }}
            </router-link>

        </div>

    </div>
</template>

<script setup>

</script>
