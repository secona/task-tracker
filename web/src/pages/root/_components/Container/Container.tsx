import React from 'react';

import containerCN from './Container.module.scss';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Container = (props: ContainerProps) => {
  return <div {...props} className={containerCN.container} />;
};
