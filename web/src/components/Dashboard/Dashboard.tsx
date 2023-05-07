import { ComponentPropsWithRef, forwardRef } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

import './Dashboard.scss';
import { mc } from '@/utils/mergeClassnames';

export interface DashboardProps extends ComponentPropsWithRef<'div'> {}

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <div className='dashboard'>
        <Topbar />
        <div className='dashboard__main'>
          <Sidebar />
          <div {...mc(otherProps, 'dashboard__content')} ref={ref}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

