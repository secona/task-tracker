import { useLocation } from 'react-router-dom';
import { Heading } from '@/components/Heading';

export const VerifyNotice = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <>
      <Heading fontSize='6xl'>Time To Verify Your Email!</Heading>
      <p>
        We've sent an email to {email ? <b>{email}</b> : 'your email address'}{' '}
        to verify your email address and activate your account. The link in the
        email will expire in <b>1 hour</b>.
      </p>
      <p>P.S. You can close this tab.</p>
    </>
  );
};
