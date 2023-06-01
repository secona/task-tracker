import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { QueryState } from '@/components/QueryState';
import { Section } from '@/components/Section';
import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task';
import { queries } from '@/queries';

import taskListCN from './TaskList.module.scss';

export const Inbox = () => {
  return (
    <div className={taskListCN.container}>
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
          task={task}
          project={projects.find(
            project => project.project_id === task.project_id
          )}
        />
      );

      if (task.done) tasks.finished.push(component);
      else tasks.unfinished.push(component);
    });

    return (
      <>
        <Section className={taskListCN.taskList} title='Unfinished'>
          {tasks.unfinished}
        </Section>
        <Section className={taskListCN.taskList} title='Finished'>
          {tasks.finished}
        </Section>
      </>
    );
  }

  return <></>;
};
