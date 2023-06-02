import React from 'react';
import { Portal } from '../Portal';

import modalCN from './Modal.module.scss';

export interface ModalContentProps {
  children?: React.ReactNode;
  closeModal(): void;
}

export const ModalContent = (props: ModalContentProps) => {
  const [contentEl, setContentEl] = React.useState<HTMLDivElement>();

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!contentEl?.contains(e.target as any)) {
        props.closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [contentEl]);

  return (
    <Portal>
      <div className={modalCN.backdrop}>
        <div
          ref={el => setContentEl(el || undefined)}
          className={modalCN.content}
        >
          {props.children}
        </div>
      </div>
    </Portal>
  );
};
