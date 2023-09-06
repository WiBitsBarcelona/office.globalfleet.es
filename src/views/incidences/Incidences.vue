<template>
  <div class="grid grid-cols-12 gap-6 mt-8">
    <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("incidences.title") }}</h2>
            </div>
    <div class="col-span-12">
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <TabGroup class="col-span-12 w-full border-black border-opacity-10 border-t sm:border-t-0 border-l md:border-l-0 border-dashed -ml-4 pl-4 md:ml-0 md:pl-0">
            <TabList class="nav-pills w-3/4 bg-slate-200 dark:bg-black/10 rounded-md mx-auto p-1">
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.driver_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >{{ newDriverIncidences.emittedValue }}</span>
              </Tab>
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.trip_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >{{ newTripIncidences.emittedValue }}</span>
              </Tab>
               <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.stage_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >{{ newStageIncidences.emittedValue }}</span>
              </Tab>
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.task_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >{{ newTaskIncidences.emittedValue }}</span>
              </Tab>
              
            </TabList>
            <TabPanels class="mt-4">
              <TabPanel>
                <div class="col-span-12">
                    <DriversIncidences @totalNewDriverIncidences = 'loadNewDriverIncidences'/>
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                  <TripsIncidences @totalNewTripIncidences = 'loadNewTripIncidences'/>
                </div>
              </TabPanel>
               <TabPanel>
                <div class="col-span-12">
                  <StagesIncidences @totalNewStageIncidences = 'loadNewStageIncidences'/>
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                  <TasksIncidences @totalNewTaskIncidences = 'loadNewTaskIncidences'/>
                </div>
              </TabPanel> 
            </TabPanels>
          </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import DriversIncidences from "@/components/incidences/Drivers.vue";
import TripsIncidences from "@/components/incidences/Trips.vue";
import StagesIncidences from "@/components/incidences/Stages.vue";
import TasksIncidences from "@/components/incidences/Tasks.vue";

let newDriverIncidences = reactive({
  emittedValue: 0
});

let newTripIncidences = reactive({
  emittedValue: 0
});

let newStageIncidences = reactive({
  emittedValue: 0
});

let newTaskIncidences = reactive({
  emittedValue: 0
});

const loadNewDriverIncidences= (emittedValue) => {
  newDriverIncidences.emittedValue = emittedValue;
}

const loadNewTripIncidences= (emittedValue) => {
  newTripIncidences.emittedValue = emittedValue;
}

const loadNewStageIncidences= (emittedValue) => {
  newStageIncidences.emittedValue = emittedValue;
}

const loadNewTaskIncidences= (emittedValue) => {
  newTaskIncidences.emittedValue = emittedValue;
}

</script>
