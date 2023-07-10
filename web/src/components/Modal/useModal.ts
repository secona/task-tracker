import React from 'react';

export interface UseModalResult {
  opened: boolean;
  open(): void;
  close(): void;
  toggle(): void;
}

export const useModal = () => {
  const [opened, setOpen] = React.useState(false);

  return {
    opened,
    close: () => setOpen(false),
    open: () => setOpen(true),
    toggle: () => setOpen(!open),
  } as UseModalResult;
};
