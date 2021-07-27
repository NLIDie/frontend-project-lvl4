// @ts-check

import { combineReducers } from '@reduxjs/toolkit';
import channelsInfoSlice from './channelsInfo.js';
import messagesInfoSlice from './messagesInfo.js';

export const actions = {
  ...channelsInfoSlice.actions,
  ...messagesInfoSlice.actions,
};

export default combineReducers({
  channelsInfo: channelsInfoSlice.reducer,
  messagesInfo: messagesInfoSlice.reducer,
});
