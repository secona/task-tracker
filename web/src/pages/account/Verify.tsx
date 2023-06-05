import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { authAPI } from '@/api/auth';

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  if (!token) return <Navigate to='../login' />;

  const mutation = useMutation({
    mutationKey: ['verify'],
    mutationFn: () => {
      return authAPI.verify({ context: { token } });
    },
    onSuccess: () => {
      return navigate('../login?verified');
    },
    onError: () => {
      return navigate('../login?error');
    },
    useErrorBoundary: false,
  });

  React.useEffect(() => {
    mutation.mutate();
  }, []);

  return <Navigate to='../login' />;
};
