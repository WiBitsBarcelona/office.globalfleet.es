import { defineStore } from "pinia";

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "Inicio",
      },
      {
        icon: "NavigationIcon",
        pageName: "trips",
        title: "Viajes",
      },
/*       {
        icon: "UserIcon",
        pageName: "employees",
        title: "Empleados",
      }, */
      {
        icon: "TruckIcon",
        pageName: "vehicles",
        title: "Vehículos",
      },
      {
        icon: "FilesIcon",
        pageName: "documents",
        title: "Documentos",
      },
      {
        icon: "MessageCircleIcon",
        pageName: "chat",
        title: "Chat",
      },
    ],
  }),
});
