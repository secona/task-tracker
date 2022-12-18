import { Button } from '@/components/Button';
import { FormPage } from '@/components/FormPage/FormPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { Mail, User, Key, LogIn } from 'react-feather';
import styled from 'styled-components';

const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`;

export const Register = () => {
  return (
    <FormPage>
      <Heading fontSize='6xl'>Greetings!</Heading>
      <RegisterForm>
        <TextInput LeftIcon={User} placeholder='Rick Astley' fieldName='Name' />
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
      </RegisterForm>
      <Button RightIcon={LogIn}>Register</Button>
    </FormPage>
  );
};
