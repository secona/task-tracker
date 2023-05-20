import { useSearchParams } from 'react-router-dom';
import { Heading } from '@/components/Heading';
import { StepsPage } from '@/components/StepsPage';

export const PostRegister = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <StepsPage>
      <Heading fontSize='6xl'>Time To Verify Your Email!</Heading>
      <p>
        We've sent an email to {email ? <b>{email}</b> : 'your email address'}{' '}
        to verify your email address and activate your account. The link in the
        email will expire in <b>1 hour</b>.
      </p>
      <p>P.S. You can close this tab.</p>
    </StepsPage>
  );
};
