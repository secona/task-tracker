import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Key, LogIn } from 'react-feather';
import { userAPI, UserRegisterData } from '@/api/user';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { AccountForm } from './_layout';

import authCN from './Auth.module.scss';

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['registration'],
    mutationFn: (data: UserRegisterData) => {
      return userAPI.register(data);
    },
    onSuccess: ({ data }) => {
      console.log(data);
      if (data.msg !== 'SUCCESS') {
        switch (data.msg) {
          case 'VALIDATION_FAILED':
            return Object.entries(data.details).forEach(([k, v]) => {
              setError(k as keyof UserRegisterData, { message: v.join('|') });
            });
          default:
            return alert('An unexpected error has occurred.');
        }
      } else {
        navigate(`../register/post?email=${getValues('email')}`);
      }
    },
    onError: () => {
      return alert('An unexpected error has occurred.');
    },
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    getValues,
  } = useForm<UserRegisterData>({
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
