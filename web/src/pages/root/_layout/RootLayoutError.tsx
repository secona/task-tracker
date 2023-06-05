import axios from 'axios';
import { useNavigate, useRouteError } from 'react-router-dom';
import { NEW_ErrorResponseBody } from '@/api';
import { keys } from '@/config/keys';
import React from 'react';

export const RootLayoutError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (axios.isAxiosError<NEW_ErrorResponseBody>(error)) {
      switch (error.response?.data.msg) {
        case 'NOT_LOGGED_IN':
          localStorage.removeItem(keys.isLoggedIn);
          return navigate('/account/login');
      }
    }
  }, []);

  return <>{JSON.stringify(error)}</>;
};
