// @ts-check

import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import App from './components/App.jsx';
import resources from './locales/index.js';

const init = async () => {
  const i18nInstance = i18next.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <App />
      <ToastContainer />
    </I18nextProvider>
  );
};

export default init;
