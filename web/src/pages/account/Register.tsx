import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Key, LogIn } from 'react-feather';
import { userAPI, UserRegisterBody } from '@/api/user';
import { ErrorResponse, isErrorResponse } from '@/api';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { AccountForm } from './_components/AccountForm/AccountForm';
import { AltAction } from './_components/AltAction/AltAction';

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['registration'],
    mutationFn: (body: UserRegisterBody) => {
      return userAPI.register({ body });
    },
    onSuccess: () => {
      navigate(`../verify/notice`);
    },
    onError: (error: ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'VALIDATION_FAILED':
          return Object.entries(error.response?.data.details).forEach(
            ([k, v]) => {
              setError(k as keyof UserRegisterBody, { message: v.join('|') });
            }
          );
      }
    },
    useErrorBoundary: error => !isErrorResponse(error, ['VALIDATION_FAILED']),
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
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
          autoFocus
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
      <AltAction>
        Already have an account? <Link to='../login'>Log in</Link> instead.
      </AltAction>
    </>
  );
};
