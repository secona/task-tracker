import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ModalContent } from '@/components/Modal/ModalContent';
import { QueryState } from '@/components/QueryState';
import { cnProps } from '@/utils/mergeClassnames';

import popupFormCN from './PopupForm.module.scss';
import { Modal } from '@/components/Modal/Modal';

export interface PopupFormProps extends React.ComponentPropsWithoutRef<'form'> {
  title: string;
  closeModal(): void;
}

const PopupFormWrapper = (props: PopupFormProps) => {
  return (
    <ModalContent
      closeModal={props.closeModal}
      className={popupFormCN.container}
    >
      <Modal.Main>
        <Modal.Title fontSize='3xl' className={popupFormCN.title}>
          {props.title}
        </Modal.Title>
        {props.children}
      </Modal.Main>
    </ModalContent>
  );
};

export const PopupForm = ({
  title,
  closeModal,
  ...otherProps
}: PopupFormProps) => {
  return (
    <PopupFormWrapper closeModal={closeModal} title={title}>
      <form {...cnProps(otherProps, popupFormCN.form)} />
    </PopupFormWrapper>
  );
};

export interface PopupFormWaitForProps extends PopupFormProps {
  query: UseQueryResult;
  loadingElement: React.ReactNode;
}

PopupForm.WaitFor = ({
  title,
  closeModal,
  query,
  loadingElement,
  ...otherProps
}: PopupFormWaitForProps) => {
  return (
    <PopupFormWrapper closeModal={closeModal} title={title}>
      <QueryState query={query} loading={loadingElement}>
        <form {...cnProps(otherProps, popupFormCN.form)} />
      </QueryState>
    </PopupFormWrapper>
  );
};
