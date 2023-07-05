import { useNavigate, useRouteError } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { isErrorResponse } from '@/api';
import { keys } from '@/config/keys';
import React from 'react';

export const RootLayoutError = () => {
  const queryClient = useQueryClient();
  const error = useRouteError();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isErrorResponse(error)) {
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
