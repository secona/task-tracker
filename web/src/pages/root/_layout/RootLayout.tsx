import { AxiosResponse } from 'axios';
import { LoaderFunction, Outlet, redirect } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { ProjectGetManyResponse } from '@/api/projects/getMany';
import { queries } from '@/queries';
import { keys } from '@/config/keys';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

import './RootLayout.scss';

export const rootLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const query = queries.projects();

    const queryData: AxiosResponse<ProjectGetManyResponse> =
      queryClient.getQueryData(query.queryKey) ||
      (await queryClient.fetchQuery(query));

    if (queryData.data.msg === 'NOT_LOGGED_IN') {
      localStorage.removeItem(keys.isLoggedIn);
      return redirect('/account/login');
    } else {
      localStorage.setItem(keys.isLoggedIn, 'true');
      return queryData;
    }
  };

export const RootLayout = () => {
  const query = useQuery(queries.projects());

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
