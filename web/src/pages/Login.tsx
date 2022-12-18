import { Button } from '@/components/Button';
import { FormPage } from '@/components/FormPage/FormPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { Mail, Key, LogIn } from 'react-feather';
import styled from 'styled-components';

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`;

export const Login = () => {
  return (
    <FormPage>
      <Heading fontSize='6xl'>Welcome Back!</Heading>
      <LoginForm>
        <TextInput
          LeftIcon={Mail}
          placeholder='me@example.com'
          fieldName='Email'
        />
        <TextInput
          LeftIcon={Key}
          placeholder='shhh...'
          type='password'
          fieldName='Password'
        />
      </LoginForm>
      <Button RightIcon={LogIn}>Log In</Button>
    </FormPage>
  );
};
