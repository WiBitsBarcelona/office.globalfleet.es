import {createI18n} from "vue-i18n";
import messages from "@intlify/unplugin-vue-i18n/messages";

// List of all locales.
//export const allLocales = ["es", "en"];
export const allLocales = [{"code": "es", "name": "Castellano"}, {"code": "en", "name": "English"}]

// Create Vue I18n instance.
export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "es",
  fallbackLocale: "es",
  messages: messages,
});

// Set new locale.
export async function setLocale (locale) {
  // Load locale if not available yet.
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale);
    // fetch() error occurred.
    if (messages === undefined) {
      return;
    }

    if (!localStorage.getItem("locale") === null) {
      const currentLocale = localStorage.getItem("locale");
      i18n.global.setLocaleMessage(currentLocale, messages);
      i18n.global.locale.value = currentLocale;
    }else{
      // Add locale standar local.
      i18n.global.setLocaleMessage(locale, messages);
      i18n.global.locale.value = locale;
    }


  }

  // Set locale.
  
}

// Fetch locale.
function loadLocale(locale) {
  return fetch(`./locales/${locale}.json`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong!");
    })
    .catch((error) => {
      console.error(error);
    });
}