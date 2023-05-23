import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import user, { ILogin } from '@/api/user';
import { Button } from '@/components/Button';
import { StepsPage, StepsPageForm } from '@/components/StepsPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { keys } from '@/config/keys';

import './LoginSlashRegister.scss';

export const Login = () => {
  if (localStorage.getItem(keys.isLoggedIn) === 'true') {
    return <Navigate to='/' />;
  }

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: ILogin) => {
      return user.login.login(data!);
    },
    onSuccess: ({ data }) => {
      if (data.msg === 'SUCCESS') {
        navigate('/');
        localStorage.setItem(keys.isLoggedIn, 'true');
      } else {
        switch (data.msg) {
          case 'VALIDATION_FAILED':
            return Object.entries(data.details).forEach(([k, v]) => {
              setError(k as keyof ILogin, { message: v.join('|') });
            });
          case 'UNVERIFIED_EMAIL':
            return navigate(`/register/post?email=${getValues('email')}`);
          case 'ALREADY_LOGGED_IN':
            localStorage.setItem(keys.isLoggedIn, 'true');
            return navigate('/');
          default:
            alert('An unexpected error has occurred.');
        }
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm<ILogin>({
    resolver: yupResolver(user.login.validation),
  });

  return (
    <StepsPage>
      <Heading fontSize='6xl'>Welcome Back!</Heading>
      <StepsPageForm
        onSubmit={handleSubmit(async v => {
          mutation.mutate(v);
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
