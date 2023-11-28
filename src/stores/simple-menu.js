import { defineStore } from "pinia";

export const useSimpleMenuStore = defineStore("simpleMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "menu.home",
        isManager: false,
      },
      {
        icon: "NavigationIcon",
        pageName: "trips",
        title: "menu.trips",
        isManager: false,
      },
      {
        icon: "CastIcon",
        pageName: "devices",
        title: "menu.devices",
        isManager: false,
      },
      {
        icon: "FilesIcon",
        pageName: "documents",
        title: "menu.documents",
        isManager: false,
      },
      {
        icon: "AlertTriangleIcon",
        pageName: "incidents",
        title: "menu.incidents",
        isManager: false,
      },
      {
        icon: "MessageCircleIcon",
        pageName: "chat",
        title: "menu.chat",
        isManager: false,
      },
      {
        icon: "UsersIcon",
        pageName: "users",
        title: "menu.employees",
        isManager: true,
      },
      {
        icon: "UserCircle2Icon",
        pageName: "drivers",
        title: "menu.drivers",
        isManager: true,
      },
      {
        icon: "BusFrontIcon",
        pageName: "vehicles",
        title: "menu.plates",
        isManager: true,
      },
      {
        icon: "ContainerIcon",
        pageName: "tows",
        title: "menu.tows",
        isManager: true,
      },
      {
        icon: "ActivitySquareIcon",
        pageName: "tows",
        title: "menu.logs",
        isManager: true,
        subMenu: [
          {
            icon: "Activity",
            pageName: "session-log",
            title: "menu.session_logs",
          },
          {
            icon: "Activity",
            pageName: "tows",
            title: "menu.driver_logs",
          },
        ],
      },
    ],
  }),
});
