<template>
    <Modal id="incidencesModal" size="modal-xl" backdrop="static" :show="incidencesModal" @hidden="incidencesModal = false">
        <ModalBody class="px-2 py-5 text-center text-gray-500">
            <h2 class="text-lg font-medium  ml-5">{{ $t("trip_details.title") }}</h2>
            <p>{{ trip_name }}</p>
            <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
                @click="hideIncidencesModal">
            </XIcon>
            <table class="table table-report mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th class="whitespace-nowrap w-300">{{ $t("incidences.Tabulator.type") }}</th>
                        <th class="text-center whitespace-nowrap">{{ $t("incidences.Tabulator.sended_at") }}</th>
                        <th class="text-center whitespace-nowrap">{{ $t("incidences.Tabulator.received_at") }}</th>
                        <th class="text-center whitespace-nowrap">{{ $t("trip_details.options") }}</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="incidence in incidences_array" :key="incidence.id">
                        <tr v-if="incidence.level == 'trip'" class="intro-y"
                            :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
                            <td>
                                <PaperclipIcon class="w-4 h-4 mr-1" />
                            </td>
                            <td>
                                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                                    {{ $t('trip') }}: <span class="font-light">{{ incidence.level_name }}</span>
                                </div>
                            </td>
                            <td class="text-center">{{ incidence.sended_at }}</td>
                            <td class="text-center">{{ incidence.receptioned_at }}</td>
                            <td class="table-report__action">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3" href="javascript:;"
                                        @click="showIncidenceDetailModal(incidence.id)">
                                        <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="incidence.level == 'stage'" class="intro-y"
                            :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
                            <td>
                                <PaperclipIcon class="w-4 h-4 mr-1" />
                            </td>
                            <td>
                                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                                    {{ $t('stage') }}: <span class="font-light">{{ incidence.level_name }}</span>
                                </div>
                            </td>
                            <td class="text-center">{{ incidence.sended_at }}</td>
                            <td class="text-center">{{ incidence.receptioned_at }}</td>
                            <td class="table-report__action">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3" href="javascript:;"
                                        @click="showIncidenceDetailModal(incidence.id)">
                                        <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="incidence.level == 'task'" class="intro-y"
                            :class="{ 'text-primary dark:text-white': incidence.has_seen == 0 }">
                            <td>
                                <PaperclipIcon class="w-4 h-4 mr-1" />
                            </td>
                            <td>
                                <span class="font-medium whitespace-nowrap">{{ incidence.type }}</span>
                                <div class="text-xs font-medium whitespace-nowrap mt-0.5">
                                    {{ $t('task') }}: <span class="font-light">{{ incidence.level_name }}</span>
                                </div>
                            </td>
                            <td class="text-center">{{ incidence.sended_at }}</td>
                            <td class="text-center">{{ incidence.receptioned_at }}</td>
                            <td class="table-report__action">
                                <div class="flex justify-center items-center">
                                    <a class="flex items-center mr-3" href="javascript:;"
                                        @click="showIncidenceDetailModal(incidence.id)">
                                        <EyeIcon class="w-4 h-4 mr-1" /> {{ $t("trip_details.view") }}
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <Modal :show="incidenceDetails" @hidden="incidenceDetails = false" backdrop="static">
                <ModalBody class="text-center">
                    <h2 class="text-lg font-medium text-left ml-5">{{ $t("incidences.Modal.title") }}</h2>
                    <XIcon class="absolute top-0 right-0 mt-3 mr-3 w-8 h-8 text-slate-400 hover:cursor-pointer"
                        @click="hideIncidenceDetailModal">
                    </XIcon>
                    <div class="grid grid-cols-12 gap-6 mx-3 mt-5 items-center justify-center">
                        <div
                            class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-center dark:bg-gray-800 dark:text-gray-400">
                            <p class="text-md text-l font-bold leading-5 text-gray-500">{{ currentIncName }}</p>
                        </div>
                        <div
                            class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.type") }}</h5>
                            <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncType }}</p>
                        </div>
                        <div
                            class="col-span-12 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.comment") }}</h5>
                            <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncDescription }}</p>
                        </div>
                        <div
                            class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.sended_at") }}</h5>
                            <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncSended }}</p>
                        </div>
                        <div
                            class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.received_at") }}</h5>
                            <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncReceptioned }}</p>
                        </div>
                        <div class="col-span-3"></div>
                        <div
                            class="col-span-6 rounded-md bg-gray-100 p-1 pb-1 text-left dark:bg-gray-800 dark:text-gray-400">
                            <h5 class="text-xs font-light text-gray-400">{{ $t("incidences.Tabulator.readed_at") }}</h5>
                            <p class="text-md font-normal leading-4 text-gray-500">{{ currentIncReaded }}</p>
                        </div>
                        <div class="col-span-3"></div>
                        <div class="col-span-12">
                            <table class="table table-report">
                                <tbody>
                                    <template v-for="incidence_image in incidences_images_array" :key="incidence_image.id">
                                        <tr v-if="incidence_image.parent_id == currentIncId" class="intro-x"
                                            :class="{ 'text-primary': incidence_image.has_seen == 0 }">
                                            <td>
                                                <PaperclipIcon class="w-4 h-4 mr-1" />
                                            </td>
                                            <td>
                                                <span class="font-medium whitespace-nowrap">{{ incidence_image.name
                                                }}</span>
                                            </td>
                                            <td class="table-report__action w-30">
                                                <div class="flex justify-right items-end">
                                                    <a class="flex items-end mr-3" href="javascript:;"
                                                        @click="incidenceFile(incidence_image.id, incidence_image.path, incidence_image.has_seen, incidence_image.name, 0, currentIncLevel)">
                                                        <Tippy tag="icon" variant="primary" :options="{
                                                            theme: 'translucent',
                                                            zIndex: 99999,
                                                        }" :content="$t('trip_details.view')">
                                                            <EyeIcon class="w-4 h-4 mr-1" />
                                                        </Tippy>
                                                    </a>
                                                    <a class="flex items-end mr-3" href="javascript:;"
                                                        @click="incidenceFile(incidence_image.id, incidence_image.path, incidence_image.has_seen, incidence_image.name, 1, currentIncLevel)">
                                                        <Tippy tag="icon" variant="primary" :options="{
                                                            theme: 'translucent',
                                                            zIndex: 99999,
                                                        }" :content="$t('trip_details.download')">
                                                            <DownloadIcon class="w-4 h-4 mr-1" />
                                                        </Tippy>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-span-12 flex mt-5 justify-center">
                            <button type="button" @click="hideIncidenceDetailModal" class="btn btn-secondary w-60 mr-5">
                                {{ $t("incidences.Modal.btn_close") }}
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </ModalBody>
    </Modal>
</template>

<script setup>

</script>