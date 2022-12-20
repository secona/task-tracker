import user, { ILogin } from '@/api/user';
import { Button } from '@/components/Button';
import { FormPage } from '@/components/FormPage/FormPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
`;

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    resolver: yupResolver(user.login.validation),
  });

  return (
    <FormPage>
      <Heading fontSize='6xl'>Welcome Back!</Heading>
      <LoginForm
        onSubmit={handleSubmit(async v => {
          const res = await user.login.login(v);
          console.log(res);
        })}
      >
        <TextInput
          {...register('email')}
          LeftIcon={Mail}
          placeholder='me@example.com'
          fieldName='Email'
          error={errors.email}
        />
        <TextInput
          {...register('password')}
          LeftIcon={Key}
          placeholder='shhh...'
          type='password'
          fieldName='Password'
          error={errors.password}
        />
        <Button RightIcon={LogIn} type='submit'>
          Log In
        </Button>
      </LoginForm>
    </FormPage>
  );
};
