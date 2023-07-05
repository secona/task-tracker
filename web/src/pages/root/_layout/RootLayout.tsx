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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Topbar } from '@/layout/Dashboard/Topbar';
import { Sidebar } from '@/layout/Dashboard/Sidebar';
import { Dashboard } from '@/layout/Dashboard/Dashboard';
import { RootLayoutError } from './RootLayoutError';
import { Menu } from '@/components/Menu';
import { usePrevious } from '@/hooks/usePrevious';
import { authAPI } from '@/api/auth';
import { keys } from '@/config/keys';

export const RootLayout = () => {
  const queryClient = useQueryClient();
  const query = useQuery(queries.projects());
  const navigate = useNavigate();
  const previous = usePrevious();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => {
      return authAPI.logout();
    },
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem(keys.isLoggedIn);
      return navigate('/account/login');
    },
  });

  return (
    <Dashboard>
      <Topbar>
        <Topbar.Button Icon={HamburgerMenu} />
        <span style={{ flexGrow: 1 }} />
        <Topbar.Button
          onClick={() => {
            previous.setToHere();
            navigate('/settings');
          }}
          Icon={Settings}
        />
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
