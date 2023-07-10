import React from 'react';
import { cnProps } from '@/utils/mergeClassnames';
import { ModalContent } from './ModalContent';
import { Heading, HeadingProps } from '../Heading';
import { UseModalResult } from './useModal';

import modalCN from './Modal.module.scss';

export interface ModalProps extends React.ComponentPropsWithoutRef<'div'> {
  modal: UseModalResult;
}

export const Modal = ({ modal, ...props }: ModalProps) => {
  return (
    <>{modal.opened && <ModalContent {...props} closeModal={modal.close} />}</>
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
