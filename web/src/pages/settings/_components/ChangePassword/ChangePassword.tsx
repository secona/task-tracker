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

export const ChangePassword = () => {
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
    formState: { errors },
  } = useForm<UserChangePasswordBody>({
    resolver: yupResolver(userAPI.changePassword.validation),
  });

  return (
    <Setting.Form
      settingTitle='Change Password'
      onSubmit={handleSubmit(data => mutation.mutate(data))}
    >
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
      <Button type='submit'>Change</Button>
    </Setting.Form>
  );
};
