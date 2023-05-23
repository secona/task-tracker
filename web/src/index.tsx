import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Index } from './pages/Index';
import { Home } from './pages/Home';
import { Inbox } from './pages/Inbox';
import { Project } from './pages/Project';
import { NotFound } from './pages/NotFound';
import { Verify } from './pages/Verify';
import { PostRegister } from './pages/PostRegister';

import './styles/global.scss';

axios.defaults.validateStatus = () => true;
const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/register/post',
    element: <PostRegister />,
  },
  {
    path: '/verify',
    element: <Verify />,
  },
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/inbox',
        element: <Inbox />,
      },
      {
        path: '/p/:projectId',
        element: <Project />,
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
