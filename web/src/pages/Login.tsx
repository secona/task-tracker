import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { Mail, Key, LogIn } from 'react-feather';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const LoginPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2.15rem;
  width: 22rem;
  background-color: ${p => p.theme.elevation[1]};
  padding: 2rem 4.25rem;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`;

export const Login = () => {
  return (
    <Wrapper>
      <LoginPanel>
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
            fieldName='Password'
          />
        </LoginForm>
        <Button RightIcon={LogIn}>Log In</Button>
      </LoginPanel>
    </Wrapper>
  );
};
