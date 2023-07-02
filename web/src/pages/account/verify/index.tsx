import { RouteObject } from 'react-router-dom';
import { VerifyNotice } from './VerifyNotice';
import { Verify } from './Verify';
import { VerifyForm } from './VerifyForm';

export const verifyRoute: RouteObject = {
  path: 'verify',
  children: [
    {
      path: 'notice',
      element: <VerifyNotice />,
    },
    {
      path: 'form',
      element: <VerifyForm />,
    },
    {
      path: ':token',
      element: <Verify />,
    },
  ],
};
