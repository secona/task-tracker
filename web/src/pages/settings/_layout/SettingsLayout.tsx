import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { usePrevious } from '@/hooks/usePrevious';
import { Dashboard } from '@/layout/Dashboard/Dashboard';
import { Sidebar } from '@/layout/Dashboard/Sidebar';
import { Activity, ArrowLeft, User } from 'react-feather';
import { Outlet, useNavigate } from 'react-router-dom';

export const SettingsLayout = () => {
  const navigate = useNavigate();
  const previous = usePrevious();

  return (
    <Dashboard>
      <Dashboard.Main>
        <Sidebar>
          <Sidebar.Block>
            <Heading fontSize='xl'>Settings</Heading>
          </Sidebar.Block>
          <Sidebar.List>
            <Sidebar.Group>
              <Sidebar.Item to='account' label='Account' Icon={User} />
              <Sidebar.Item to='sessions' label='Sessions' Icon={Activity} />
            </Sidebar.Group>
          </Sidebar.List>
          <Sidebar.Block>
            <Button
              onClick={() => navigate(previous.value)}
              style={{ margin: 'auto' }}
              LeftIcon={ArrowLeft}
            >
              Back to Dashboard
            </Button>
          </Sidebar.Block>
        </Sidebar>
        <Dashboard.Content>
          <Outlet />
        </Dashboard.Content>
      </Dashboard.Main>
    </Dashboard>
  );
};
