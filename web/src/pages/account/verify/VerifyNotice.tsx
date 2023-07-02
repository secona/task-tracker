import { Link } from 'react-router-dom';
import { Heading } from '@/components/Heading';
import { AltAction } from '../_components/AltAction/AltAction';

export const VerifyNotice = () => {
  return (
    <>
      <Heading fontSize='6xl'>Time To Verify Your Email!</Heading>
      <p>
        We've sent an email to your email address to verify your email address
        and activate your account. The link in the email will expire in{' '}
        <b>1 hour</b>.
      </p>
      <AltAction>
        Don't see an email from us? <Link to='../form'>Resend link</Link>.
      </AltAction>
    </>
  );
};
