import { Button } from '@/components/Button';
import { FormPage } from '@/components/FormPage/FormPage';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import user, { IRegister } from '@/api/user';
import { Mail, User, Key, LogIn } from 'react-feather';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegister>({
    resolver: yupResolver(user.register.validation),
  });

  return (
    <FormPage
      onSubmit={handleSubmit(async v => {
        const res = await user.register.register(v);
        console.log(res);
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
      <Button RightIcon={LogIn} type='submit'>
        Register
      </Button>
    </FormPage>
  );
};
