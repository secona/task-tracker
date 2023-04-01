import { ComponentPropsWithRef, forwardRef } from 'react';
import './Dashboard.scss';

export interface DashboardProps extends ComponentPropsWithRef<'div'> {}

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <div className='dashboard'>
        <div className='dashboard__topbar'></div>
        <div className='dashboard__main'>
          <div className='dashboard__sidebar'></div>
          <div {...otherProps} ref={ref}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
