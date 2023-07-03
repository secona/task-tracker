import { ChangeEmail } from './_components/ChangeEmail/ChangeEmail';
import { ChangePassword } from './_components/ChangePassword/ChangePassword';

export const Account = () => {
  return (
    <>
      <ChangePassword />
      <ChangeEmail />
    </>
  );
};
