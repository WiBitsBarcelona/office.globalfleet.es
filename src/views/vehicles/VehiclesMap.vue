<template>
    <div class="relative">
        <div class="grid grid-cols-12 gap-6 mt-8">
            <div class="col-span-12 intro-y">
                <h2 class="text-lg font-medium truncate mr-5">{{ $t("vehicles") }}</h2>
            </div>
            <div class="col-span-2 w-full intro-y">
                <div class="sm:ml-auto mt-3 mb-3 w-full sm:mt-0 relative text-slate-500">
                    <MapPinIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                    <input type="text" class="form-control sm:w-full box pl-10" placeholder="Filtrar por matrícula" />
                </div>
                <div class="box p-3 intro-x h-[650px]">
                    <div class="overflow-x-auto">
                        <table class="table table-hover hover:cursor-pointer">
                            <tbody>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        1234LMT
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        5298KTF
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        9491MBF
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        6642KGY
                                    </td>
                                </tr>  
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        2241JTF
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        1903KGT
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        9493MBF
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        4592LMT
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        1614FYR
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-md font-bold leading-6 text-gray-500">
                                        2567JYR
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
import VehiclesMap from "@/components/vehicles-map/Main.vue";



</script>