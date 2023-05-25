import { Outlet } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';

export const RootLayout = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};
