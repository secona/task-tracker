import { ComponentPropsWithRef, forwardRef } from 'react';
import './Dashboard.scss';

export interface DashboardProps extends ComponentPropsWithRef<'div'> {}

export const Dashboard = forwardRef<HTMLDivElement, DashboardProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <div className='app-shell'>
        <div className='app-shell__topbar'></div>
        <div className='app-shell__main'>
          <div className='app-shell__sidebar'></div>
          <div {...otherProps} ref={ref}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
