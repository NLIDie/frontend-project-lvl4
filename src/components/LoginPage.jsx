// @ts-check

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const unauthorizedStatus = 401;

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setAuthFailed(false);

    try {
      const response = await axios.post(routes.loginPath(), values);
      auth.logIn(response.data);

      const defaultLocation = {
        from: {
          pathname: routes.chatPagePath(),
        },
      };
      const { from } = location.state || defaultLocation;

      history.replace(from);
    } catch (err) {
      if (!err.isAxiosError) {
        toast(t('errors.unknown'), { type: 'error' });
        throw err;
      }

      if (err?.response?.status === unauthorizedStatus) {
        setAuthFailed(true);
        return;
      }

      toast(t('errors.network'), { type: 'error' });
      throw err;
    }
  };

  const renderFeedback = () => {
    if (!authFailed) {
      return null;
    }

    return <Form.Control.Feedback type="invalid">{t('login.authFailed')}</Form.Control.Feedback>;
  };

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <Form onSubmit={handleSubmit(onSubmit)} className="col-12 col-md-12 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    {...register('username')}
                    id="username"
                    type="text"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    autoFocus
                    placeholder={t('login.username')}
                  />
                  <label htmlFor="username">{t('login.username')}</label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    {...register('password')}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                    placeholder={t('login.password')}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>

                  {renderFeedback()}
                </Form.Group>

                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
