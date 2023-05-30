import { Icon } from 'react-feather';
import { NavLink } from 'react-router-dom';

import './SidebarItem.scss';

export interface SidebarItemProps {
  to: string;
  label: string;
  color?: number;
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
      <props.Icon
        className={
          'dashboard__sidebar__item__icon' +
          (props.color === undefined
            ? ''
            : ` dashboard__sidebar__item__icon_color${props.color}`)
        }
        size={16}
      />
      {props.label}
    </NavLink>
  );
};
