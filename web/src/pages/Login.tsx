import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import user, { ILogin } from '@/api/user';
import { Button } from '@/components/Button';
import { StepsPage, StepsPageForm } from '@/components/StepsPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';

import './LoginSlashRegister.scss';

export const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    resolver: yupResolver(user.login.validation),
  });

  return (
    <StepsPage>
      <Heading fontSize='6xl'>Welcome Back!</Heading>
      <StepsPageForm
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
      </StepsPageForm>
      <span className='login-slash-register-page__alt-action'>
        Don't have an account? <Link to='/register'>Register</Link> instead.
      </span>
    </StepsPage>
  );
};
