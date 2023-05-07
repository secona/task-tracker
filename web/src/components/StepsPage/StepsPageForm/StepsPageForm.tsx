import { forwardRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import './StepsPageForm.scss';

export interface StepsPageFormProps
  extends React.ComponentPropsWithRef<'form'> {}

export const StepsPageForm = forwardRef<HTMLFormElement, StepsPageFormProps>(
  (props, ref) => {
    return <form {...mc(props, 'steps-page__form')} ref={ref} />;
  }
);
