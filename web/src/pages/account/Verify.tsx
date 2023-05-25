import axios from 'axios';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';

export const Verify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  if (token) {
    axios.post(`/api/auth/verify/${token}`).then(result => {
      if (result.data.success) return navigate('/login?verified');
      if (result.status === 500) return navigate('/login?error');
    });
  }

  return <Navigate to='/login' />;
};
