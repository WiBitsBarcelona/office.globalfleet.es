<template>
  <div class="grid grid-cols-12 gap-6 mt-4">
    <div class="col-span-12">
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <TabGroup class="col-span-12 w-full border-black border-opacity-10 border-t sm:border-t-0 border-l md:border-l-0 border-dashed -ml-4 pl-4 md:ml-0 md:pl-0">
            <TabList class="nav-pills w-3/4 bg-slate-200 dark:bg-black/10 rounded-md mx-auto p-1">
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.driver_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >3</span>
              </Tab>
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.trip_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >1</span>
              </Tab>
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.stage_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >2</span>
              </Tab>
              <Tab class="w-full py-1.5 px-2 font-medium inline-flex justify-center items-center gap-2" tag="button">
                {{ $t("incidences.task_incidences") }}
                <span
                  class="inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium bg-white text-primary"
                  >0</span>
              </Tab>
              
            </TabList>
            <TabPanels class="mt-4">
              <TabPanel>
                <div class="col-span-12">
                    <DriversIncidences />
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                    INCIDENCIAS VIAJES
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                  INCIDENCIAS ETAPAS
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                  INCIDENCIAS TAREAS
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import DriversIncidences from "@/components/incidences/Drivers.vue";

</script>
