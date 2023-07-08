import React from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ModalContent } from '@/components/Modal/ModalContent';
import { QueryState } from '@/components/QueryState';
import { cnProps } from '@/utils/mergeClassnames';

import popupFormCN from './PopupForm.module.scss';

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
      <Heading fontSize='3xl' className={popupFormCN.title}>
        {props.title}
      </Heading>
      {props.children}
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
