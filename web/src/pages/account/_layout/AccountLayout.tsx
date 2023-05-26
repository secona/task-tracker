import React, { forwardRef } from 'react';
import { Outlet } from 'react-router-dom';

import './AccountLayout.scss';

export interface AccountLayoutProps
  extends React.ComponentPropsWithRef<'div'> {}

export const AccountLayout = () => {
  return (
    <div className='steps-page'>
      <div className='steps-page__panel'>
        <Outlet />
      </div>
    </div>
  );
};
