import { forwardRef } from 'react';
import { cnProps } from '@/utils/mergeClassnames';

import accountFormCN from './AccountForm.module.scss';

export interface AccountFormProps extends React.ComponentPropsWithRef<'form'> {}

export const AccountForm = forwardRef<HTMLFormElement, AccountFormProps>(
  (props, ref) => {
    return <form {...cnProps(props, accountFormCN.form)} ref={ref} />;
  }
);
