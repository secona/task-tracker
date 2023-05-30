import { Icon } from 'react-feather';
import { NavLink } from 'react-router-dom';

import sidebarItemCN from './SidebarItem.module.scss';
import { mc } from '@/utils/mergeClassnames';

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
          sidebarItemCN.sidebarItem,
          isActive ? sidebarItemCN.sidebarItem_active : '',
        ].join(' ')
      }
    >
      <props.Icon
        {...mc(
          {},
          sidebarItemCN.icon,
          props.color !== undefined && sidebarItemCN[`icon_color${props.color}`]
        )}
        size={16}
      />
      {props.label}
    </NavLink>
  );
};
