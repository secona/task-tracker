import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';

import './RootLayout.scss';

export const RootLayout = () => {
  return (
    <div className='dashboard'>
      <Topbar />
      <div className='dashboard__main'>
        <Sidebar />
        <div className='dashboard__content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
