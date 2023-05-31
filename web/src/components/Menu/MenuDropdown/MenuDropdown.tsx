import React from 'react';
import { createPortal } from 'react-dom';
import { getDropdownPosition } from '../Menu.utils';

import menuDropdownCN from './MenuDropdown.module.scss';

export interface MenuDropdownProps {
  children: React.ReactNode;
  activatorRef: React.RefObject<HTMLElement> | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuDropdown = (props: MenuDropdownProps) => {
  const [menuEl, setMenuEl] = React.useState<HTMLDivElement>();
  const position = getDropdownPosition(props.activatorRef, menuEl);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        !menuEl?.contains(e.target as any) &&
        !props.activatorRef?.current?.contains(e.target as any)
      ) {
        props.setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuEl]);

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
