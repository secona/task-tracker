import { Icon } from 'react-feather';
import { NavLink } from 'react-router-dom';

import './SidebarItem.scss';

interface SidebarItemProps {
  to: string;
  label: string;
  Icon: Icon;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <NavLink
      role='button'
      to={props.to}
      draggable={false}
      className={({ isActive }) =>
        [
          'dashboard__sidebar__item',
          isActive ? 'dashboard__sidebar__item--active' : '',
        ].join(' ')
      }
    >
      <props.Icon className='dashboard__sidebar__item__icon' size={16} />
      {/* <span>{props.label}</span> */}
      {props.label}
    </NavLink>
  );
};
