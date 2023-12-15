<template>

  <Preloader v-if="loading" />

  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-slate-100 md:to-transparent dark:md:from-darkmode-700"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="logo -intro-x hidden md:flex xl:w-[180px] block">
        <img
          alt="GlobalFleet - Office"
          class="logo__image w-6"
          src="@/assets/images/fleet-logo.svg"
        />
        <span class="logo__text text-white text-lg ml-3" style="display:block"> Office </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-[45px] mr-auto">
         <ol class="breadcrumb breadcrumb-light">
          <li class="breadcrumb-item"><a href="#">{{ $t('menu.home') }}</a></li>
          <li class="breadcrumb-item active capitalize" aria-current="page">{{ $t('breadcrumbs.' + $route.name) }}</li>
        </ol> 
      </nav>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">

      </div>
      <!-- END: Search -->

      <localeSelect />
      <FleetModeSwitcher />


      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->

      <Dropdown class="intro-x ">
        <DropdownToggle
          tag="div"
          role="button"
          class="zoom-in"
        >
        <ProfileAvatar :username="useAuthentication.user.name" bg-color="#d0d0d0" border-color="#d0d0d0"></ProfileAvatar>
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                {{ useAuthentication.getUser.employee.name }} {{ useAuthentication.getUser.employee.surname }} <br/>
                <span class="font-light">{{ useAuthentication.getUser.roles[0].description }}</span>
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5">
              <UserIcon class="w-4 h-4 mr-2" /> 
              <router-link to="/profile">{{ $t("profile") }}</router-link></DropdownItem>
            <!-- <DropdownItem class="dropdown-item hover:bg-white/5">
              <EditIcon class="w-4 h-4 mr-2" /> Add Account</DropdownItem
            > -->
            <DropdownItem class="dropdown-item hover:bg-white/5">
              <HelpCircleIcon class="w-4 h-4 mr-2" />
              <router-link to="/help">{{ $t("help") }}</router-link>
            </DropdownItem>

            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5" @click="logout">
              <ToggleRightIcon class="w-4 h-4 mr-2" /> {{ $t("logout") }}</DropdownItem
            >
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import {useAuthenticationStore} from '@/stores/auth/authentications';
  import FleetModeSwitcher from "@/components/fleet-dark-mode/Main.vue";
  import ProfileAvatar from 'vue-profile-avatar';
  import localeSelect from '@/components/localeSelect/Main.vue';
  import { useI18n } from 'vue-i18n';

  import Preloader from '@/components/preloader/Preloader.vue'; 

  //Firebase & CometchatSDK
  import { cometchatLogout } from '@/models/cometchat/CometchatSDK';

  
  const { t } = useI18n();

  const useAuthentication = useAuthenticationStore();
  const route = useRouter();

  const loading = ref(false);



  const searchDropdown = ref(false);
  const showSearchDropdown = () => {
    searchDropdown.value = true;
  };

  const hideSearchDropdown = () => {
    searchDropdown.value = false;
  };

  const logout = async() => {    

    loading.value = true; 

    await cometchatLogout();

    await useAuthentication.logout();

    loading.value = false; 

    route.push( {name:'login'} );
    
  }

  
</script>
