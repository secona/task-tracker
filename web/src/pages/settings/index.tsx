import { Navigate, RouteObject } from 'react-router-dom';
import { SettingsLayout } from './_layout/SettingsLayout';
import { Account } from './Account';
import { Sessions } from './Sessions';

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
    {
      path: 'sessions',
      element: <Sessions />,
    },
  ],
};
