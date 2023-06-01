import React from 'react';
import { getDropdownPosition } from '../Menu.utils';
import { Portal } from '@/components/Portal';

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

  React.useLayoutEffect(() => {
    const onResizeWindow = () => setMenuEl(undefined);
    window.addEventListener('resize', onResizeWindow);
    return () => window.removeEventListener('resize', onResizeWindow);
  }, [setMenuEl]);

  return (
    <Portal>
      <div
        className={menuDropdownCN.menuDropdown}
        ref={el => setMenuEl(el || undefined)}
        style={{
          top: position[0],
          left: position[1],
        }}
      >
        {props.children}
      </div>
    </Portal>
  );
};
