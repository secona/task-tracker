import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Key, LogIn } from 'react-feather';
import { userAPI, UserRegisterBody } from '@/api/user';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { AccountForm } from './_layout';

import authCN from './Auth.module.scss';
import { NEW_ErrorResponse, NEW_isErrorResponse } from '@/api';

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['registration'],
    mutationFn: (body: UserRegisterBody) => {
      return userAPI.register({ body });
    },
    onSuccess: () => {
      navigate(`../register/post?email=${getValues('email')}`);
    },
    onError: (error: NEW_ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'VALIDATION_FAILED':
          return Object.entries(error.response?.data.details).forEach(
            ([k, v]) => {
              setError(k as keyof UserRegisterBody, { message: v.join('|') });
            }
          );
      }
    },
    useErrorBoundary: error => !NEW_isErrorResponse(error, 'VALIDATION_FAILED'),
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    getValues,
  } = useForm<UserRegisterBody>({
    resolver: yupResolver(userAPI.register.validation),
  });

  return (
    <>
      <Heading fontSize='6xl'>Greetings!</Heading>
      <AccountForm
        onSubmit={handleSubmit(data => {
          mutation.mutate(data);
        })}
      >
        <TextInput
          {...register('name')}
          LeftIcon={User}
          placeholder='Rick Astley'
          fieldName='Name'
          error={errors.name}
        />
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
        <Button RightIcon={LogIn} type='submit' loading={mutation.isLoading}>
          Register
        </Button>
      </AccountForm>
      <span className={authCN.altAction}>
        Already have an account? <Link to='../login'>Log in</Link> instead.
      </span>
    </>
  );
};
