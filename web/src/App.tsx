import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Index } from './pages/Index';
import { Home } from './pages/Home';
import { Inbox } from './pages/Inbox';
import { Project } from './pages/Project';
import { NotFound } from './pages/NotFound';
import { Verify } from './pages/Verify';
import { PostRegister } from './pages/PostRegister';

export const App = () => {
  return <RouterProvider router={router} />;
};

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
