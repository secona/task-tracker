import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import { RootLayout, rootLoader } from './pages/root/_layout';
import { AccountLayout } from './pages/account/_layout';

import { Home } from './pages/root/Home';
import { Inbox } from './pages/root/Inbox';
import { Project } from './pages/root/Project';
import { NotFound } from './pages/root/NotFound';
import { Login } from './pages/account/Login';
import { Register } from './pages/account/Register';
import { Verify } from './pages/account/Verify';
import { PostRegister } from './pages/account/PostRegister';

import './styles/global.scss';
import { NewTask } from './pages/root/NewTask';
import { EditProject } from './pages/root/EditProject';
import { EditTask } from './pages/root/EditTask';

axios.defaults.validateStatus = s => s < 500;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

export const router = createBrowserRouter([
  {
    path: '/account',
    element: <AccountLayout />,
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
        path: 'register/post',
        element: <PostRegister />,
      },
      {
        path: 'verify',
        element: <Verify />,
      },
    ],
  },
  {
    path: '/',
    loader: rootLoader(queryClient),
    element: <RootLayout />,
    errorElement: <RootLayout.Error />,
    children: [
      {
        path: '',
        element: <Home />,
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
  </QueryClientProvider>
);
