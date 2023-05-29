import { ComponentPropsWithoutRef } from 'react';
import { mc } from '@/utils/mergeClassnames';
import { Section } from '@/components/Section';

import './TaskGroup.scss';

export interface TaskGroupProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

export const TaskGroup = ({ title, children, ...props }: TaskGroupProps) => {
  return (
    <Section {...mc(props, 'task-group')}>
      <p className='task-group__title'>{title}</p>
      {children}
    </Section>
  );
};
