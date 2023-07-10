import { ErrorResponse, isErrorResponse } from '@/api';
import { UserChangePasswordBody, userAPI } from '@/api/user';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { keys } from '@/config/keys';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Setting } from '../Setting/Setting';
import { Confirmation } from '@/components/Confirmation/Confirmation';
import { useModal } from '@/components/Modal/useModal';

export const ChangePassword = () => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ['edit', 'password'],
    mutationFn: async (body: UserChangePasswordBody) => {
      return userAPI.changePassword({ body });
    },
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem(keys.isLoggedIn);
      navigate('/account/login?new-password');
    },
    useErrorBoundary: error => !isErrorResponse(error, ['VALIDATION_FAILED']),
    onError: (error: ErrorResponse) => {
      switch (error.response?.data.msg) {
        case 'VALIDATION_FAILED':
          return Object.entries(error.response?.data.details).forEach(
            ([k, v]) => {
              setError(k as keyof UserChangePasswordBody, {
                message: v.join('|'),
              });
            }
          );
      }
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm<UserChangePasswordBody>({
    resolver: yupResolver(userAPI.changePassword.validation),
    mode: 'onChange',
  });

  return (
    <Setting.Form
      onSubmit={e => {
        e.preventDefault();
        trigger().then(success => success && modal.open());
      }}
    >
      <Setting.Main>
        <Setting.Title>Change Password</Setting.Title>
        <TextInput
          {...register('password')}
          type='password'
          fieldName='Password'
          error={errors.password}
        />
        <TextInput
          {...register('new_password')}
          type='password'
          fieldName='New Password'
          error={errors.new_password}
          disabled={mutation.isLoading}
        />
      </Setting.Main>
      <Setting.Footer>
        <Button type='submit'>Change</Button>
      </Setting.Footer>
      <Confirmation
        modal={modal}
        onYes={handleSubmit(data => mutation.mutate(data))}
      >
        <p>Are you sure you want to change your account's password?</p>
      </Confirmation>
    </Setting.Form>
  );
};
