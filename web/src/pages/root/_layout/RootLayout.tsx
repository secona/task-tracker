import { AxiosResponse } from 'axios';
import { LoaderFunction, Outlet, redirect, useParams } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { ProjectGetManyResponse } from '@/api/projects/getMany';
import { queries } from '@/queries';
import { keys } from '@/config/keys';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

import rootLayoutCN from './RootLayout.module.scss';
import { mc } from '@/utils/mergeClassnames';

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
  const { projectId } = useParams();
  const query = useQuery(queries.projects());
  const colorCode =
    // @ts-ignore
    query.data?.data.projects.find(p => p.project_id === projectId)?.color || 0;

  return (
    <div className={rootLayoutCN.dashboard}>
      <Topbar />
      <div className={rootLayoutCN.main}>
        <Sidebar query={query} />
        <div
          {...mc(
            {},
            rootLayoutCN.content,
            colorCode !== undefined && rootLayoutCN[`content_color${colorCode}`]
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
