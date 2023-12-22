<template>
    
    <div class="grid grid-cols-4 gap-3 mt-4 mb-4 intro-y">

        <div>
            <router-link :to="`/incidents/drivers`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-drivers'}">
                {{ $t("breadcrumbs.incidents-drivers") }}
                {{ totalDriverIncidents }}
            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/trips`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-trips'}">
                {{ $t("breadcrumbs.incidents-trips") }}
                {{ totalTripIncidents }}
            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/stages`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-stages'}">
                {{ $t("breadcrumbs.incidents-stages") }}
                {{ totalStageIncidents }}
            </router-link>
        </div>

        <div>
            <router-link :to="`/incidents/tasks`" class="btn btn-gray shadow-md rounded-md w-full font-medium" :class="{'btn-primary' : route.name == 'incidents-tasks'}">
                {{ $t("breadcrumbs.incidents-tasks") }}
                {{ totalTaskIncidents }}
            </router-link>
        </div>


    </div>

</template>

<script setup>

    import { useRoute } from "vue-router";
    import { ref, onMounted, watch } from 'vue';

    

    const route = useRoute();


    const props = defineProps([
        'totalDriverIncidents', 
        'totalTripIncidents',
        'totalStageIncidents',
        'totalTaskIncidents',
    ]);


    const tDriverIncidents = ref(props.totalDriverIncidents);
    const tTripIncidents = ref(props.totalTripIncidents);
    const tStageIncidents = ref(props.totalStageIncidents);
    const tTaskIncidents = ref(props.totalTaskIncidents);



    watch(tDriverIncidents,
        () => props.totalDriverIncidents
    );

    watch(tTripIncidents,
        () => props.totalTripIncidents
    );

    watch(tStageIncidents,
        () => props.totalStageIncidents
    );

    watch(tTaskIncidents,
        () => props.totalTaskIncidents
    );









  




    
    

    

    // import useDriverIncident from "@/composables/driver_incidents";
    // import useStageIncident from "@/composables/stage_incidents";
    // import useTaskIncident from "@/composables/task_incidents";
    // import useTripIncident from "@/composables/trip_incidents";
    
    // const { getDriverIncidents, driverIncidents } = useDriverIncident();
    // const { getStageIncidents, stageIncidents } = useStageIncident();
    // const { getTaskIncidents, taskIncidents } = useTaskIncident();
    // const { getTripIncidents, tripIncidents } = useTripIncident();


    // const totalDriverIncidents = ref(0);
    // const totalTripIncidents = ref(0);
    // const totalStageIncidents = ref(0);
    // const totalTaskIncidents = ref(0);

    // onMounted(async () => {

    //     await getDriverIncidents();
    //     //console.log(driverIncidents.value.length);
    //     //totalDriverIncidents.value = driverIncidents.value.length;
    //     totalDriverIncidents.value = driverIncidents.value.filter(elem => elem.readed_at === null).length;




    //     await getTripIncidents();
    //     //console.log(tripIncidents.value.length);
    //     //totalTripIncidents.value = tripIncidents.value.length;
    //     totalTripIncidents.value = tripIncidents.value.filter(elem => elem.readed_at === null).length;



        
    //     await getStageIncidents();
    //     //console.log(stageIncidents.value.length);
    //     //totalStageIncidents.value = stageIncidents.value.length;
    //     totalStageIncidents.value = stageIncidents.value.filter(elem => elem.readed_at === null).length;


    //     await getTaskIncidents();
    //     //console.log(taskIncidents.value.length);
    //     //totalTaskIncidents.value = taskIncidents.value.length;
    //     totalTaskIncidents.value = taskIncidents.value.filter(elem => elem.readed_at === null).length;
        

    // });





</script>

<style scoped>

</style>