import { RouteObject } from 'react-router-dom';
import { VerifyNotice } from './VerifyNotice';
import { Verify } from './Verify';

export const verifyRoute: RouteObject = {
  path: 'verify',
  children: [
    {
      path: 'notice',
      element: <VerifyNotice />,
    },
    {
      path: ':token',
      element: <Verify />,
    },
  ],
};
