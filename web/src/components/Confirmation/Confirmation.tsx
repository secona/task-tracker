import React from 'react';
import { Button } from '../Button';
import { ModalContent } from '../Modal/ModalContent';

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
          {children}
          <Button
            onClick={() => {
              onYes();
              setOpen(false);
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant='secondary'
            ref={el => setNoBtn(el!)}
          >
            No
          </Button>
        </ModalContent>
      )}
    </>
  );
};
