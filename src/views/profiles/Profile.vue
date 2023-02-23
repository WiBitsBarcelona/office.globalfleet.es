<template>
<!-- BEGIN: Page Layout -->
    <div class="intro-y box p-5 mt-5">

        <div class="grid grid-cols-12 gap-6">
            
            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <label for="vertical-form-1" class="form-label">Email</label>
                <input id="vertical-form-1" type="text" class="form-control" placeholder="example@gmail.com" />
            </div>

            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <label for="vertical-form-2" class="form-label">Password</label>
                <input id="vertical-form-2" type="text" class="form-control" placeholder="secret" />
            </div>
            


            <div class="col-span-12 md:col-span-4 lg:col-span-4">
                <input id="vertical-form-3" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label" for="vertical-form-3">Remember me</label>
            </div>



            <div class="col-span-12 md:col-span-12 lg:col-span-12 content-center">
                <button class="btn btn-primary mt-5">{{ $t("save") }}</button>
            </div>

        </div>

    </div>

<!-- END: Page Layout -->
</template>
  
<script setup>


</script>
  