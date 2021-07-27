// @ts-check

import { createContext } from 'react';

const initialAuth = {
  user: {},
  logIn: () => {},
  isAuth: () => false,
};

const authContext = createContext(initialAuth);

export default authContext;
