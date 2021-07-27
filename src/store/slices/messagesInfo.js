// @ts-check
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import remove from 'lodash/remove.js';

import channelsInfoSlice from './channelsInfo.js';

const slice = createSlice({
  name: 'messagesInfo',

  initialState: {
    messages: [],
  },

  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        channelsInfoSlice.actions.removeChannel,
        (state, { payload }) => {
          const { channelId } = payload;
          remove(state.messages, (message) => message.channelId === channelId);
        },
      )
      .addCase(
        channelsInfoSlice.actions.setInitialState,
        (state, { payload }) => {
          const { messages } = payload;
          state.messages = messages;
        },
      );
  },
});

export default slice;
