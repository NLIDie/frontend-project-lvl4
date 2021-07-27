// @ts-check

import ReactDOM from 'react-dom';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import init from './init.jsx';

import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = async () => {
  const target = document.querySelector('#chat');
  const virtualDOM = await init();

  ReactDOM.render(virtualDOM, target);
};

app();
