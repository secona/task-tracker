import { AxiosResponse } from 'axios';
import { LoaderFunction, Outlet, redirect, useParams } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { ProjectsGetManyResponse } from '@/api/projects/getMany';
import { queries } from '@/queries';
import { keys } from '@/config/keys';
import { cn } from '@/utils/mergeClassnames';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { RootLayoutError } from './RootLayoutError';

import rootLayoutCN from './RootLayout.module.scss';

export const rootLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const query = queries.projects();

    const queryData: AxiosResponse<ProjectsGetManyResponse> =
      queryClient.getQueryData(query.queryKey) ||
      (await queryClient.fetchQuery(query));

    localStorage.setItem(keys.isLoggedIn, 'true');
    return queryData;
  };

export const RootLayout = () => {
  const { projectId } = useParams();
  const query = useQuery(queries.projects());
  const colorCode =
    query.data?.find(p => p.project_id === projectId)?.color ?? 8;

  return (
    <div className={rootLayoutCN.dashboard}>
      <Topbar />
      <div className={rootLayoutCN.main}>
        <Sidebar query={query} />
        <div
          className={cn(
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

RootLayout.Error = RootLayoutError;
