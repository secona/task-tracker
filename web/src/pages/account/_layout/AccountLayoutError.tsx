import { useNavigate, useRouteError } from 'react-router-dom';
import { isErrorResponse } from '@/api';
import { keys } from '@/config/keys';
import React from 'react';

export const AccountLayoutError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isErrorResponse(error)) {
      switch (error.response?.data.msg) {
        case 'ALREADY_LOGGED_IN':
          localStorage.setItem(keys.isLoggedIn, 'true');
          return navigate('/');
      }
    }
  }, []);

  return <>{JSON.stringify(error)}</>;
};
