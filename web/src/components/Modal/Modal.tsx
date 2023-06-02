import React from 'react';
import { ModalContent } from './ModalContent';

export interface ModalProps {
  children: React.FC<{ closeModal(): void }>;
  activator: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      {React.cloneElement(props.activator as any, {
        onClick: () => setOpen(v => !v),
      })}
      {isOpen && (
        <ModalContent closeModal={() => setOpen(false)}>
          <props.children closeModal={() => setOpen(false)} />
        </ModalContent>
      )}
    </>
  );
};
