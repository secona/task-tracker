import React from 'react';
import { MenuDropdown } from './MenuDropdown';
import { MenuItem } from './MenuItem';

export interface MenuProps {
  children?: React.ReactNode;
  activator: React.ReactNode;
}

export const Menu = (props: MenuProps) => {
  const activatorRef = React.useRef<HTMLElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      {React.cloneElement(props.activator as any, {
        onClick: () => setOpen(v => !v),
        ref: activatorRef,
      })}
      {isOpen && (
        <MenuDropdown activatorRef={activatorRef} setOpen={setOpen}>
          {props.children}
        </MenuDropdown>
      )}
    </>
  );
};

Menu.Item = MenuItem;
