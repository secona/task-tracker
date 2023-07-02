import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'react-feather';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { AuthSendVerifyBody, authAPI } from '@/api/auth';
import { AccountForm } from '../_components/AccountForm/AccountForm';

export const VerifyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mutation = useMutation({
    mutationFn: async (body: AuthSendVerifyBody) => {
      authAPI.sendVerify({ body });
    },
    onSuccess: () => {
      navigate('../notice');
    },
  });

  const { register, handleSubmit } = useForm<AuthSendVerifyBody>({
    resolver: yupResolver(authAPI.sendVerify.validation),
  });

  const email = location.state?.email;

  React.useEffect(() => {
    if (email) {
      mutation.mutate({ email });
    }
  }, []);

  if (email) {
    return <></>;
  }

  return (
    <>
      <Heading fontSize='6xl'>Time To Verify Your Email!</Heading>
      <AccountForm onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput
          {...register('email')}
          LeftIcon={Mail}
          fieldName='Email'
          placeholder='me@example.com'
        />
        <Button RightIcon={ArrowRight}>Send</Button>
      </AccountForm>
    </>
  );
};
