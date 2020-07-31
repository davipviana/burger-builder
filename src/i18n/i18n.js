import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import storage from "../shared/storage";

import englishResources from "./en-US";
import portugueseResources from "./pt-BR";

const ASYNC_TRANSLATION_MAP = {};

i18n.use(initReactI18next).init({
  lng: storage.getSelectedLanguage() || "en-US",
  fallbackLng: "en-US",
  keySeparator: false, // we do not use keys in form messages.welcome
  nsSeparator: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  react: {
    useSuspense: false,
  },
  resources: {
    "en-US": { translation: englishResources },
    "pt-BR": { translation: portugueseResources },
  },
});

i18n.on("initialized", (opt) => {
  if (opt.lng) {
    loadLanguage(opt.lng);
  } else {
    loadLanguage("pt-BR");
  }
});

i18n.on("languageChanged", (lng) => {
  storage.setSelectedLanguage(lng);
  loadLanguage(lng);
});

const loadLanguage = (lng) => {
  if (hasAsyncTranslation(lng)) {
    const load = async () => {
      const translations = await loadAsyncTranslation(lng);
      i18n.addResourceBundle(lng, "translation", translations, true);
      i18n.changeLanguage(lng); // trigger language selection after loading
    };
    load();
  }
};

const loadAsyncTranslation = async (locale) => {
  const config = ASYNC_TRANSLATION_MAP[locale];
  if (config && config.status === "ready") {
    config.status = "pending";
    try {
      const result = await config.load();
      config.status = "resolved";
      return result;
    } catch (err) {
      config.status = "rejected";
      return {};
    }
  }
  return [];
};

const hasAsyncTranslation = (locale) => {
  const localeTranslations = ASYNC_TRANSLATION_MAP[locale];
  if (localeTranslations) {
    return (
      localeTranslations.status === "ready" ||
      localeTranslations.status === "rejected"
    );
  }
  return false;
};

export default i18n;
