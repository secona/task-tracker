import { forwardRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import './AccountForm.scss';

export interface AccountFormProps extends React.ComponentPropsWithRef<'form'> {}

export const AccountForm = forwardRef<HTMLFormElement, AccountFormProps>(
  (props, ref) => {
    return <form {...mc(props, 'steps-page__form')} ref={ref} />;
  }
);
