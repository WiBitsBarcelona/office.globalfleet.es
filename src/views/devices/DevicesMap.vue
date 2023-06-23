<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("devices") }}</h2>
            </div>
            <!-- BEGIN: Devices Map -->
            <DevicesMap />
            <!-- END: Devices Map -->

        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DevicesMap from "@/components/devices/Map.vue";
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