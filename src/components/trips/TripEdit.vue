<template>
	<!-- HEADER -->
	<h2 class="text-lg font-medium truncate mr-5 mb-5 mt-10">
		{{ $t("edit") }}
	</h2>

	<Preloader v-if="loading" />


	<!-- BEGIN: Page Layout -->
	<div class="intro-y box p-5 mt-5" v-if="isCreateTrip">
		<!-- BEGIN: Form -->
		<form class="validate-form" @submit.prevent="save">

			<div class="grid grid-cols-12 gap-1 mb-8">

				<div class="col-span-8">
					<h2 class="text-lg font-medium">
						{{ $t("trip") }}
					</h2>
				</div>

				<!-- BEGIN: Buttons -->

				<div class="col-span-4 text-right">


					<div class="flex justify-end">

						<router-link :to="`/trips`" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
							<CornerUpLeftIcon class="w-4 h-4" /> {{ $t("message.back") }}
						</router-link>

						<button type="submit" class="btn btn-primary mr-2">
							{{ $t("save") }}
						</button>

						<a href="#" @click.prevent="deleteTripForm(trip.id)" class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
							<TrashIcon class="w-4 h-4" />
						</a>

					</div>


				</div>

				<!-- END: Buttons -->

			</div>



			<!-- BEGIN: container -->
			<div class="grid grid-cols-12 gap-6">


				<div class="col-span-12 md:col-span-6 lg:col-span-8">
					<div class="input-form">
						<label for="name" class="form-label w-full">
							{{ $t("name") }}
						</label>
						<input v-model.trim="validate.name.$model" id="name" type="text" name="name" class="form-control"
							:class="{ 'border-danger': validate.name.$error }" />
						<template v-if="validate.name.$error">
							<div v-for="(error, index) in validate.name.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="reference_number" class="form-label w-full">
							{{ $t("reference_number") }}
						</label>
						<input v-model.trim="validate.reference_number.$model" id="reference_number" type="text"
							name="reference_number" class="form-control"
							:class="{ 'border-danger': validate.reference_number.$error }" />
						<template v-if="validate.reference_number.$error">
							<div v-for="(error, index) in validate.reference_number.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>



				<div class="col-span-12 md:col-span-6 lg:col-span-3">
					<div class="input-form">
						<label for="execution_at" class="form-label w-full">
							{{ $t("execution_at") }}
						</label>
						<input v-model.trim="validate.execution_at.$model" id="execution_at" type="datetime-local"
							name="execution_at" class="form-control"
							:class="{ 'border-danger': validate.execution_at.$error }" />
						<template v-if="validate.execution_at.$error">
							<div v-for="(error, index) in validate.execution_at.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-5">
					<div class="input-form">
						<label for="trip_priority_id" class="form-label w-full">
							{{ $t("trip_priority") }}
						</label>
						<TomSelect v-model.trim="validate.trip_priority_id.$model" id="trip_priority_id"
							name="trip_priority_id" :options="{
								placeholder: $t('message.select'),
							}" class="form-control w-full" :class="{ 'border-danger': validate.trip_priority_id.$error }">

							<option :value="0"></option>
							<option v-for="item in selectTripPriorities" :value="item.id">
								{{ item.name }}
							</option>

						</TomSelect>

						<template v-if="validate.trip_priority_id.$error">
							<div v-for="(error, index) in validate.trip_priority_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>


				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<div class="input-form">
						<label for="vehicle_id" class="form-label w-full">
							{{ $t("vehicle") }}
						</label>

						<TomSelect v-model.trim="validate.vehicle_id.$model" id="vehicle_id" name="vehicle_id" :options="{
							placeholder: $t('message.select'),
						}" class="form-control w-full" :class="{ 'border-danger': validate.vehicle_id.$error }">

							<option :value="0"></option>
							<option v-for="item in selectVehicles" :value="item.id">
								{{ item.plate }}
							</option>

						</TomSelect>

						<template v-if="validate.vehicle_id.$error">
							<div v-for="(error, index) in validate.vehicle_id.$errors" :key="index"
								class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>



				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="driver_id" class="form-label w-full">
							{{ $t("driver") }}
						</label>

						<TomSelect v-model.trim="validate.driver_id.$model" id="driver_id" name="driver_id" :options="{
							placeholder: $t('message.select'),
						}" class="form-control w-full" :class="{ 'border-danger': validate.driver_id.$error }">

							<option :value="0"></option>
							<option v-for="item in selectDrivers" :value="item.id">
								{{ item.name }} {{ item.surname }}
							</option>

						</TomSelect>


						<template v-if="validate.driver_id.$error">
							<div v-for="(error, index) in validate.driver_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>




				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="trip_tow" class="form-label w-full">
							{{ $t("trip_tow") }}
						</label>

						<TomSelect v-model.trim="validate.trip_tow_id.$model" id="trip_tow_id" name="trip_tow_id" :options="{
							placeholder: $t('message.select'),
						}" class="form-control w-full" :class="{ 'border-danger': validate.trip_tow_id.$error }">

							<option v-for="item in selectTripTows" :value="item.id">
								{{ item.plate }}
							</option>

						</TomSelect>


						<template v-if="validate.trip_tow_id.$error">
							<div v-for="(error, index) in validate.trip_tow_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>




				<div class="col-span-12 md:col-span-4 lg:col-span-4">
					<div class="input-form">
						<label for="trip_status_id" class="form-label w-full">
							{{ $t("trip_status") }}
						</label>

						<TomSelect v-model.trim="validate.trip_status_id.$model" id="trip_status_id" name="trip_status_id" :options="{
							placeholder: $t('message.select'),
						}" class="form-control w-full" :class="{ 'border-danger': validate.trip_status_id.$error }">

							<option v-for="item in selectTripStatuses" :value="item.id">
								{{ item.name }}
							</option>

						</TomSelect>


						<template v-if="validate.trip_status_id.$error">
							<div v-for="(error, index) in validate.trip_status_id.$errors" :key="index" class="text-danger mt-2">
								{{ error.$message }}
							</div>
						</template>
					</div>
				</div>





				<div class="col-span-12 md:col-span-12 lg:col-span-12">
					<div class="input-form">
						<label for="observations" class="form-label w-full">
							{{ $t("observations") }}
						</label>

						<textarea v-model.trim="validate.observations.$model" id="observations" name="observations"
							class="form-control">
			  			</textarea>

					</div>
				</div>


			</div>
			<!-- END: container -->

		</form>
		<!-- END: Form -->

		<div 
			class="grid grid-cols-12 gap-1 mt-10 mb-10" 
			v-if="idTripEnabled()"
		>
			<div class="col-span-12 md:col-span-12 lg:col-span-12 text-end">

				<a href="#" class="btn btn-outline border-slate-200 w-1/2 sm:w-auto mr-2" @click="showActionStageForm">
					<PlusCircleIcon class="w-4 h-4" /> {{ $t("add_action_stage") }}
				</a>

				<a href="#" class="btn btn-outline-primary w-1/2 sm:w-auto mr-2" @click="showStageForm">
					<PlusCircleIcon class="w-4 h-4" /> {{ $t("add_stage") }}
				</a>

			</div>
		</div>



		<div class="flex justify-end mb-2">
			<p class="text-md font-normal leading-6 text-gray-500">
				<span class="font-light text-gray-400">
					 {{ $t("message.total_action_stage") }}: {{ arrStages.length }}
				</span>
			</p>
		</div>
		

		<!-- Stage Card -->
		<div v-for="(stage, index) in arrStages" :key="stage.id">
			<!-- v-if -->
			<div v-if="stage.activity">
				<!-- class="p-4 rounded border border-slate-200 text-slate-500 shadow mb-2" -->

				<!-- Stage -->
				<div class="relative">
					<div class="md:flex items-center md:space-x-4 mb-3">
						<div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
							<div
								class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
							</div>
						</div>

						<div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-full">
							<div class="grid grid-cols-6 gap-2 mb-5 pb-2">
								<div class="col-span-6">
									<div class="flex flex-row justify-between">

										<p class="text-md font-normal leading-6 text-gray-500">
											<span class="text-xs font-light text-gray-400">
												({{ stage.order_number }}) {{ $t("stage") }} 
											</span> {{ stage.name }}
										</p>

										<div class="text-right" v-show="idTripEnabled()">

											<!-- <a href="#" @click.prevent="arrStageItemUp(stage.id)"
												class="btn btn-outline-primary w-1/2 sm:w-auto mr-2"
												v-if="arrStages.length > 1 && index != 0">
												<ArrowUpIcon class="w-4 h-4" />
											</a>
											<a href="#" @click.prevent="arrStageItemDown(stage.id)"
												class="btn btn-outline-primary w-1/2 sm:w-auto mr-2"
												v-if="arrStages.length > 1 && index != (arrStages.length - 1)">
												<ArrowDownIcon class="w-4 h-4" />
											</a> -->

											<a href="#" @click.prevent="showTaskForm(stage)"
												class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
												<PlusCircleIcon class="w-4 h-4" /> {{ $t("add_task") }}
											</a>
											
											<a href="#" @click.prevent="showStageEditForm(stage.id)"
												class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
												<EditIcon class="w-4 h-4" />
											</a>

											<a href="#" @click.prevent="deleteStageForm(stage.id)"
												class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
												<TrashIcon class="w-4 h-4" />
											</a>

										</div>

									</div>

								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("reference_number") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ stage.reference_number }}
									</p>
								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("activity") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ stage.activity.type.name }} 
									</p>
								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ stage.type.name }}
									</p>
								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("customer") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ stage.client_name }}
									</p>
								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("tow") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ (stage.tows.length > 0) ? stage.tows[0].tow.plate : '' }}
									</p>
								</div>

								<div class="col-span-1">
									<h5 class="text-xs font-light text-gray-400">{{ $t("execution_at") }}:</h5>
									<p class="text-md font-normal leading-6 text-gray-500">
										{{ stage.execution_at }}
									</p>
								</div>
							</div>


							<!-- Tasks -->
							<div v-for="task in stage.tasks" :key="task.id">

								<div
									class="mt-5 space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.20rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

									<div class="relative">
										<div class="md:flex items-center md:space-x-4 mb-3">
											<div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
												<div
													class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
												</div>
											</div>
											<div
												class="w-full p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">
												<div class="grid grid-cols-4 gap-2 mb-5pb-2">

													<div class="col-span-4">

														<div class="flex flex-row justify-between">

															<p class="text-md font-normal leading-6 text-gray-500 mt-2">
																<span class="text-xs font-light text-gray-400">
																	({{ task.order_number }}) {{ $t("task") }}:
																</span>
																{{ task.name }}
															</p>

															<div class="text-right" v-show="idTripEnabled()">

																<a href="#" @click.prevent="showActionTaskForm(stage, task)"
																	class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
																	<PlusCircleIcon class="w-4 h-4" /> {{
																		t("add_action_task") }}
																</a>
																<a href="#" @click.prevent="showTaskEditForm(task.id)"
																	class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
																	<EditIcon class="w-4 h-4" />
																</a>
																<a href="#"
																	@click.prevent="deleteTaskForm(task.id)"
																	class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
																	<TrashIcon class="w-4 h-4" />
																</a>
															</div>

														</div>

													</div>



													<!-- Action Tasks -->
													<div v-for="action_task in task.actions" :key="action_task.id">

														

															<div class="col-span-4">
																<h5 class="text-xs font-light text-gray-400">{{ $t("action")
																}}:</h5>
																<p class="text-xs font-normal leading-6 text-gray-500">
																	{{ action_task.type.name }}
																</p>
															</div>



															<!-- Action Cameras -->
															<div class="col-span-4">
																<div v-for="camera in action_task.cameras" :key="camera.id">

																	<div>
																		<h5 class="text-xs font-light text-gray-400">{{
																			$t("type") }}:</h5>
																		<p
																			class="text-xs font-normal leading-6 text-gray-500">
																			{{ action_task.type.name }}
																		</p>
																	</div>

																</div>
															</div>
															<!-- End of Action Cameras -->



															<!-- Action Scanner -->
															<div class="col-span-4">
																<div v-for="scanner in action_task.scanners"
																	:key="scanner.id">


																	<div>
																		<h5 class="text-xs font-light text-gray-400">{{
																			$t("type") }}:</h5>
																		<p
																			class="text-xs font-normal leading-6 text-gray-500">
																			{{ action_task.type.name }}
																		</p>
																	</div>

																</div>
															</div>
															<!-- End of Action Scanner -->




															<!-- Action Form -->
															<div class="col-span-4">
																<div v-for="form in action_task.forms" :key="form.id">

																	<div class="grid grid-cols-6 gap-2">

																		<div class="col-span-3">
																			<h5 class="text-xs font-light text-gray-400">{{
																				$t("action") }}:</h5>
																			<p
																				class="text-xs font-normal leading-6 text-gray-500">
																				{{ form.name }}
																			</p>
																		</div>

																		<div class="col-span-3">
																			<h5 class="text-xs font-light text-gray-400">{{
																				$t("name") }}:</h5>
																			<p
																				class="text-xs font-normal leading-6 text-gray-500">
																				{{ form.form_field.field_label  }}
																			</p>
																		</div>

																	</div>
																</div>
															</div>
															<!-- End of Action Form -->


														</div>
													

												</div>
												<!-- End Action Tasks -->

											</div>
										</div><!-- Card -->
									</div>
								</div>
							</div>

							<!-- End Task 1 Stage 1 -->


						</div>

					</div>

				</div>
				<!-- End Stage -->

			</div>

			<!-- v-else -->
			<div v-else>

				<!-- Action Stages -->
				<div v-for="action_stage in stage.actions" :key="action_stage.id">

					<div class="relative">
						<div class="md:flex items-center md:space-x-4 mb-3">
							<div class="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
								<div
									class="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow md:order-1 dark:bg-darkmode-600 dark:border-gray-700">
								</div>
							</div>

							<div class="p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44 w-3/4">
								<div class="grid grid-cols-6 gap-2 mb-5 pb-2">

									<div class="col-span-6">
										<div class="flex flex-row justify-between">

											<p class="text-md font-normal leading-6 text-gray-500">
												<span class="text-xs font-light text-gray-400">
													({{ stage.order_number }}) {{ $t("action") }}
												</span> {{ stage.name }}
											</p>

											<div class="text-right" v-show="idTripEnabled()">

												<!-- <a href="#" @click.prevent="arrStageItemUp(stage.id)"
													class="btn btn-outline-primary w-1/2 sm:w-auto mr-2"
													v-if="arrStages.length > 1 && index != 0">
													<ArrowUpIcon class="w-4 h-4" />
												</a>
												<a href="#" @click.prevent="arrStageItemDown(stage.id)"
													class="btn btn-outline-primary w-1/2 sm:w-auto mr-2"
													v-if="arrStages.length > 1 && index != (arrStages.length - 1)">
													<ArrowDownIcon class="w-4 h-4" />
												</a> -->

												<a href="#" @click.prevent="showActionStageEditForm(stage.id, action_stage.id)"
													class="btn btn-outline-primary w-1/2 sm:w-auto mr-2">
													<EditIcon class="w-4 h-4" />
												</a>

												<a href="#" @click.prevent="deleteStageForm(stage.id)"
													class="btn btn-outline-danger w-1/2 sm:w-auto mr-2">
													<TrashIcon class="w-4 h-4" />
												</a>

											</div>

										</div>

									</div>





									<!-- Action Cameras -->
									<div class="col-span-6">
										<div v-for="camera in action_stage.action_cameras" :key="camera.id">

											<div>
												<h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
												<p class="text-xs font-normal leading-6 text-gray-500">
													{{ action_stage.type.name }}
												</p>
											</div>

										</div>
									</div>
									<!-- End of Action Cameras -->



									<!-- Action Scanner -->
									<div class="col-span-6">
										<div v-for="scanner in action_stage.action_scanners" :key="scanner.id">


											<div>
												<h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
												<p class="text-xs font-normal leading-6 text-gray-500">
													{{ action_stage.type.name }}
												</p>
											</div>

										</div>
									</div>
									<!-- End of Action Scanner -->




									<!-- Action Form -->
									<div class="col-span-6">
										<div v-for="form in action_stage.action_forms" :key="form.id">

											<div class="grid grid-cols-6 gap-2">
												<div class="col-span-3">
													<h5 class="text-xs font-light text-gray-400">{{ $t("type") }}:</h5>
													<p class="text-xs font-normal leading-6 text-gray-500">
														{{ action_stage.type.name }}
													</p>
												</div>

												<div class="col-span-3">
													<h5 class="text-xs font-light text-gray-400">{{ $t("name") }}:</h5>
													<p class="text-xs font-normal leading-6 text-gray-500">
														{{ form.form_field.field_label }}
													</p>
												</div>
											</div>

										</div>
									</div>
									<!-- End of Action Form -->

								</div>
								<!-- End <div class="grid grid-cols-6 gap-2 mb-5 pb-2"> -->
							</div>
						</div>
					</div>
					<!-- End relative -->
				</div>
				<!-- End Action Stages -->

			</div>
			<!-- End v-else -->

		</div>

	</div>
	<!-- End of Stage Card -->





	<!-- CREATE - ADD -->

	<div class="intro-y box p-5 mt-5" v-if="isCreateStage">
		<StageCreate 
			@cancelStageForm="cancelStageForm" 
			@addStageForm="addStageForm" 
			:arrStages="arrStages" 
			:trip_tow_selected="trip_tow_selected"
		/>
	</div>

	<div class="intro-y box p-5 mt-5" v-if="isCreateActionStage">
		<ActionStageCreate @cancelActionStageForm="cancelActionStageForm" @addActionStageForm="addActionStageForm"
			:arrStages="arrStages" />
	</div>



	<div class="intro-y box p-5 mt-5" v-if="isCreateTask">
		<TaskCreate :stageIndex="stageIndex" @cancelTaskForm="cancelTaskForm" @addTaskForm="addTaskForm" />
	</div>




	<div class="intro-y box p-5 mt-5" v-if="isCreateActionTask">
		<ActionTaskCreate 
			:stageIndex="stageIndex" 
			:taskIndex="taskIndex" 
			@cancelActionTaskForm="cancelActionTaskForm"
			@addActionTaskForm="addActionTaskForm" />
	</div>


	

	<!-- EDIT -->

	<div class="intro-y box p-5 mt-5" v-if="isEditStage">
		<StageEdit 
			@cancelStageEditForm="cancelStageEditForm" 
			@updateStageForm="updateStageForm"
			:stageId="stageId"
		/>
	</div>


	<div class="intro-y box p-5 mt-5" v-if="isEditActionStage">
		<ActionStageEdit 
			@cancelActionStageEditForm="cancelActionStageEditForm" 
			@updateActionStageEditForm="updateActionStageEditForm"
			:actionStageId="actionStageId" 
		/>
	</div>



	<div class="intro-y box p-5 mt-5" v-if="isEditTask">
		<TaskEdit 
			@cancelTaskEditForm="cancelTaskEditForm" 
			@updateTaskForm="updateTaskForm"
			:taskId="taskId"
		/>
	</div>



	
	
</template>
  
  
<script setup>

import { onMounted, reactive, toRefs, ref } from 'vue';
import Preloader from '@/components/preloader/Preloader.vue';
import { useRouter } from 'vue-router';



import { Toast } from '@/utils/toast';
import { helper as $h } from "@/utils/helper";
import Swal from "sweetalert2";
import { useRoute } from 'vue-router';


import useTrips from '@/composables/trips.js';
import useTripPriority from '@/composables/trip_priorities.js';
import useTripTow from '@/composables/trip_tows.js';
import useTripStatus from '@/composables/trip_statuses.js';
import useTow from '@/composables/tows.js';
import useVehicles from '@/composables/vehicles.js';
import useDrivers from '@/composables/drivers.js';



import useStage from '@/composables/stages.js';
import useActionStage from '@/composables/action_stages.js';
import useActionStageCamera from '@/composables/action_stage_cameras.js';
import useActionStageScanner from '@/composables/action_stage_scanners.js';
import useActionStageForm from '@/composables/action_stage_forms.js';
import useStageTow from '@/composables/stage_tows.js';

import useActivity from '@/composables/activities.js';

import useTask from '@/composables/tasks.js';
import useActionTask from '@/composables/action_tasks.js';
import useActionTaskCamera from '@/composables/action_task_cameras.js';
import useActionTaskScanner from '@/composables/action_task_scanners.js';
import useActionTaskForm from '@/composables/action_task_forms.js';



// By Add - create
import StageCreate from '@/components/stages/StageEditByAdd.vue';
import ActionStageCreate from '@/components/action_stages/ActionStageEditByAdd.vue';
import TaskCreate from '@/components/tasks/TaskEditByAdd.vue';
import ActionTaskCreate from '@/components/action_tasks/ActionTaskEditByAdd.vue';

// By Edit
import StageEdit from '@/components/stages/StageEdit.vue';
import ActionStageEdit from '@/components/action_stages/ActionStageEdit.vue';
import TaskEdit from '@/components/tasks/TaskEdit.vue';




import { required, minLength, maxLength, email, url, integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';


import enumActionTask from '@/enums/enum_action_task.js';
import enumTrip from '@/enums/enum_trip.js';







const loading = ref(false);



const { vehicles, getVehicles } = useVehicles();
const { tripPriorities, getTripPriorities } = useTripPriority();
const { drivers, getDrivers } = useDrivers();
const { tows, getTows } = useTow();


const { trip, tripErrors, updateTrip, getTrip, destroyTrip } = useTrips();
const { tripStatuses, tripStatusErrors, getTripStatuses } = useTripStatus();

const { stage, stageErrors, storeStage, updateStage, destroyStage } = useStage();
const { activity, activityErrors, storeActivity, updateActivity } = useActivity();

const { task, taskErrors, storeTask, updateTask, destroyTask } = useTask();
const { actionTask, actionTaskErrors, storeActionTask } = useActionTask();
const { actionTaskCamera, actionTaskCameraErrors, storeActionTaskCamera } = useActionTaskCamera();
const { actionTaskScanner, actionTaskScannerErrors, storeActionTaskScanner } = useActionTaskScanner();
const { actionTaskForm, actionTaskFormErrors, storeActionTaskForm } = useActionTaskForm();


const { actionStage, actionStageErrors, storeActionStage, updateActionStage } = useActionStage();
const { actionStageCamera, actionStageCameraErrors, storeActionStageCamera, updateActionStageCamera } = useActionStageCamera();
const { actionStageScanner, actionStageScannerErrors, storeActionStageScanner, updateActionStageScanner } = useActionStageScanner();
const { actionStageForm, actionStageFormErrors, storeActionStageForm, updateActionStageForm } = useActionStageForm();

const { tripTow, errorTripTow, storeTripTow, updateTripTow } = useTripTow();
const { stageTow, errorStageTow, storeStageTow, updateStageTow } = useStageTow();



const { t } = useI18n();
const route = useRoute();
const router = useRouter();


const selectVehicles = ref([]);
const selectTripPriorities = ref([]);
const selectDrivers = ref([]);
const selectTripTows = ref([]);
const selectTripStatuses = ref([]);


const arrStages = ref([]);


//Create - Add
const isCreateTrip = ref(true);
const isCreateStage = ref(false);
const isCreateTask = ref(false);
const isCreateActionTask = ref(false);
const isCreateActionStage = ref(false);


//Edit
const isEditStage = ref(false);
const isEditActionStage = ref(false);

const isEditTask = ref(false);




const stageIndex = ref();
const taskIndex = ref();

const stageId = ref();
const actionStageId = ref(0);
const taskId = ref();


const trip_tow_selected = ref(); //trip_tow selected





const rules = {
	vehicle_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	trip_status_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	trip_priority_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	driver_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	trip_tow_id: {
		required: helpers.withMessage(t("form.required"), required),
	},
	reference_number: {
		required: helpers.withMessage(t("form.required"), required),
	},
	name: {
		required: helpers.withMessage(t("form.required"), required),
	},
	execution_at: {
		required: helpers.withMessage(t("form.required"), required),
	},
	observations: {
	},
};



// const formData = reactive({
//   vehicle_id: "",
//   trip_status_id: "",
//   trip_priority_id: "",
//   driver_id: "",
//   trip_tow_id: "",
//   reference_number: Math.floor(Math.random() * 100000),
//   name: "Viaje Plaza",
//   execution_at: $h.nowTimestamp('-').substr(0, 16),
//   observations: "",
// });



const formData = reactive({
	vehicle_id: "",
	trip_status_id: "",
	trip_priority_id: "",
	driver_id: "",
	trip_tow_id: "",
	reference_number: "",
	name: "",
	execution_at: $h.nowTimestamp('-').substr(0, 16),
	observations: "",
});


const validate = useVuelidate(rules, toRefs(formData));



/******************
 * Trip
 *****************/

const save = async () => {

	validate.value.$touch();
	if (validate.value.$invalid) {
		//TODO
	} else {


		if (arrStages.value.length <= 0) {
			Swal.fire({
				icon: 'warning',
				title: t("message.it_must_have_action_stage"),
				showCancelButton: false,
				confirmButtonText: t("message.ok"),
				confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
			});
			return;
		}

		//Validacion sobre los stage

		//loading.value = true;



		/**
		 * Trip tows
		 */
		 const dataTripTowUpdate = {
			trip_id: trip.value.id,
			tow_id: formData.trip_tow_id
		}

		await updateTripTow(trip.value.tows[0].id, dataTripTowUpdate);
		console.log("TRIPTOW: ", { ...tripTow });




		/**
		 * Trip
		 */
		
		await updateTrip(trip.value.id, formData);
		console.log({ ...trip.value });
		
		//console.log({ ...tripErrors.value });


		await findData();


		//loading.value = false;


		await Toast(t("message.record_saved"), 'success');
		

	}
};


const deleteTripForm = async(id) => {


	Swal.fire({
			icon: 'warning',
			title: t("message.record_will_be_deleted"),
			showCancelButton: true,
			confirmButtonText: t("message.yes"),
			cancelButtonText: t("message.no"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {

				await destroyTrip(id);
				
				console.log({...tripErrors.value});


				if(tripErrors.value && tripErrors.value.length > 0){
					
					await Toast(t('message.error'), 'error');
					
				}else{

					localStorage.setItem('message_success', t('message.record_saved'));
					await router.push('/trips');

				}

			
			}

		});

}


/******************
 * End Trip
 *****************/








/******************
 * Stage
 *****************/

 //Create - add
const showStageForm = () => {
	isCreateTrip.value = false;
	isCreateStage.value = true;
	trip_tow_selected.value = formData.trip_tow_id;

	//console.log({ ...arrStages.value });
}

const cancelStageForm = () => {
	isCreateTrip.value = true;
	isCreateStage.value = false;
}

const addStageForm = async (stageNew) => {

	/**
	 * Stage
	 */
	stageNew.trip_id = trip.value.id;
	await storeStage(stageNew);

	console.log({ ...stage.value });


	/**
	* Activity
	*/
	const activityNew = {
		stage_id: stage.value.id,
		activity_type_id: stageNew.activity_type_id
	}

	await storeActivity(activityNew);
	console.log({ ...activity.value });


	/**
	 * Tow stage
	 */
	const towNew = {
		stage_id: stage.value.id,
		tow_id: stageNew.tow_id
	}

	await storeStageTow(towNew);
	console.log({ ...stageTow.value });


	await findData();


	//Load view
	isCreateTrip.value = true;
	isCreateStage.value = false;
}


const deleteStageForm = async (id) => {

	Swal.fire({
			icon: 'warning',
			title: t("message.record_will_be_deleted"),
			showCancelButton: true,
			confirmButtonText: t("message.yes"),
			cancelButtonText: t("message.no"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {

				await destroyStage(id);
				
				if(stageErrors.value.length > 0){
					console.log({...stageErrors.value});
					await Toast(t('message.error_deleting_record'), 'error');
					return;
				}

				await findData();

				await Toast(t('message.record_deleted'), 'success');

			}

		});

}



// Edit

const showStageEditForm = (id) => {
	isCreateTrip.value = false;
	isEditStage.value = true;
	stageId.value = id;
}


const cancelStageEditForm = () => {
	isCreateTrip.value = true;
	isEditStage.value = false;
}

const updateStageForm = async(id, stageUpdate) => {

	await updateStage(id, stageUpdate);
	console.log({ ...stage.value });


	/**
	* Activity
	*/
	const activityUpdate = {
		stage_id: stage.value.id,
		activity_type_id: stageUpdate.activity_type_id
	}

	await updateActivity(stageUpdate.activity_id, activityUpdate);
	console.log({ ...activity.value });


	/**
	* Tow stage
	*/

	const towUpdate = {
		stage_id: stage.value.id,
		tow_id: stageUpdate.tow_id
	}

	if(stageUpdate.stage_tow_id){
		await updateStageTow(stageUpdate.stage_tow_id, towUpdate);
		console.log({ ...stageTow.value });
	}else{
		await storeStageTow(towUpdate);
		console.log({ ...stageTow.value });
	}


	await findData();

	isCreateTrip.value = true;
	isEditStage.value = false;


	//TODO implement
//	await Toast(t("message.record_updated"), 'success');

}





/******************
 * End Stage
 *****************/







/******************
 * Task
 *****************/

// Create - Add

const showTaskForm = (stage) => {
	isCreateTrip.value = false;
	isCreateTask.value = true;
	stageIndex.value = { ...stage };
}


const cancelTaskForm = () => {
	isCreateTrip.value = true;
	isCreateTask.value = false;
}


const addTaskForm = async(stageNew, taskNew) => {
	
	taskNew.stage_id = stageNew.id;
	await storeTask(taskNew);
	console.log({ ...task.value });

	await findData();
	
	isCreateTrip.value = true;
	isCreateTask.value = false;
}

const deleteTaskForm = async(taskId) => {

	Swal.fire({
			icon: 'warning',
			title: t("message.record_will_be_deleted"),
			showCancelButton: true,
			confirmButtonText: t("message.yes"),
			cancelButtonText: t("message.no"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {

				await destroyTask(taskId);

				//console.log({...taskErrors.value});

				taskErrors.value.forEach((elem) => {
					console.log(elem.e);
				})

				await findData();

				await Toast(t('message.record_deleted'), 'success');

			}

		});
	
}


//Edit 


const showTaskEditForm = (id) => {
	isCreateTrip.value = false;
	isEditTask.value = true;
	taskId.value = id;
}



const cancelTaskEditForm = () => {
	isCreateTrip.value = true;
	isEditTask.value = false;
}


const updateTaskForm = async(taskId, taskUpdate) => {

	await updateTask(taskId, taskUpdate);
	console.log({ ...task.value });

	await findData();

	isCreateTrip.value = true;
	isEditTask.value = false;


}

/******************
 * End Task
 *****************/









/**
 * Action Task
 */

const showActionTaskForm = (stage, task) => {
	isCreateTrip.value = false;
	isCreateActionTask.value = true;
	stageIndex.value = { ...stage };
	taskIndex.value = { ...task };
}



const cancelActionTaskForm = () => {
	isCreateTrip.value = true;
	isCreateActionTask.value = false;
}



const addActionTaskForm = async (stage, taskNew, actionTaskNew) => {

	actionTaskNew.task_id = taskNew.id;

	await storeActionTask(actionTaskNew);
	console.log({ ...actionTask.value });


	/**
	 *  Action task cameras
	 */
	if (parseInt(actionTaskNew.action_type_model) === enumActionTask.CAMERA_ID) {

		const actionTaskCameraObj = {
			action_task_id: actionTask.value.id
		}

		await storeActionTaskCamera(actionTaskCameraObj);
		console.log({ ...actionTaskCamera.value });

	}


	/**
	* Action task scanners
	*/
	if (parseInt(actionTaskNew.action_type_model) === enumActionTask.SCANNER_ID) {

		const actionTaskScannerObj = {
			action_task_id: actionTask.value.id
		}

		await storeActionTaskScanner(actionTaskScannerObj);
		console.log({ ...actionTaskScanner.value });

	}


	/**
	* Action task forms
	*/
	if (parseInt(actionTaskNew.action_type_model) === enumActionTask.FORM_ID) {

		const actionTaskFormObj = {
			action_task_id: actionTask.value.id,
			action_form_field_id: actionTaskNew.action_form_field_id,
		}

		await storeActionTaskForm(actionTaskFormObj);
		console.log({ ...actionTaskForm.value });

	}





	await findData();

	isCreateTrip.value = true;
	isCreateActionTask.value = false;
}


/**
 * End Action Task
 */











 /******************
 * Action Stage
 *****************/

 // Store
const showActionStageForm = () => {
	isCreateTrip.value = false;
	isCreateActionStage.value = true;
}

const cancelActionStageForm = () => {
	isCreateTrip.value = true;
	isCreateActionStage.value = false;
}

const addActionStageForm = async(stageNew, actionStageNew) => {

	/**
	 * Stage
	 */
	stageNew.trip_id = trip.value.id;
	await storeStage(stageNew);

	console.log({ ...stage.value });


	actionStageNew.stage_id = stage.value.id;
	await storeActionStage(actionStageNew);
	console.log({ ...actionStage.value });


	/**
	 *  Action stage cameras
	 */
	if (parseInt(actionStageNew.action_type_model) === enumActionTask.CAMERA_ID) {

		const actionStageCameraObj = {
			action_stage_id: actionStage.value.id
		}

		await storeActionStageCamera(actionStageCameraObj);
		console.log({ ...actionStageCamera.value });

	}


	/**
	 * Action stage scanners
	 */
	if (parseInt(actionStageNew.action_type_model) === enumActionTask.SCANNER_ID) {

		const actionStageScannerObj = {
			action_stage_id: actionStage.value.id
		}

		await storeActionStageScanner(actionStageScannerObj);
		console.log({ ...actionStageScanner.value });

	}


	/**
	 * Action stage forms
	 */
	if (parseInt(actionStageNew.action_type_model) === enumActionTask.FORM_ID) {

		const actionStageFormObj = {
			action_stage_id: actionStage.value.id,
			action_form_field_id: actionStageNew.action_form_field_id,
		}

		await storeActionStageForm(actionStageFormObj);
		console.log({ ...actionStageForm.value });

	}

	
	await findData();



	isCreateTrip.value = true;
	isCreateActionStage.value = false;

}



//Edit

const showActionStageEditForm = (stageEditId, actionStageEditId) => {
	isCreateTrip.value = false;
	isEditActionStage.value = true;
	actionStageId.value = actionStageEditId;
}


const cancelActionStageEditForm = () => {
	isCreateTrip.value = true;
	isEditActionStage.value = false;
}

const updateActionStageEditForm = async (actionStageId, stageFake, actionStageUpdate) => {

	//TODO update stage
	// update action stage

	//enviar solo el order en el fake

	const stageFakeUpdate = {
		name: stageFake.name,
		order_number: stageFake.order_number,
	}
	await updateStage(stageFake.id, stageFakeUpdate);
	console.log({ ...stage.value });


	await updateActionStage(actionStageId, actionStageUpdate);
	console.log({ ...actionStage.value });



	await findData();

	isCreateTrip.value = true;
	isEditActionStage.value = false;

}


/******************
* End Action Stage
*****************/






/**
 * Check
 */

 const idTripEnabled = () => {

	if(trip.value.trip_status_id === enumTrip.TRIP_CREATED_ID 
		|| trip.value.trip_status_id === enumTrip.TRIP_ASSIGNED_ID 
		|| trip.value.trip_status_id === enumTrip.TRIP_PENDING_CONFIRMATION_ID 
		|| trip.value.trip_status_id === enumTrip.TRIP_PENDING_TO_DO_ID
		|| trip.value.trip_status_id === enumTrip.TRIP_PROGRESS_ID
	)
	{
		return true;
	}

	return false;
	
 }








// const arrStageItemDown = (id) => {
// 	let findIndex = arrStages.value.findIndex(stage => stage.id === id);
// 	let elementTemp = arrStages.value.splice(findIndex, 1)[0];
// 	arrStages.value.splice((findIndex + 1), 0, elementTemp);
// 	fixNumberOrder();
// }


// const arrStageItemUp = (id) => {
// 	let findIndex = arrStages.value.findIndex(stage => stage.id === id);
// 	let elementTemp = arrStages.value.splice(findIndex, 1)[0];
// 	arrStages.value.splice((findIndex - 1), 0, elementTemp);
// 	fixNumberOrder();
// }



// const fixNumberOrder = () => {
// 	arrStages.value.forEach((stage, index) => {
// 		stage.order_number = (index + 1);
// 	});
// }








const findData = async() => {


	

	await getTrip(route.params.id);

	arrStages.value = trip.value.stages;

	//console.log({...trip.value});
	//console.log("Cantidad de stages: " , trip.value.stages.length);

	formData.trip_priority_id = trip.value.trip_priority_id.toString();
	formData.driver_id = trip.value.driver_id.toString();
	formData.vehicle_id = trip.value.vehicle_id.toString();
	formData.trip_status_id = trip.value.trip_status_id.toString();
	
	formData.reference_number = trip.value.reference_number;
	formData.name = trip.value.name;
	formData.execution_at = trip.value.execution_at;
	formData.started_at = trip.value.started_at;
	formData.finished_at = trip.value.finished_at;
	formData.observations = trip.value.observations;


	if(trip.value.tows.length > 0){
		formData.trip_tow_id = trip.value.tows[0].tow.id.toString();
	}

}


onMounted(async () => {
  
	loading.value = true;

  // Vehicles
  await getVehicles();
  selectVehicles.value = vehicles.value;


  //Priorities
  await getTripPriorities();
  selectTripPriorities.value = tripPriorities.value;


  //Driver
  await getDrivers();
  selectDrivers.value = drivers.value;


  //Trip Statuses
  await getTripStatuses();
  selectTripStatuses.value = tripStatuses.value;


  //Tows trip
  await getTows();
  selectTripTows.value = tows.value;
  
  
  await findData();

  loading.value = false;

}); 


</script>
