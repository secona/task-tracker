import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';

import './Project.scss';
import { Section } from '@/components/Section';

export const Project = () => {
  return (
    <div className='project'>
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
  const [tasksQuery, projectsQuery] = useQueries({
    queries: [queries.tasks(projectId), queries.projects()],
  });

  if (
    tasksQuery.data?.data.msg === 'SUCCESS' &&
    projectsQuery.data?.data.msg === 'SUCCESS'
  ) {
    const tasks = {
      unfinished: [] as React.ReactNode[],
      finished: [] as React.ReactNode[],
    };

    tasksQuery.data.data.tasks.forEach(task => {
      const component = <Task key={task.task_id} {...task} />;
      if (task.done) {
        tasks.finished.push(component);
      } else {
        tasks.unfinished.push(component);
      }
    });

    const thisProject = projectsQuery.data.data.projects.find(
      p => p.project_id === projectId
    );

    return (
      <>
        <Section>
          <Heading fontSize='6xl' className='project__name'>
            {thisProject?.name}
          </Heading>
          <p className='project__description'>{thisProject?.description}</p>
        </Section>
        <TaskGroup title='Unfinished'>{tasks.unfinished}</TaskGroup>
        <TaskGroup title='Finished'>{tasks.finished}</TaskGroup>
      </>
    );
  }

  return <></>;
};
