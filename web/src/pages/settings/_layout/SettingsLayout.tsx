import { Heading } from '@/components/Heading';
import { Dashboard } from '@/layout/Dashboard/Dashboard';
import { Sidebar } from '@/layout/Dashboard/Sidebar';
import { Topbar } from '@/layout/Dashboard/Topbar';
import { ArrowLeft, User } from 'react-feather';
import { Outlet, useNavigate } from 'react-router-dom';

export const SettingsLayout = () => {
  const navigate = useNavigate();

  return (
    <Dashboard>
      <Topbar>
        <Topbar.Button onClick={() => navigate('/')} Icon={ArrowLeft} />
        <Heading fontSize='lg'>Settings</Heading>
      </Topbar>
      <Dashboard.Main>
        <Sidebar>
          <Sidebar.Group>
            <Sidebar.Item to='account' label='Account' Icon={User} />
          </Sidebar.Group>
        </Sidebar>
        <Dashboard.Content>
          <Outlet />
        </Dashboard.Content>
      </Dashboard.Main>
    </Dashboard>
  );
};
