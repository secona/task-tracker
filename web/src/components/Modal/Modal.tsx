import React from 'react';
import { Heading, HeadingProps } from '../Heading';
import { ModalContent } from './ModalContent';
import { cnProps } from '@/utils/mergeClassnames';

import modalCN from './Modal.module.scss';

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

Modal.Title = (props: HeadingProps) => (
  <Heading {...cnProps(props, modalCN.title)} fontSize='3xl' />
);

Modal.Main = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...cnProps(props, modalCN.main)} />
);

Modal.Footer = (props: React.ComponentPropsWithoutRef<'footer'>) => (
  <footer {...cnProps(props, modalCN.footer)} />
);
