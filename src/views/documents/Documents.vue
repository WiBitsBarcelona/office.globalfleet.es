<template>
  <div class="grid grid-cols-12 gap-6 mt-4">
    <div class="col-span-12">
      <div class="intro-y flex flex-col-reverse sm:flex-row items-center">
        <TabGroup class="col-span-12 w-full border-black border-opacity-10 border-t sm:border-t-0 border-l md:border-l-0 border-dashed -ml-4 pl-4 md:ml-0 md:pl-0">
            <TabList class="nav-pills w-3/4 bg-slate-200 dark:bg-black/10 rounded-md mx-auto p-1">
              <Tab class="w-full py-1.5 px-2 font-medium" tag="button">{{ $t("documents.general_files") }}</Tab>
              <Tab class="w-full py-1.5 px-2 font-medium" tag="button">{{ $t("documents.driver_files") }}</Tab>
              <Tab class="w-full py-1.5 px-2 font-medium" tag="button">{{ $t("documents.trip_files") }}</Tab>
            </TabList>
            <TabPanels class="mt-4">
              <TabPanel>
                <div class="col-span-12">
                  <GeneralDocuments />
                </div>
              </TabPanel>
              <TabPanel>
                <div class="col-span-12">
                  <DriversDocuments />
                </div>
              </TabPanel> 
              <TabPanel>
                <div class="col-span-12">
                  <TripsDocuments />
                </div>
              </TabPanel>
            </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
  import GeneralDocuments from "@/components/documents/GeneralDocuments.vue";
  import DriversDocuments from "@/components/documents/DriversDocuments.vue";
  import TripsDocuments from "@/components/documents/TripsDocuments.vue";
</script>