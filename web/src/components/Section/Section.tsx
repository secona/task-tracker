import { ComponentPropsWithoutRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import './Section.scss';

export interface SectionProps extends ComponentPropsWithoutRef<'div'> {
  title?: string;
}

export const Section = ({ title, children, ...props }: SectionProps) => {
  return (
    <div {...mc(props, 'section', title && 'section--titled')}>
      {title && <p className='section__title'>{title}</p>}
      {children}
    </div>
  );
};
