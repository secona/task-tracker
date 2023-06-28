import { ComponentPropsWithoutRef } from 'react';
import { CheckCircle, Circle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { ITask } from '@/api/tasks';
import { IProject } from '@/api/projects';
import { cn, cnProps } from '@/utils/mergeClassnames';
import { TaskLoading } from './TaskLoading';

import taskCN from './Task.module.scss';

export interface TaskProps extends ComponentPropsWithoutRef<'div'> {
  task: ITask;
  project?: IProject;
}

export const Task = ({ task, project, ...props }: TaskProps) => {
  const navigate = useNavigate();

  return (
    <div
      {...cnProps(
        props,
        taskCN.taskCard,
        project?.color !== undefined &&
          taskCN[`taskCard_color${project.color || 0}`]
      )}
    >
      <button className={taskCN.finishButton}>
        {task.done ? (
          <CheckCircle color='gray' size='1rem' />
        ) : (
          <Circle color='white' size='1rem' />
        )}
      </button>
      <div>
        <p
          className={cn(taskCN.task, task.done && taskCN.task_done)}
          onClick={() => navigate(`edit/${task.task_id}`)}
        >
          {task.task}
        </p>
        <p className={taskCN.description}>{task.description}</p>
      </div>
    </div>
  );
};

Task.Loading = TaskLoading;
