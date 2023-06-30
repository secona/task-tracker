import { Outlet, useNavigate } from 'react-router-dom';
import {
  LogOut,
  User,
  Menu as HamburgerMenu,
  Settings,
  Home,
  Inbox,
  Folder,
} from 'react-feather';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Topbar } from '@/layout/Dashboard/Topbar';
import { Sidebar } from '@/layout/Dashboard/Sidebar';
import { Dashboard } from '@/layout/Dashboard/Dashboard';
import { RootLayoutError } from './RootLayoutError';
import { Menu } from '@/components/Menu';
import { authAPI } from '@/api/auth';
import { keys } from '@/config/keys';

export const RootLayout = () => {
  const query = useQuery(queries.projects());
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return authAPI.logout();
    },
    onSuccess: () => {
      localStorage.removeItem(keys.isLoggedIn);
      return navigate('/account/login');
    },
  });

  return (
    <Dashboard>
      <Topbar>
        <Topbar.Button Icon={HamburgerMenu} />
        <span style={{ flexGrow: 1 }} />
        <Topbar.Button onClick={() => navigate('/settings')} Icon={Settings} />
        <Menu activator={<Topbar.Button Icon={User} />}>
          <Menu.Item onClick={() => logoutMutation.mutate()} LeftIcon={LogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      </Topbar>

      <Dashboard.Main>
        <Sidebar>
          <Sidebar.Group>
            <Sidebar.Item to='/' label='Home' Icon={Home} />
            <Sidebar.Item to='/inbox' label='Inbox' Icon={Inbox} />
          </Sidebar.Group>

          <Sidebar.Group title='projects'>
            {query.data?.map(project => (
              <Sidebar.Item
                key={project.project_id}
                to={`/p/${project.project_id}`}
                label={project.name}
                Icon={Folder}
                color={project.color}
              />
            ))}
          </Sidebar.Group>
        </Sidebar>

        <Dashboard.Content>
          <Outlet />
        </Dashboard.Content>
      </Dashboard.Main>
    </Dashboard>
  );
};

RootLayout.Error = RootLayoutError;
