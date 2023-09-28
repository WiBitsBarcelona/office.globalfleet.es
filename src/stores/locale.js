import { defineStore } from "pinia";

export const useLocaleStore = defineStore("locale", {
  state: () => ({
    localeValue: localStorage.getItem("locale") === "es",
  }),
  getters: {
    currentLocale(state) {
      if (localStorage.getItem("locale") === null) {
        localStorage.setItem("locale", "es");
      }

      return state.localeValue;
    },
  },
  actions: {
    setLocale(locale) {
      localStorage.setItem("locale", locale);
      this.localeValue = locale;
    },
  },
});
