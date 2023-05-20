import React, { forwardRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import './StepsPage.scss';

export interface StepsPageProps extends React.ComponentPropsWithRef<'div'> {}

export const StepsPage = forwardRef<HTMLDivElement, StepsPageProps>(props => {
  return (
    <div className='steps-page'>
      <div {...mc(props, 'steps-page__panel')} />
    </div>
  );
});
