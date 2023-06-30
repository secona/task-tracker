import { RouteObject } from 'react-router-dom';
import { AccountLayout } from './_layout/AccountLayout';
import { Login } from './Login';
import { Register } from './Register';
import { verifyRoute } from './verify';

export const accountRoute: RouteObject = {
  path: '/account',
  element: <AccountLayout />,
  errorElement: <AccountLayout.Error />,
  children: [
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    verifyRoute,
  ],
};
