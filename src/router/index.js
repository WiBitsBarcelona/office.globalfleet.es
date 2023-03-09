import { createRouter, createWebHistory } from "vue-router";
import {useAuthenticationStore} from '@/stores/auth/authentications';


const requireAuth = async(to, from, next) => {
  document.title = `${to.name} - ${import.meta.env.VITE_APP_TITLE}`;
  const useAuthentication = useAuthenticationStore();
  try {
      const currentUser = await useAuthentication.currentUser();
      next();
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
    component: () => import('@/layouts/simple-menu/Main.vue'),
    //component: () => import('@/layouts/top-menu/Main.vue'),
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
        path: "trips",
        name: "trips",
        component: () => import('@/views/trips/TripList.vue'),
      },
      {
        path: "vehicles",
        name: "vehicles",
        component: () => import('@/views/vehicles/VehicleList.vue'),
      },
      {
        path: "documents",
        name: "documents",
        component: () => import('@/views/documents/Documents.vue'),
      },
      {
        path: "chat",
        name: "chat",
        component: () => import('@/views/chat/Main.vue'),
      },
    ],
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
