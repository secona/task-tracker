import { Navigate, RouteObject } from 'react-router-dom';
import { SettingsLayout } from './_layout/SettingsLayout';
import { Account } from './Account';

export const settingsRoute: RouteObject = {
  path: '/settings',
  element: <SettingsLayout />,
  children: [
    {
      path: '',
      element: <Navigate to='account' />,
    },
    {
      path: 'account',
      element: <Account />,
    },
  ],
};
