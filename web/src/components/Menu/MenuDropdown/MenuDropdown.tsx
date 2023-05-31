import React from 'react';
import { createPortal } from 'react-dom';
import { getDropdownPosition } from '../Menu.utils';

import menuDropdownCN from './MenuDropdown.module.scss';

export interface MenuDropdownProps {
  children: React.ReactNode;
  activatorRef: React.RefObject<HTMLElement> | null;
}

export const MenuDropdown = (props: MenuDropdownProps) => {
  const [menuEl, setMenuEl] = React.useState<HTMLDivElement>();
  const position = getDropdownPosition(props.activatorRef, menuEl);

  return createPortal(
    <div
      className={menuDropdownCN.menuDropdown}
      ref={el => setMenuEl(el || undefined)}
      style={{
        top: position[0],
        left: position[1],
      }}
    >
      {props.children}
    </div>,
    document.querySelector('body')!
  );
};
