import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { hu, en } from "./translations";
import { clockRunning } from "react-native-reanimated";
import { AsyncStorage } from 'react-native';

//empty for now
const resources = {
  hu: {
    translation: hu,
  },
  en: {
    translation: en,
  },
};


const { languageDetectorPlugin } = require("./languageDetectorPlugin");


i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      useSuspense: false, //in case you have any suspense related errors
    },
  });

export default i18n;