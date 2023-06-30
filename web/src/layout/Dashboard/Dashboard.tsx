import React from 'react';
import { cnProps } from '@/utils/mergeClassnames';

import dashboardCN from './Dashboard.module.scss';

export interface DivComponentProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const Dashboard = (props: DivComponentProps) => (
  <div {...cnProps(props, dashboardCN.container)} />
);

Dashboard.Main = (props: DivComponentProps) => (
  <div {...cnProps(props, dashboardCN.main)} />
);

Dashboard.Content = (props: DivComponentProps) => (
  <div {...cnProps(props, dashboardCN.content)} />
);
