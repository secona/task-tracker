import { cnProps } from '@/utils/mergeClassnames';
import { SidebarItemGroup } from './SidebarItemGroup';
import { SidebarItem } from './SidebarItem';

import sidebarCN from './Sidebar.module.scss';

export interface DivComponentProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const Sidebar = (props: DivComponentProps) => (
  <div {...cnProps(props, sidebarCN.sidebar)} />
);

Sidebar.List = (props: DivComponentProps) => (
  <div {...cnProps(props, sidebarCN.list)} />
);

Sidebar.Block = (props: DivComponentProps) => (
  <div {...cnProps(props, sidebarCN.block)} />
);

Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarItemGroup;
