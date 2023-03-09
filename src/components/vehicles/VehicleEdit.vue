<template>

	<!-- BEGIN: Page Layout -->
	<div class="intro-y box p-5 mt-5">

		holaaa

		<div class="grid grid-cols-12 gap-6">
			<form class="space-y-6" @submit.prevent="$emit('updateVehicleForm', vehicle)">
				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<label for="name" class="form-label">
						Email
					</label>
					<input v-model="vehicle.plate" id="name" type="text" class="form-control w-full" required />
				</div>
				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="flex flex-row gap-4">

						<button
							class="btn btn-primary mt-5"
						>
							{{ $t("save") }}
						</button>

						<button
							@click.prevent="emit('cancelEdit')"
							class="btn btn-danger mt-5"
						>
							{{ $t("cancel") }}
						</button>

					</div>
				</div>
			</form>
		</div>
		
	
	<!-- END: Page Layout -->
	</div> 
	
	
</template>



<script setup>

	import { onMounted } from "vue";
	import useVehicles from "@/composables/vehicles";

	const { vehicle, getVehicle } = useVehicles();

	const props = defineProps(['vehicleId'])

	const emit = defineEmits(['cancelEdit', 'updateVehicleForm'])

	onMounted(async () => {

	

		await getVehicle(props.vehicleId);
	});

</script>
