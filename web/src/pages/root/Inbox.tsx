import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Inbox = () => {
  return (
    <Content.Container>
      <Content.Card>
        <Content.ProjectName>Good Morning!</Content.ProjectName>
      </Content.Card>
      <QueryState
        Error={({ resetErrorBoundary }) => (
          <button onClick={resetErrorBoundary}>retry</button>
        )}
      >
        <QueriedTasksList />
      </QueryState>
    </Content.Container>
  );
};

const QueriedTasksList = () => {
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
        <Content.Task
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
        <Content.TaskList title='Unfinished' children={tasks.unfinished} />
        <Content.TaskList title='Finished' children={tasks.finished} />
      </>
    );
  }

  return <></>;
};
