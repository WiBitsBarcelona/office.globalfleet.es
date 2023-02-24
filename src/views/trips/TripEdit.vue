<template><!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <div class="grid grid-cols-12 gap-6">

            <div class="col-span-12 md:col-span-12 lg:col-span-12">
                <label for="name" class="form-label">
                    Email
                </label>
                <input 
                    v-model="trip.name"
                    id="name" 
                    type="text" 
                    class="form-control" 
                    required 
                />
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-12">
                <label for="vertical-form-2" class="form-label">Password</label>
                <input id="vertical-form-2" type="text" class="form-control" placeholder="secret" />
            </div>



            <div class="col-span-12 md:col-span-12 lg:col-span-12 content-center">
                <button class="btn btn-primary mt-5">{{ $t("save") }}</button>
            </div>

        </div>

        <!-- END: Page Layout -->
    </div>
</template>



<script setup>
    import { onMounted } from "vue";
    import useTrips from '@/composables/trips';
    const { trip, getTrip } = useTrips();

    const props = defineProps(['noteId'])

    const emit = defineEmits(['cancelEdit', 'updateNoteForm'])


    onMounted(async () => {
        getNote(props.noteId)
    })
</script>



