import { useParams } from 'react-router-dom';
import { QueryClient, QueryOptions, useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';
import { QueryState } from '@/components/QueryState';
import tasks from '@/api/tasks';
import { separateTasks } from '@/utils/separateTasks';

import './Project.scss';

export const tasksQuery = (projectId?: string) =>
  ({
    queryKey: ['projects', projectId, 'tasks'],
    queryFn: () => tasks.getMany({ projectId }),
  } satisfies QueryOptions);

export const Project = () => {
  return (
    <div className='project'>
      <Heading fontSize='6xl'>School</Heading>
      <QueryState
        Error={({ resetErrorBoundary }) => (
          <button onClick={resetErrorBoundary}>retry</button>
        )}
      >
        <TasksList />
      </QueryState>
    </div>
  );
};

const TasksList = () => {
  const { projectId } = useParams();
  const query = useQuery(tasksQuery(projectId));
  // @ts-ignore
  const tasks = separateTasks(query.data?.data.tasks);

  return (
    <>
      <TaskGroup title='Unfinished'>
        {tasks.unfinished.map(task => (
          <Task key={task.task_id} {...task} />
        ))}
      </TaskGroup>
      <TaskGroup title='Finished'>
        {tasks.finished.map(task => (
          <Task key={task.task_id} {...task} />
        ))}
      </TaskGroup>
    </>
  );
};
