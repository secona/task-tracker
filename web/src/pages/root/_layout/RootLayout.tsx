import { Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { cn } from '@/utils/mergeClassnames';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { RootLayoutError } from './RootLayoutError';

import rootLayoutCN from './RootLayout.module.scss';

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
