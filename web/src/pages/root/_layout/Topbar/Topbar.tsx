import { Menu, Settings, User } from 'react-feather';
import { TopbarButton } from './TopbarButton';

import topbarCN from './Topbar.module.scss';

export const Topbar = () => {
  return (
    <div className={topbarCN.topbar}>
      <TopbarButton Icon={Menu} />
      <div className={topbarCN.spacer} />
      <TopbarButton Icon={Settings} />
      <TopbarButton Icon={User} />
    </div>
  );
};
