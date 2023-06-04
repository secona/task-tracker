import { Menu as HamburgerMenu, LogOut, Settings, User } from 'react-feather';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/auth';
import { keys } from '@/config/keys';
import { Menu } from '@/components/Menu';
import { TopbarButton } from './TopbarButton';

import topbarCN from './Topbar.module.scss';

export const Topbar = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
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
    <div className={topbarCN.topbar}>
      <TopbarButton Icon={HamburgerMenu} />
      <div className={topbarCN.spacer} />
      <TopbarButton Icon={Settings} />
      <Menu activator={<TopbarButton Icon={User} />}>
        <Menu.Item onClick={() => mutation.mutate()} LeftIcon={LogOut}>
          Log Out
        </Menu.Item>
      </Menu>
    </div>
  );
};
