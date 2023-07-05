import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouteError } from 'react-router-dom';
import { isErrorResponse } from '@/api';
import { keys } from '@/config/keys';

export const SettingsLayoutError = () => {
  const queryClient = useQueryClient();
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isErrorResponse(error)) {
      console.log(error.response?.data);
      switch (error.response?.data.msg) {
        case 'NOT_LOGGED_IN':
          queryClient.removeQueries();
          localStorage.removeItem(keys.isLoggedIn);
          return navigate('/account/login');
        case 'NOT_FOUND':
          return navigate('/');
      }
    }
  }, []);

  return <>{JSON.stringify(error)}</>;
};
