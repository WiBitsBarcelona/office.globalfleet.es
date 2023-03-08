import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import messages from "@intlify/unplugin-vue-i18n/messages";


const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "es",
    fallbackLocale: "es",
    availableLocales: ["es", "en"],
    availableLocalesNames: ["Español" , "English"],
    messages: messages,
  });


const app = createApp(App).use(router).use(createPinia()).use(i18n);

globalComponents(app);
utils(app);

app.mount("#app");
