import { ComponentPropsWithoutRef } from 'react';

import sidebarItemGroupCN from './SidebarItemGroup.module.scss';

export interface SidebarItemGroupProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const SidebarItemGroup = ({
  children,
  title,
  ...props
}: SidebarItemGroupProps) => {
  return (
    <div {...props}>
      <p className={sidebarItemGroupCN.title}>{title}</p>
      {children}
    </div>
  );
};
