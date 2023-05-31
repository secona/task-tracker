import { ComponentPropsWithoutRef } from 'react';
import { CheckCircle, Circle } from 'react-feather';
import { cn, cnProps } from '@/utils/mergeClassnames';

import taskCN from './Task.module.scss';

export interface TaskProps extends ComponentPropsWithoutRef<'div'> {
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
      {...cnProps(
        props,
        taskCN.taskCard,
        colorCode !== undefined && taskCN[`taskCard_color${colorCode}`]
      )}
    >
      <button className={taskCN.finishButton}>
        {done ? (
          <CheckCircle color='gray' size={16} />
        ) : (
          <Circle color='white' size={16} />
        )}
      </button>
      <div>
        <p className={cn(taskCN.task, done && taskCN.task_done)}>{task}</p>
        <p className={taskCN.description}>{description}</p>
      </div>
    </div>
  );
};
