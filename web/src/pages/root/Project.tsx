import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';

import './Project.scss';

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
  const query = useQuery(queries.tasks(projectId));

  if (query.data?.data.msg === 'SUCCESS') {
    const tasks = {
      unfinished: [] as React.ReactNode[],
      finished: [] as React.ReactNode[],
    };

    query.data.data.tasks.forEach(task => {
      const component = <Task key={task.task_id} {...task} />;
      if (task.done) {
        tasks.finished.push(component);
      } else {
        tasks.unfinished.push(component);
      }
    });

    return (
      <>
        <TaskGroup title='Unfinished'>{tasks.unfinished}</TaskGroup>
        <TaskGroup title='Finished'>{tasks.finished}</TaskGroup>
      </>
    );
  }

  return <></>;
};
