import { UserChangeEmailBody, userAPI } from '@/api/user';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { TextInput } from '@/components/TextInput';
import { keys } from '@/config/keys';
import { queries } from '@/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const ChangeEmail = () => {
  const queryClient = useQueryClient();
  const query = useQuery(queries.user());
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['edit', 'email'],
    mutationFn: async (body: UserChangeEmailBody) => {
      return userAPI.changeEmail({ body });
    },
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem(keys.isLoggedIn);
      navigate('/account/verify/form', {
        state: { email: getValues('email') },
      });
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserChangeEmailBody>({
    resolver: yupResolver(userAPI.changeEmail.validation),
  });

  return (
    <>
      <Heading fontSize='5xl'>Change Email</Heading>
      <p>Current Email: {query.isLoading ? 'Loading...' : query.data?.email}</p>
      <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
        <TextInput
          {...register('email')}
          placeholder='anotherme@example.com'
          fieldName='New Email'
          error={errors.email}
        />
        <Button type='submit'>Change</Button>
      </form>
    </>
  );
};
