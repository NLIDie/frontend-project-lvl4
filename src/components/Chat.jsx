// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCurrentChannel, getCurrentChannelMessages } from '../store/selectors';
import ChatNewMessageForm from './ChatNewMessageForm.jsx';

const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

const MessageList = (props) => {
  const { messages } = props;

  const items = messages.map(({ id, username, body }) => (
    <Message
      key={id}
      username={username}
      body={body}
    />
  ));

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {items}
    </div>
  );
};

const Chat = () => {
  const channel = useSelector(getCurrentChannel);
  const messages = useSelector(getCurrentChannelMessages);

  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${channel?.name}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
        </span>
      </div>

      <MessageList messages={messages} />

      <div className="mt-auto px-5 py-3">
        <ChatNewMessageForm />
      </div>
    </div>
  );
};

export default Chat;
