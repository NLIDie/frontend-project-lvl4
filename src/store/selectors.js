// @ts-check

import { createSelector } from '@reduxjs/toolkit';

export const getChannelsInfo = (state) => state.channelsInfo;
export const getMessagesInfo = (state) => state.messagesInfo;

export const getCurrentChannel = createSelector(
  getChannelsInfo,
  ({ channels, currentChannelId }) => (
    channels.find((channel) => channel.id === currentChannelId)
  ),
);

export const getCurrentChannelMessages = createSelector(
  [getChannelsInfo, getMessagesInfo],
  ({ currentChannelId }, { messages }) => (
    messages.filter((message) => message.channelId === currentChannelId)
  ),
);

export const getChannelsNames = createSelector(
  getChannelsInfo,
  ({ channels }) => channels.map(({ name }) => name),
);

export const getChannelById = (channelId) => createSelector(
  getChannelsInfo,
  ({ channels }) => channels.find(({ id }) => channelId === id),
);
