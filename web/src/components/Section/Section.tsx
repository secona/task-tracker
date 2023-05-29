import { ComponentPropsWithoutRef } from 'react';
import { mc } from '@/utils/mergeClassnames';

import './Section.scss';

export interface SectionProps extends ComponentPropsWithoutRef<'div'> {}

export const Section = (props: SectionProps) => {
  return <div {...mc(props, 'section')} />;
};
