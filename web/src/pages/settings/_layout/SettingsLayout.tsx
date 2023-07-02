import { Heading } from '@/components/Heading';
import { usePrevious } from '@/hooks/usePrevious';
import { Dashboard } from '@/layout/Dashboard/Dashboard';
import { Sidebar } from '@/layout/Dashboard/Sidebar';
import { Topbar } from '@/layout/Dashboard/Topbar';
import { Activity, ArrowLeft, User } from 'react-feather';
import { Outlet, useNavigate } from 'react-router-dom';

export const SettingsLayout = () => {
  const navigate = useNavigate();
  const previous = usePrevious();

  return (
    <Dashboard>
      <Topbar>
        <Topbar.Button
          onClick={() => navigate(previous.value)}
          Icon={ArrowLeft}
        />
        <Heading fontSize='lg'>Settings</Heading>
      </Topbar>
      <Dashboard.Main>
        <Sidebar>
          <Sidebar.Group>
            <Sidebar.Item to='account' label='Account' Icon={User} />
            <Sidebar.Item to='sessions' label='Sessions' Icon={Activity} />
          </Sidebar.Group>
        </Sidebar>
        <Dashboard.Content>
          <Outlet />
        </Dashboard.Content>
      </Dashboard.Main>
    </Dashboard>
  );
};
