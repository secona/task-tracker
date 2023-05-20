import { Outlet } from 'react-router-dom';
import { Dashboard } from '@/components/Dashboard';

export const Index = () => {
  return (
    <Dashboard>
      <Outlet />
    </Dashboard>
  );
};
