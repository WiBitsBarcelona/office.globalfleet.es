import { createRouter, createWebHistory } from "vue-router";
import { useAuthenticationStore } from '@/stores/auth/authentications';
import enumRoles from '@/enums/enum_roles.js';

const requireAuth = async(to, from, next) => {
  document.title = `${to.name} - ${import.meta.env.VITE_APP_TITLE}`;
  const useAuthentication = useAuthenticationStore();
  try {
      await useAuthentication.currentUser();

      //console.log(useAuthentication.getUser.employee);

      //TODO pendiente de implementar:
      //SI ---> useAuthentication.getUser.employee
      //No ---> console.log(useAuthentication.user);
      next();
      
  } catch (e) {
      console.log(e);
      next({name: "login" });
  }
}


const checkManager = async(to, from, next) => {

  const useAuthentication = useAuthenticationStore();

  try {
    
    await useAuthentication.currentUser();
    const user = useAuthentication.getUser;

    if(user.roles[0].id === parseInt(enumRoles.MANAGER_ID)){
      next();
    }else{
      next({name: "dashboard" });
    }

  } catch (e) {
      console.log(e);
      next({name: "login" });
  }

}




const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: "/reset",
    name: "reset",
    component: () => import('@/views/login/Reset.vue'),
  },
  {
    path: "/newpassword",
    name: "newpasswod",
    component: () => import('@/views/login/NewPassword.vue'),
  },
  {
    path: "/",
    name: "main",
    component: () => import('@/layouts/simple-menu/Main.vue'), // Change view layout: component: () => import('@/layouts/top-menu/Main.vue'),
    redirect: '/dashboard',
    beforeEnter: requireAuth,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import('@/views/profiles/Profile.vue'),
      },
      {
        path: "help",
        name: "help",
        component: () => import('@/views/help/Help.vue'),
      },
      {
        path: "trips",
        name: "trips",
        component: () => import('@/views/trips/TripGrid.vue'),
      },
      {
        path: "trips/create",
        name: "trips-create",
        component: () => import('@/components/trips/TripCreate.vue'),
        //component: () => import('@/components/trips/TripExample.vue'),
      },
      {
        path: "trips/edit/:id",
        name: "trips-edit",
        component: () => import('@/components/trips/TripEdit.vue'),
      },
      {
        path: "vehicles",
        name: "vehicles",
        component: () => import('@/views/vehicles/VehiclesMap.vue'),
      },
      {
         path: "devices",
         name: "devices",
         component: () => import('@/views/devices/DevicesMap.vue'),
      },
      {
        path: "devices-history",
        name: "devices-history",
        component: () => import('@/views/devices/DevicesHistory.vue'),
     },
      {
        path: "documents",
        name: "documents",
        component: () => import('@/views/documents/general/GeneralDocumentView.vue'),
      },
      {
        path: "drivers-documents",
        name: "drivers-documents",
        component: () => import('@/views/documents/drivers/DriverDocumentView.vue'),
      },
      {
        path: "driver_documents/:id",
        name: "Driver Documents",
        component: () => import('@/views/documents/drivers/General.vue'),
      },
      {
        path: "trip-documents",
        name: "trip-documents",
        component: () => import('@/views/documents/trips/TripDocumentView.vue'),
      },
      {
        path: "incidents",
        name: "incidents",
        component: () => import('@/views/incidences/Incidences.vue'),
      },
      {
        path: "chat",
        name: "chat",
        component: () => import('@/views/chat/Chat.vue'),
      },
      {
        path: "users",
        name: "users",
        beforeEnter: checkManager,
        component: () => import('@/views/employees/EmployeeList.vue'),
      },
      {
        path: "drivers",
        name: "drivers",
        beforeEnter: checkManager,
        component: () => import('@/views/drivers/DriverList.vue'),
      },
      {
        path: "vehicles",
        name: "vehicles",
        beforeEnter: checkManager,
        component: () => import('@/views/vehicles/VehicleList.vue'),
      },
      {
        path: "tows",
        name: "tows",
        beforeEnter: checkManager,
        component: () => import('@/views/tows/TowList.vue'),
      },
    ],
  },
  {
    path: "/trip/:id",
    name: "Detalle Viaje",
    beforeEnter: requireAuth,
    component: () => import('@/views/trips/TripDetailsWithOutComponents.vue'),
  },
  { 
    path: '/:path(.*)', 
    name: "NotFound",
    component: () => import('@/views/sessions/404.vue'), 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
