import { UseQueryResult } from '@tanstack/react-query';
import { Folder, Home, Inbox } from 'react-feather';
import { ProjectsQuery } from '@/queries';
import { SidebarItem } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';

import sidebarCN from './Sidebar.module.scss';

export interface SidebarProps {
  query: UseQueryResult<ProjectsQuery>;
}

export const Sidebar = ({ query }: SidebarProps) => {
  return (
    <div className={sidebarCN.sidebar}>
      <SidebarItemGroup>
        <SidebarItem to='/' label='Home' Icon={Home} />
        <SidebarItem to='/inbox' label='Inbox' Icon={Inbox} />
      </SidebarItemGroup>

      <SidebarItemGroup title='projects'>
        {query.data?.map(project => (
          <SidebarItem
            key={project.project_id}
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
