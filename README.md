# Project Office Globalfleet

Vue 3 + Vite

## Installation

Install Node.js and Install Yarn.

Package install:

```sh 

yarn install

```


Run development:

```sh 

yarn run dev

or

yarn run dev --port 3010

```

Compile to production use:

```sh 

yarn build

```

## Documentation

The Documentation folder inside the project. **[Link](http://enigma-vue.left4code.com/)**


## Access main

```sh 

Rol: Admin
Email: webmaster@globalfleet.es
Pass: Fleet2022

```






## Preloader:

```sh 

<template>
    
    ...
    
    <Preloader v-if="loading" />
    
    ...

</template>




<script setup>
    ...

    //import 
    import Preloader from '@/components/preloader/Preloader.vue';

    //init
    const loading = ref(false);

    //set value
    loading.value = true; 

    ...

</script>

```



## Message Toast:

```sh 

...
//import 
import { Toast } from '@/utils/toast';

...


//call
await Toast(t("message.record_updated"), 'success');

```



## Message Swal:

```sh 
...
import Swal from "sweetalert2";
...


Example to implement:


        Swal.fire({
			icon: 'warning',
			title: t("documents.swal.are_you_sure"),
			html: '<span class="font-medium">' + t("delete_user_title") + '</span><br /><div class="mt-2 text-sm italic"> ' + name + ' ' + surname + '</div>',
			showCancelButton: true,
			confirmButtonText: t("documents.swal.yes"),
			cancelButtonText: t("documents.swal.no"),
			confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
		}).then(async(result) => {
			if (result.isConfirmed) {

				await destroyEmployee(id);

				if(errors.value.length > 0){

					let e = '';
					errors.value.forEach(error => {
						console.log(error);
						e += error;
					});


					Swal.fire(t("message.error"), e, 'error');
					
				}else{
					tableData.value = await findData();
					initTabulator();
					reInitOnResizeWindow();
					Swal.fire(t("message.record_deleted"), '', 'success');
				}

			}

		});


```