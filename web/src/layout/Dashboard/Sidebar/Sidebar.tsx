import { cnProps } from '@/utils/mergeClassnames';
import { SidebarItemGroup } from './SidebarItemGroup';
import { SidebarItem } from './SidebarItem';

import sidebarCN from './Sidebar.module.scss';

export interface DivComponentProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const Sidebar = (props: DivComponentProps) => (
  <div {...cnProps(props, sidebarCN.sidebar)} />
);

Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarItemGroup;
