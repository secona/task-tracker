import { Home, Inbox } from 'react-feather';
import { SidebarItem } from './SidebarItem';

import './Sidebar.scss'

export const Sidebar = () => {
  return (
    <div className='dashboard__sidebar'>
      <SidebarItem to='/' label='Home' Icon={Home} />
      <SidebarItem to='/inbox' label='Inbox' Icon={Inbox} />
    </div>
  );
};
