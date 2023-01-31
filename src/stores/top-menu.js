import { defineStore } from "pinia";

export const useTopMenuStore = defineStore("topMenu", {
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
      {
        icon: "AlertTriangleIcon",
        pageName: "incidences",
        title: "Incidencias",
      },
    ],
  }),
});
