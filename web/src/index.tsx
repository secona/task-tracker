import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { RootLayout } from './pages/root/_layout';
import { AccountLayout } from './pages/account/_layout';
import { SettingsLayout } from './pages/settings/_layout/SettingsLayout';

import { Home } from './pages/root/Home';
import { NewProject } from './pages/root/NewProject';
import { Inbox } from './pages/root/Inbox';
import { Project } from './pages/root/Project';
import { NotFound } from './pages/root/NotFound';
import { NewTask } from './pages/root/NewTask';
import { EditProject } from './pages/root/EditProject';
import { EditTask } from './pages/root/EditTask';
import { Login } from './pages/account/Login';
import { Register } from './pages/account/Register';
import { Verify } from './pages/account/verify/Verify';
import { VerifyNotice } from './pages/account/verify/VerifyNotice';
import { Account } from './pages/settings/Account';

import './styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export const router = createBrowserRouter([
  {
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
      {
        path: 'verify',
        children: [
          {
            path: 'notice',
            element: <VerifyNotice />,
          },
          {
            path: ':token',
            element: <Verify />,
          },
        ],
      },
    ],
  },
  {
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
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootLayout.Error />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: 'new',
            element: <NewProject />,
          },
        ],
      },
      {
        path: 'inbox',
        element: <Inbox />,
      },
      {
        path: 'p/:projectId',
        element: <Project />,
        children: [
          {
            path: 'edit',
            element: <EditProject />,
          },
          {
            path: 'new',
            element: <NewTask />,
          },
          {
            path: 'edit/:taskId',
            element: <EditTask />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const el = document.getElementById('root');
const root = createRoot(el!);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools position='bottom-right' />
  </QueryClientProvider>
);
