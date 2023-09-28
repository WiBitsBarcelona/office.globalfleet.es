import { defineStore } from "pinia";

console.log(localStorage.getItem("locale"));

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "Inicio",
        isManager: false,
      },
      {
        icon: "NavigationIcon",
        pageName: "trips",
        title: "Viajes",
        isManager: false,
      },
      {
        icon: "CastIcon",
        pageName: "devices",
        title: "Dispositivos",
        isManager: false,
      },
      {
        icon: "FilesIcon",
        pageName: "documents",
        title: "Documentos",
        isManager: false,
      },
      {
        icon: "AlertTriangleIcon",
        pageName: "incidents",
        title: "Incidencias",
        isManager: false,
      },
      {
        icon: "MessageCircleIcon",
        pageName: "chat",
        title: "Chat",
        isManager: false,
      },
      {
        icon: "UsersIcon",
        pageName: "users",
        title: "Usuarios",
        isManager: true,
      },
      {
        icon: "TruckIcon",
        pageName: "drivers",
        title: "Conductores",
        isManager: true,
      },
    ],
  }),
});
