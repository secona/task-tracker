import { mc } from '@/utils/mergeClassnames';
import { ComponentPropsWithoutRef } from 'react';

import './TaskGroup.scss';

export interface TaskGroupProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

export const TaskGroup = ({ title, children, ...props }: TaskGroupProps) => {
  return (
    <div {...mc(props, 'task-group')}>
      <p className='task-group__title'>{title}</p>
      {children}
    </div>
  );
};
