import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cnProps } from '@/utils/mergeClassnames';
import { usePrevious } from '@/hooks/usePrevious';
import { Portal } from '../Portal';

import modalCN from './Modal.module.scss';

export type ModalContentProps<T extends keyof React.ReactHTML> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    closeModal: () => void;
  };

export const ModalContent = <T extends keyof React.ReactHTML>({
  as,
  closeModal,
  ...props
}: ModalContentProps<T>) => {
  const [contentEl, setContentEl] = React.useState<HTMLDivElement>();

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!contentEl?.contains(e.target as any)) {
        closeModal();
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [contentEl]);

  return (
    <Portal>
      <div className={modalCN.backdrop}>
        {React.createElement(as || 'div', {
          ...cnProps(props, modalCN.content),
          ref: (el: any) => setContentEl(el || undefined),
        })}
      </div>
    </Portal>
  );
};

ModalContent.Page = <T extends keyof React.ReactHTML>(
  props: Omit<ModalContentProps<T>, 'closeModal'>
) => {
  const previous = usePrevious();
  const navigate = useNavigate();

  return (
    <ModalContent {...props} closeModal={() => navigate(previous.value)} />
  );
};
