import React from 'react';
import { Portal } from '../Portal';

import modalCN from './Modal.module.scss';

export interface ModalProps {
  children: React.FC<{ closeModal(): void }>;
  activator: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [contentEl, setContentEl] = React.useState<HTMLDivElement>();

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!contentEl?.contains(e.target as any)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [contentEl]);

  return (
    <>
      {React.cloneElement(props.activator as any, {
        onClick: () => setOpen(v => !v),
      })}
      {isOpen && (
        <Portal>
          <div className={modalCN.backdrop}>
            <div
              ref={el => setContentEl(el || undefined)}
              className={modalCN.content}
            >
              <props.children closeModal={() => setOpen(false)} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
