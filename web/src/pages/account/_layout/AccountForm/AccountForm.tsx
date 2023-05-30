import { forwardRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import accountFormCN from './AccountForm.module.scss';

export interface AccountFormProps extends React.ComponentPropsWithRef<'form'> {}

export const AccountForm = forwardRef<HTMLFormElement, AccountFormProps>(
  (props, ref) => {
    return <form {...mc(props, accountFormCN.form)} ref={ref} />;
  }
);
