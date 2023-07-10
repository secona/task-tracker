import React from 'react';
import { Button } from '../Button';
import { ModalContent } from '../Modal/ModalContent';
import { Modal } from '../Modal/Modal';
import { Check, X } from 'react-feather';
import { UseModalResult } from '../Modal/useModal';

export interface ConfirmationProps {
  children: React.ReactNode;
  modal: UseModalResult;
  onYes(): void;
}

export const Confirmation = ({ children, onYes, modal }: ConfirmationProps) => {
  return (
    <>
      {modal.opened && (
        <ModalContent closeModal={modal.close}>
          <Modal.Main>
            <Modal.Title>Confirm</Modal.Title>
            {children}
          </Modal.Main>
          <Modal.Footer>
            <Button
              LeftIcon={Check}
              onClick={() => {
                onYes();
                modal.close();
              }}
            >
              Yes
            </Button>
            <Button
              LeftIcon={X}
              onClick={modal.close}
              variant='secondary'
              autoFocus
            >
              No
            </Button>
          </Modal.Footer>
        </ModalContent>
      )}
    </>
  );
};
