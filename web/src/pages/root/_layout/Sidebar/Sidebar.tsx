import { UseQueryResult } from '@tanstack/react-query';
import { Folder, Home, Inbox } from 'react-feather';
import projects from '@/api/projects';
import { SidebarItem } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';

import './Sidebar.scss';

export interface SidebarProps {
  query: UseQueryResult<Awaited<ReturnType<typeof projects.getMany>>>;
}

export const Sidebar = ({ query }: SidebarProps) => {
  return (
    <div className='dashboard__sidebar'>
      <SidebarItemGroup>
        <SidebarItem to='/' label='Home' Icon={Home} />
        <SidebarItem to='/inbox' label='Inbox' Icon={Inbox} />
      </SidebarItemGroup>

      <SidebarItemGroup title='projects'>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <SidebarItem
              to={`/p/${project.project_id}`}
              label={project.name}
              Icon={Folder}
              color={project.color}
            />
          ))}
      </SidebarItemGroup>
    </div>
  );
};
