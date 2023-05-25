import { mc } from '@/utils/mergeClassnames';
import { ComponentPropsWithoutRef } from 'react';

import './SidebarItemGroup.scss';

export interface SidebarItemGroupProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const SidebarItemGroup = ({
  children,
  title,
  ...props
}: SidebarItemGroupProps) => {
  return (
    <div {...mc(props, 'dashboard__sidebar__item-group')}>
      <p className='dashboard__sidebar__item-group__title'>{title}</p>
      {children}
    </div>
  );
};
