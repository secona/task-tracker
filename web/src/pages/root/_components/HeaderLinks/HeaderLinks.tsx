import { cnProps } from '@/utils/mergeClassnames';
import React from 'react';

import headerLinksCN from './HeaderLinks.module.scss';

export interface HeaderLinksProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const HeaderLinks = (props: HeaderLinksProps) => {
  return <div {...cnProps(props, headerLinksCN.headerLinks)} />;
};
