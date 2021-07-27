import { configureStore } from '@reduxjs/toolkit';
import reducer, { actions as allActions } from './slices/index.js';

export const actions = allActions;

export default () => configureStore({
  reducer,
});
