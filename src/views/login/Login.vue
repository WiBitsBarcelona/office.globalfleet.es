<template>
  <div>
    <!-- <LocaleSelect/> -->
    <AuthFooter/>

    <div>
      <Preloader v-if="loading" />
    </div>
    

    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
<!--           <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="GlobalFleet - Office"
              class="w-6"
              src="@/assets/images/fleet-logo.svg"
            />
            <span class="text-white text-lg ml-3"> GlobalFleet </span>
          </a> -->
          <div class="my-auto">
            <img
              alt="GlobalFleet - Office"
              class="-intro-x w-1/2 -mt-16"
              src="@/assets/images/globalfleet-office-logo-white-translucent.svg"
            />
            <div
              class="-intro-x text-white font-light text-4xl leading-tight mt-10"
            >
              The driver`s fellow
            </div>
<!--             <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              Manage all your e-commerce accounts in one place
            </div> -->
          </div>
        </div>
        <!-- END: Login Info -->

        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
            <div
              class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
            >
            <form @submit.prevent="handleSubmit">
              <h2
                class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
              >
              {{ $t("login.title") }}
              </h2>
              <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
                {{ $t("login.subtitle") }}
              </div>
              <div class="intro-x mt-8">
                <input
                  type="email"
                  class="intro-x login__input form-control py-3 px-4 block"
                  required
                  v-bind:placeholder="$t('login.email_placeholder')"
                  v-model="email"
                />
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  required
                  v-bind:placeholder="$t('login.password_placeholder')"
                  v-model="password"
                />
              </div>
              <div
                class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >{{ $t("login.remember") }}</label
                  >
                </div>
                <a href="/reset">{{ $t("login.forgot") }}</a>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
               
                <button
                  type="submit"
                  class="btn btn-outline-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                {{ $t("login.btn_login") }}
                </button>

  <!--               <button
                  class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                >
                  Register
                </button> -->

              </div>
            </form>
              <div
                class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
              >
              {{ $t("login.terms_txt1") }} 
                <a class="text-primary dark:text-slate-200" href=""
                  >{{ $t("login.terms_txt2") }} </a
                >
                {{ $t("login.terms_txt3") }}  
                <a class="text-primary dark:text-slate-200" href=""
                  >{{ $t("login.terms_txt4") }} </a
                >
              </div>

            </div>
          
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dom from "@left4code/tw-starter/dist/js/dom";
import AuthFooter from "@/components/auth-footer/Main.vue";
import LocaleSelect from "@/components/localeSelect/Main.vue";
import { useAuthenticationStore } from '@/stores/auth/authentications';
import { useRouter } from "vue-router";
import { Toast } from '@/utils/toast';
import Preloader from '@/components/preloader/Preloader.vue';

//Firebase & CometchatSDK
import cometchatSDKModel from '@/models/cometchat/CometchatSDK';




const {cometchatLogin} = cometchatSDKModel();


const useAuthentication = useAuthenticationStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const submitted = ref(false);
const loading = ref(false);



const handleSubmit = async() => {

  loading.value = true; 
  
  submitted.value = true;
  // stop here if form is invalid
  if (!(email && password) || email.value === '' || password.value === '') {
      console.log("falla");
      return;
  }

  await useAuthentication.login(email.value, password.value);

  if(useAuthentication.user){
    
    
    //Firebase & CometchatSDK
    await cometchatLogin();

    loading.value = false;
    router.push('/dashboard');

  }

  if(useAuthentication.errors){
      if(parseInt(useAuthentication.errors.status_code) === 422){
          //console.log('No autorizado')
          useAuthentication.errors = null;
          await Toast('Claves de acceso no válidas', 'error');
          //Remove localStore
          if(localStorage.getItem('token')){
            localStorage.removeItem('token');
          }

      }
  }
  loading.value = false; 
}


onMounted(() => {
  dom("body").removeClass("main").removeClass("error-page").addClass("login");
  //Remove localStore
  if(localStorage.getItem('token')){
    localStorage.removeItem('token');
  }
});

</script>


<style scoped>


</style>
