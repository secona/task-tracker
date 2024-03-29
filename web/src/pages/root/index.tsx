import { RouteObject } from 'react-router-dom';
import { RootLayout } from './_layout/RootLayout';
import { Home } from './Home';
import { NewProject } from './NewProject';
import { Project } from './Project';
import { EditProject } from './EditProject';
import { NewTask } from './NewTask';
import { EditTask } from './EditTask';
import { NotFound } from './NotFound';
import { Inbox } from './Inbox';

export const rootRoute: RouteObject = {
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
      children: [
        {
          path: 'edit/:taskId',
          element: <EditTask />,
        },
      ],
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
};
