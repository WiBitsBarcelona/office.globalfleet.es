import { defineStore } from "pinia";
import { useI18n } from 'vue-i18n';


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
      {
        icon: "CastIcon",
        pageName: "devices",
        title: "Dispositivos",
      },
/*       {
        icon: "TruckIcon",
        pageName: "vehicles",
        title: "Vehículos",
      }, */
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
