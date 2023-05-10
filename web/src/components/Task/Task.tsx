import { ComponentPropsWithoutRef } from 'react';
import './Task.scss';
import { mc } from '@/utils/mergeClassnames';
import { CheckCircle, Circle } from 'react-feather';

interface TaskProps extends ComponentPropsWithoutRef<'div'> {
  task: string;
  description: string;
  colorCode?: number;
  done?: boolean;
}

export const Task = ({
  task,
  description,
  colorCode,
  done = false,
  ...props
}: TaskProps) => {
  return (
    <div
      {...mc(
        props,
        'task',
        colorCode === undefined ? undefined : `task--color-${colorCode}`
      )}
    >
      <button className='task__finish'>
        {done ? (
          <CheckCircle color='gray' size={16} />
        ) : (
          <Circle color='white' size={16} />
        )}
      </button>
      <div>
        <p {...mc({}, 'task__task', done ? 'task__task--done' : undefined)}>
          {task}
        </p>
        <p className='task__description'>{description}</p>
      </div>
    </div>
  );
};
