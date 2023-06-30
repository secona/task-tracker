import { RouteObject } from 'react-router-dom';
import { Inbox } from 'react-feather';
import { RootLayout } from './_layout/RootLayout';
import { Home } from './Home';
import { NewProject } from './NewProject';
import { Project } from './Project';
import { EditProject } from './EditProject';
import { NewTask } from './NewTask';
import { EditTask } from './EditTask';
import { NotFound } from './NotFound';

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
