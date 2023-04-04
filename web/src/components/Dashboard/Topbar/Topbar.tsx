import './Topbar.scss';
import { Menu, Settings, User } from 'react-feather';
import { TopbarButton } from './TopbarButton';

export const Topbar = () => {
  return (
    <div className='dashboard__topbar'>
      <TopbarButton Icon={Menu} />
      <div className='dashboard__topbar__spacer' />
      <TopbarButton Icon={Settings} />
      <TopbarButton Icon={User} />
    </div>
  );
}
