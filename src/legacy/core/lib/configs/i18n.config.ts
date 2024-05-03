import i18next, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { IAppConfig } from '../types';
import { REACT_APP_STORAGE_ASSETS } from '../constants/env';

import { z } from 'zod';
import { makeZodI18nMap } from 'zod-i18n-map';

export function initI18N(appConfig: IAppConfig, initOptions: InitOptions = {}) {
  const path = `${REACT_APP_STORAGE_ASSETS}/${appConfig.storageAssetsPath}`;
  const defaultOption: InitOptions = {
    compatibilityJSON: 'v3',
    supportedLngs: ['vi', 'en'],
    fallbackLng: 'vi',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    partialBundledLanguages: true,
    resources: {},
    load: 'languageOnly',
    ns: ['common', 'zod'],
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: `${path}/locales/{{lng}}/{{ns}}.json?time=${Date.now()}`,
    },
    detection: {
      order: ['localStorage'],
    },
  };

  // const newInstance = i18next.createInstance();

  z.setErrorMap(makeZodI18nMap({ ns: 'zod' }));
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next) // bind react-i18next to the instance
    .init({ ...defaultOption, ...initOptions });

  return i18next;
}

export const i18n = i18next;
