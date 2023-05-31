<template>
<!-- BEGIN: Page Layout -->
<div class="relative">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">{{ $t("dashboard.title") }}</h2>
            <a href="" class="ml-auto flex items-center text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> {{ $t("dashboard.reload") }}
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <NavigationIcon class="report-box__icon text-primary" />

                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">10</div>
                  <div class="text-base text-slate-500 mt-1">{{ $t("dashboard.trips") }}</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <AlertTriangleIcon class="report-box__icon text-pending" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">2</div>
                  <div class="text-base text-slate-500 mt-1">{{ $t("dashboard.warnings") }}</div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <MessageCircleIcon class="report-box__icon text-primary" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">3</div>
                  <div class="text-base text-slate-500 mt-1">
                    {{ $t("dashboard.chats") }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <FileTextIcon class="report-box__icon text-primary" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">1</div>
                  <div class="text-base text-slate-500 mt-1">
                    {{ $t("dashboard.docs") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->

        <!-- BEGIN: Weekly Top Seller -->
        <div class="col-span-8 sm:col-span-6 lg:col-span-3 mt-6">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Weekly Top Seller</h2>
            <a href="" class="ml-auto text-primary truncate">Show More</a>
          </div>
          <div class="intro-y box p-5 mt-5">
            <div class="mt-3">
              <ReportPieChart :height="213" />
            </div>
            <div class="w-52 sm:w-auto mx-auto mt-8">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <span class="truncate">17 - 30 Years old</span>
                <span class="font-medium ml-auto">62%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                <span class="truncate">31 - 50 Years old</span>
                <span class="font-medium ml-auto">33%</span>
              </div>
              <div class="flex items-center mt-4">
                <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <span class="truncate">>= 50 Years old</span>
                <span class="font-medium ml-auto">10%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Weekly Top Seller -->

        <!-- BEGIN: Official Store -->
        <div class="col-span-12 xl:col-span-9 mt-6">
          <div class="intro-y block sm:flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">Official Store</h2>
            <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
              <MapPinIcon
                class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
              />
              <input
                type="text"
                class="form-control sm:w-56 box pl-10"
                placeholder="Filter by city"
              />
            </div>
          </div>
          <div class="intro-y box p-5 mt-12 sm:mt-5">
            <div>
              250 Official stores in 21 countries, click the marker to see
              location details.
            </div>
            <ReportMap class="report-maps mt-5 bg-slate-200 rounded-md" />
          </div>
        </div>
        <!-- END: Official Store -->

        <div class="col-span-12 xl:col-span-9 2xl:col-span-12 z-10">
        <div class="mt-6 -mb-6 intro-y">
          <Alert
            class="box bg-primary text-white flex items-center mb-6"
            v-slot="{ dismiss }"
          >
            <span>
              Introducing new dashboard! Download now at
              <a
                href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                class="underline ml-1"
                target="blank"
                >themeforest.net</a
              >.
              <button
                class="rounded-md bg-white bg-opacity-20 dark:bg-darkmode-300 hover:bg-opacity-30 py-0.5 px-2 -my-3 ml-2"
              >
                Live Preview
              </button>
            </span>
            <button
              type="button"
              class="btn-close text-white"
              @click="dismiss"
              aria-label="Close"
            >
              <XIcon class="w-4 h-4" />
            </button>
          </Alert>
        </div>
      </div>


    </div>
</div>
<!-- END: Page Layout -->
</template>

<script setup>
  import ReportPieChart from "@/components/report-pie-chart/Main.vue";
  import ReportMap from "@/components/report-map/Main.vue";


  
</script>