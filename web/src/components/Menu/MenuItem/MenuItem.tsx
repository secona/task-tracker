import React from 'react';
import { Button, ButtonProps } from '@/components/Button';
import { cnProps } from '@/utils/mergeClassnames';

import menuItemCN from './MenuItem.module.scss';

interface MenuItemProps
  extends React.ComponentPropsWithoutRef<'button'>,
    ButtonProps {}

export const MenuItem = (props: MenuItemProps) => {
  return (
    <Button {...cnProps(props, props.className, menuItemCN.menuItem)}></Button>
  );
};
