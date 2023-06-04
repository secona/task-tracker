import { authAPI } from '@/api/auth';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  if (token) {
    authAPI.verify({ context: { token } }).then(result => {
      switch (result.data.msg) {
        case 'SUCCESS':
          return navigate('../login?verified');
        case 'UNKNOWN':
          return navigate('../login?error');
      }
    });
  }

  return <Navigate to='../login' />;
};
