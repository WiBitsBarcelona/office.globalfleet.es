<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("vehicles") }}</h2>
            </div>
            <div class="col-span-2 w-full intro-y">
                <div class="sm:ml-auto mt-3 mb-3 w-full sm:mt-0 relative text-slate-500">
                    <MapPinIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                    <input type="search" class="form-control sm:w-full box pl-10 search-cancel" placeholder="Filtrar por matrícula"
                        v-model="searchPlate" />
                </div>
                <div class="box p-3 intro-x h-[650px] overflow-y-auto">
                    <div>
                        <table id="vehicles" class="table table-hover hover:cursor-pointer overflow-scroll w-full">
                            <tbody v-for="vehicle in searchedPlates" :key="vehicle" class="overflow-y-auto">
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        {{ vehicle.plate }}
                                    </td>
                                    <td>
                                        <Tippy tag="button" class="tooltip primary ml-4 mr-2" content="Circulando"
                                            :options="{ theme: 'light' }">
                                            <TruckIcon class="w-5 h-5 text-primary"></TruckIcon>
                                        </Tippy>

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-span-10 w-full intro-y">
                <div class="box p-1 intro-x h-[700px]">
                    <VehiclesMap class="vehicles-maps bg-slate-200 rounded-md" />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import VehiclesMap from "@/components/vehicles-map/Main.vue";
import useVehicles from "@/composables/vehicles";

const { vehicles, getVehicles } = useVehicles();
const vehiclesArray = ref([]);

const findData = async () => {
    await getVehicles();
    console.log({ ...vehicles });
}

findData();

const searchPlate = ref("");

const searchedPlates = computed(() => {
    return vehicles.value.filter((vehicle) => {
        return (
            vehicle.plate
                .toLowerCase()
                .indexOf(searchPlate.value.toLowerCase()) != -1
        );
    });
});



</script>