import axios from 'axios';
import { useNavigate, useRouteError } from 'react-router-dom';
import { NEW_isErrorResponse } from '@/api';
import { keys } from '@/config/keys';
import React from 'react';

export const RootLayoutError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (NEW_isErrorResponse(error)) {
      console.log(error.response?.data);
      switch (error.response?.data.msg) {
        case 'NOT_LOGGED_IN':
          localStorage.removeItem(keys.isLoggedIn);
          return navigate('/account/login');
        case 'NOT_FOUND':
          return navigate('/');
      }
    }
  }, []);

  return <>{JSON.stringify(error)}</>;
};
