import React from 'react';
import { Button } from '../Button';
import { ModalContent } from '../Modal/ModalContent';
import { Modal } from '../Modal/Modal';
import { Check, X } from 'react-feather';

export interface ConfirmationProps {
  children: React.ReactNode;
  open: boolean;
  setOpen(v: boolean): void;
  onYes(): void;
}

export const Confirmation = ({
  children,
  open,
  setOpen,
  onYes,
}: ConfirmationProps) => {
  const [noBtn, setNoBtn] = React.useState<HTMLButtonElement>();

  React.useEffect(() => {
    noBtn?.focus();
  }, [noBtn]);

  return (
    <>
      {open && (
        <ModalContent closeModal={() => setOpen(false)}>
          <Modal.Main>
            <Modal.Title>Confirm</Modal.Title>
            {children}
          </Modal.Main>
          <Modal.Footer>
            <Button
              LeftIcon={Check}
              onClick={() => {
                onYes();
                setOpen(false);
              }}
            >
              Yes
            </Button>
            <Button
              LeftIcon={X}
              onClick={() => setOpen(false)}
              variant='secondary'
              ref={el => setNoBtn(el!)}
            >
              No
            </Button>
          </Modal.Footer>
        </ModalContent>
      )}
    </>
  );
};
