import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cn from './locales/zh-cn.json'
import jp from './locales/jp-jp.json'
const resources = {
  cn: {
    translation: cn
  },
  jp: {
    translation: jp
  },
};
i18n 
.use(initReactI18next) 
  .init({ 
    resources, 
    fallbackLng: "cn",
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
  })

export default i18n