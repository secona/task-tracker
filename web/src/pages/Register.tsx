import { Button } from '@/components/Button';
import { StepsPage } from '@/components/StepsPage/StepsPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import user, { IRegister } from '@/api/user';
import { Mail, User, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { StepsPageForm } from '@/components/StepsPage/StepsPageForm/StepsPageForm';

import './LoginSlashRegister.scss';

export const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['registration'],
    mutationFn: (data: IRegister) => {
      return user.register.register(data!);
    },
    // whatever the status code, onSuccess will trigger
    onSuccess: data => {
      console.log(data);
      switch (data.status) {
        case 201:
          return navigate('/');
        case 422:
          return setError('email', { message: data.data.msg });
        default:
          alert('An unexpected error has occurred.');
      }
    },
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<IRegister>({
    resolver: yupResolver(user.register.validation),
  });

  return (
    <StepsPage className='login-slash-register-page'>
      <StepsPageForm
        onSubmit={handleSubmit(data => {
          mutation.mutate(data);
        })}
      >
        <Heading fontSize='6xl'>Greetings!</Heading>
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
      </StepsPageForm>
      <span className='login-slash-register-page__alt-action'>
        Already have an account? <Link to='/login'>Log in</Link> instead.
      </span>
    </StepsPage>
  );
};
