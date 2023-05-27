import { AxiosResponse } from 'axios';
import { LoaderFunction, Outlet, redirect } from 'react-router-dom';
import { QueryClient, QueryOptions, useQuery } from '@tanstack/react-query';
import { ProjectGetManyResponse } from '@/api/projects/getMany';
import projects from '@/api/projects';
import { keys } from '@/config/keys';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

import './RootLayout.scss';

export const projectsListQuery = {
  queryKey: ['projects', 'all'],
  queryFn: async () => {
    return projects.getMany({});
  },
} satisfies QueryOptions;

export const rootLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const queryData: AxiosResponse<ProjectGetManyResponse> =
      queryClient.getQueryData(projectsListQuery.queryKey) ||
      (await queryClient.fetchQuery(projectsListQuery));

    if (queryData.data.msg === 'NOT_LOGGED_IN') {
      localStorage.removeItem(keys.isLoggedIn);
      return redirect('/account/login');
    } else {
      localStorage.setItem(keys.isLoggedIn, 'true');
      return queryData;
    }
  };

export const RootLayout = () => {
  const query = useQuery(projectsListQuery);

  return (
    <div className='dashboard'>
      <Topbar />
      <div className='dashboard__main'>
        <Sidebar query={query} />
        <div className='dashboard__content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
