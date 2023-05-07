import { Folder, Home, Inbox } from 'react-feather';
import { SidebarItem } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';

import './Sidebar.scss';

export const Sidebar = () => {
  return (
    <div className='dashboard__sidebar'>
      <SidebarItemGroup>
        <SidebarItem to='/' label='Home' Icon={Home} />
        <SidebarItem to='/inbox' label='Inbox' Icon={Inbox} />
      </SidebarItemGroup>

      <SidebarItemGroup title='projects'>
        <SidebarItem to='/p/a' label='School' Icon={Folder} color={0} />
        <SidebarItem to='/p/b' label='School' Icon={Folder} color={0} />
        <SidebarItem to='/p/c' label='School' Icon={Folder} color={0} />
        <SidebarItem to='/p/d' label='School' Icon={Folder} color={0} />
      </SidebarItemGroup>
    </div>
  );
};
