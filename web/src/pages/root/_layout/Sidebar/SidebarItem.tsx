import { Icon } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { cn } from '@/utils/mergeClassnames';

import sidebarItemCN from './SidebarItem.module.scss';

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
        cn(
          sidebarItemCN.sidebarItem,
          isActive && sidebarItemCN.sidebarItem_active
        )
      }
    >
      <props.Icon
        className={cn(
          sidebarItemCN.icon,
          props.color !== undefined && sidebarItemCN[`icon_color${props.color}`]
        )}
        size={16}
      />
      {props.label}
    </NavLink>
  );
};
