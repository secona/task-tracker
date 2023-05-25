import { useParams } from 'react-router-dom';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';
import tasks, { Task as TaskType } from '@/api/tasks';

import './Project.scss';

export const tasksQuery = (projectId?: string) =>
  ({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: () => tasks.getMany({ projectId }),
  } satisfies QueryOptions);

export const Project = () => {
  const { projectId } = useParams();
  const query = useQuery(tasksQuery(projectId));
  const tasks = (() => {
    const result = {
      unfinished: [] as TaskType[],
      finished: [] as TaskType[],
    };
    if (query.data?.data.msg === 'SUCCESS') {
      query.data.data.tasks.forEach(task => {
        if (task.done) result.finished.push(task);
        else result.unfinished.push(task);
      });
    }
    return result;
  })();

  return (
    <div className='project'>
      <Heading fontSize='6xl'>School</Heading>
      <TaskGroup title='Unfinished'>
        {tasks.unfinished.map(task => (
          <Task {...task} />
        ))}
      </TaskGroup>
      <TaskGroup title='Finished'>
        {tasks.finished.map(task => (
          <Task {...task} />
        ))}
      </TaskGroup>
    </div>
  );
};
