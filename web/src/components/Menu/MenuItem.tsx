import { Button, ButtonProps } from '@/components/Button';
import { cnProps } from '@/utils/mergeClassnames';

import menuItemCN from './MenuItem.module.scss';

interface MenuItemProps extends ButtonProps {}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <Button {...cnProps(props, props.className, menuItemCN.menuItem)}></Button>
  );
};
