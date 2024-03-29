import { UserChangeEmailBody, userAPI } from '@/api/user';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { keys } from '@/config/keys';
import { queries } from '@/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Setting } from '../Setting/Setting';
import { Confirmation } from '@/components/Confirmation/Confirmation';
import { useModal } from '@/components/Modal/useModal';

export const ChangeEmail = () => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery({
    ...queries.user(),
    onSuccess: data => {
      reset({ email: data.email });
    },
  });

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
    reset,
    watch,
    formState: { errors },
  } = useForm<UserChangeEmailBody>({
    resolver: yupResolver(userAPI.changeEmail.validation),
    reValidateMode: 'onChange',
  });

  console.log();

  return (
    <Setting.Form
      onSubmit={e => {
        e.preventDefault();
        modal.open();
      }}
    >
      <Setting.Main>
        <Setting.Title>Change Email</Setting.Title>
        <TextInput
          {...register('email')}
          placeholder='anotherme@example.com'
          fieldName='Email'
          error={errors.email}
        />
      </Setting.Main>
      <Setting.Footer>
        <Button type='submit' disabled={watch('email') === query.data?.email}>
          Change
        </Button>
      </Setting.Footer>
      <Confirmation
        modal={modal}
        onYes={handleSubmit(data => mutation.mutate(data))}
      >
        <p>
          Are you sure you want to change your account's email to{' '}
          <b>{getValues('email')}</b>?
        </p>
      </Confirmation>
    </Setting.Form>
  );
};
