// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import App from './components/App.jsx';
import resources from './locales/index.js';
import configureStore from './store/index.js';

const init = async () => {
  const store = configureStore();
  const i18nInstance = i18next.createInstance();

  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <App />
        <ToastContainer />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
