import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { RootLayoutError } from './RootLayoutError';

import rootLayoutCN from './RootLayout.module.scss';

export const RootLayout = () => {
  const query = useQuery(queries.projects());

  return (
    <div className={rootLayoutCN.dashboard}>
      <Topbar />
      <div className={rootLayoutCN.main}>
        <Sidebar query={query} />
        <div className={rootLayoutCN.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

RootLayout.Error = RootLayoutError;
