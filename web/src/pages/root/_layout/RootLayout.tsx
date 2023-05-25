import { Outlet } from 'react-router-dom';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import projects from '@/api/projects';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

import './RootLayout.scss';

export const projectsListQuery = {
  queryKey: ['projects', 'all'],
  queryFn: async () => {
    return projects.getMany({});
  },
} satisfies QueryOptions;

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
