// @ts-check

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useDidMount } from 'rooks';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';

import ChatChannelsPanel from './ChatChannelsPanel.jsx';
import Chat from './Chat.jsx';

import { actions } from '../store/index.js';
import routes from '../routes.js';
import useAuth from '../hooks/index.js';

const ChatPage = () => {
  const [status, setStatus] = useState('fetching-channels');
  const auth = useAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const fetchChannels = async () => {
    setStatus('fetching-channels');

    try {
      const response = await axios.get(routes.channelsPath(), { headers: auth.getAuthHeader() });
      dispatch(actions.initChannels(response.data));
      setStatus('idle');
    } catch (err) {
      if (!err.isAxiosError) {
        toast(t('errors.unknown'), { type: 'error' });
        throw err;
      }

      if (err.response.status === 401) {
        history.push(routes.loginPagePath());
        toast(t('errors.unauthorized'), { type: 'error' });
        return;
      }

      toast(t('errors.network'), { type: 'error' });
      throw err;
    }
  };

  useDidMount(() => {
    fetchChannels();
  });

  if (status === 'fetching-channels') {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChatChannelsPanel />
        </div>
        <div className="col p-0 h-100">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
