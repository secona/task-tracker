import React from 'react';
import { Outlet } from 'react-router-dom';

import accountLayoutCN from './AccountLayout.module.scss';

export interface AccountLayoutProps
  extends React.ComponentPropsWithRef<'div'> {}

export const AccountLayout = () => {
  return (
    <div className={accountLayoutCN.container}>
      <div className={accountLayoutCN.panel}>
        <Outlet />
      </div>
    </div>
  );
};
