import { mc } from '@/utils/mergeClassnames';
import React, { forwardRef } from 'react';

import './FormPage.scss';

export interface FormPageProps extends React.ComponentPropsWithRef<'form'> {}

export const FormPage = forwardRef<HTMLFormElement, FormPageProps>(
  (props, ref) => {
    return (
      <div className='form-page'>
        <div className='form-page__panel'>
          <form {...mc(props, 'form-page__form')} ref={ref} />
        </div>
      </div>
    );
  }
);
