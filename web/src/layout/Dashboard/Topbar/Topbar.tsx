import { cnProps } from '@/utils/mergeClassnames';

import topbarCN from './Topbar.module.scss';
import { TopbarButton } from './TopbarButton';

export interface DivComponentProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const Topbar = (props: DivComponentProps) => (
  <div {...cnProps(props, topbarCN.topbar)} />
);

Topbar.Button = TopbarButton;
