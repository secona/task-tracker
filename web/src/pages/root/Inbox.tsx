import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';

import './Project.scss';
import { useQueries } from '@tanstack/react-query';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import React from 'react';
import { Section } from '@/components/Section';

export const Inbox = () => {
  return (
    <div className='project'>
      <Section>
        <Heading fontSize='6xl'>Good Morning!</Heading>
      </Section>
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
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks()],
  });

  if (
    projectsQuery.data?.data.msg === 'SUCCESS' &&
    tasksQuery.data?.data.msg === 'SUCCESS'
  ) {
    const projects = projectsQuery.data.data.projects;
    const tasks = {
      unfinished: [] as React.ReactNode[],
      finished: [] as React.ReactNode[],
    };

    tasksQuery.data.data.tasks.forEach(task => {
      const component = (
        <Task
          key={task.task_id}
          task={task.task}
          description={task.description}
          colorCode={
            projects.find(project => project.project_id === task.project_id)
              ?.color || 0
          }
        />
      );

      if (task.done) tasks.finished.push(component);
      else tasks.unfinished.push(component);
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
