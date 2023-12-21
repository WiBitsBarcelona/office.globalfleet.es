<template>
    
    <div class="grid grid-cols-4 gap-3 mt-4 mb-4 intro-y">

        <div>
            <router-link :to="`/incidents/drivers`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-drivers'}">
                {{ $t("breadcrumbs.incidents-drivers") }}

                {{ incidentDriverTotal }}

            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/trips`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-trips'}">
                {{ $t("breadcrumbs.incidents-drivers") }}
            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/stages`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-stages'}">
                {{ $t("breadcrumbs.incidents-stages") }}
            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/tasks`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-tasks'}">
                {{ $t("breadcrumbs.incidents-tasks") }}
            </router-link>
        </div>

    </div>

</template>

<script setup>

    import { useRoute } from "vue-router";
    import { onMounted, ref } from 'vue';


    const route = useRoute();

    const incidentDriverTotal = ref(0);

    const props = defineProps(['incidentDriverTotal']);


    onMounted(() => {

        incidentDriverTotal.value = props.incidentDriverTotal;
        console.log("Desde Button", incidentDriverTotal.value);

    });



</script>

<style scoped>

</style>