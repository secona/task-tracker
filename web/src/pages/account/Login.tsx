import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authAPI, AuthLoginBody } from '@/api/auth';
import { ErrorResponse, isErrorResponse } from '@/api';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { keys } from '@/config/keys';
import { AccountForm } from './_layout/AccountForm/AccountForm';
import { AltAction } from './_layout/AltAction/AltAction';

export const Login = () => {
  if (localStorage.getItem(keys.isLoggedIn) === 'true') {
    return <Navigate to='/' />;
  }

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: AuthLoginBody) => {
      return authAPI.login({ body });
    },
    onSuccess: () => {
      localStorage.setItem(keys.isLoggedIn, 'true');
      navigate('/');
    },
    onError: (error: ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'VALIDATION_FAILED':
          return Object.entries(error.response.data.details).forEach(
            ([k, v]) => {
              setError(k as keyof AuthLoginBody, { message: v.join('|') });
            }
          );
        case 'UNVERIFIED_EMAIL':
          return navigate(`../verify/notice`, {
            state: { email: getValues('email') },
          });
      }
    },
    useErrorBoundary: error =>
      !isErrorResponse(error, ['VALIDATION_FAILED', 'UNVERIFIED_EMAIL']),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm<AuthLoginBody>({
    resolver: yupResolver(authAPI.login.validation),
  });

  return (
    <>
      <Heading fontSize='6xl'>Welcome Back!</Heading>
      <AccountForm
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
      </AccountForm>
      <AltAction>
        Don't have an account? <Link to='../register'>Register</Link> instead.
      </AltAction>
    </>
  );
};
