import React from 'react';
import { cnProps } from '@/utils/mergeClassnames';
import { ModalContent } from './ModalContent';
import { Heading, HeadingProps } from '../Heading';
import { UseModalResult } from './useModal';

import modalCN from './Modal.module.scss';

export type ModalProps<T extends keyof React.ReactHTML> =
  React.ComponentPropsWithoutRef<T> & {
    as?: keyof React.ReactHTML;
    modal: UseModalResult;
  };

export const Modal = <T extends keyof React.ReactHTML>({
  modal,
  ...props
}: ModalProps<T>) => (
  <>{modal?.opened && <ModalContent {...props} closeModal={modal?.close} />}</>
);

Modal.Page = <T extends keyof React.ReactHTML>(
  props: Omit<ModalProps<T>, 'modal'>
) => <ModalContent.Page {...props} />;

Modal.Title = (props: HeadingProps) => (
  <Heading {...cnProps(props, modalCN.title)} fontSize='3xl' />
);

Modal.Main = (props: React.ComponentPropsWithoutRef<'div'>) => (
  <div {...cnProps(props, modalCN.main)} />
);

Modal.Footer = (props: React.ComponentPropsWithoutRef<'footer'>) => (
  <footer {...cnProps(props, modalCN.footer)} />
);
