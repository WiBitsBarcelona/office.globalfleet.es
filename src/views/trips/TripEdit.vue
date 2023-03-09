<template>
    <!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <div class="grid grid-cols-12 gap-6">


            <!-- <form @submit.prevent="$emit('updateTripForm', trip)"> -->


            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <label for="vertical-form-1" class="form-label">Nombre</label>
                <input v-model="trip.name" id="vertical-form-1" type="text" class="form-control" required />
            </div>

            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <label for="vertical-form-2" class="form-label">Número referencia</label>
                <input v-model="trip.reference_number" id="vertical-form-2" type="text" class="form-control" placeholder="secret" />
            </div>


            
            <div class="col-span-12 md:col-span-12 lg:col-span-12 gap-4">

                <button 
                    @click.prevent="emit('cancelEdit')" 
                    class="btn btn-danger mt-5 mr-3"
                >
                    {{ $t("cancel") }}
                </button>

                <button 
                    @click.prevent="emit('updateTripForm', note)" 
                    class="btn btn-primary mt-5"
                >
                    {{ $t("save") }}
                </button>


            </div>

            <!-- </form> -->
        </div>

        <!-- END: Page Layout -->
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import useTrips from '@/composables/trips';

const { trip, getTrip } = useTrips();

const props = defineProps(['tripId'])

const emit = defineEmits(['cancelEdit', 'updateTripForm'])

onMounted(async () => {
    await getTrip(props.tripId);
});
</script>



