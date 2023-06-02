import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Project = () => {
  return (
    <Content.Container>
      <QueryState
        Error={({ resetErrorBoundary }) => (
          <button onClick={resetErrorBoundary}>retry</button>
        )}
      >
        <QueriedTasksList />
      </QueryState>
      <Outlet />
    </Content.Container>
  );
};

const QueriedTasksList = () => {
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
      const component = <Content.Task key={task.task_id} task={task} />;
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
        <Content.Card>
          <Content.ProjectName children={thisProject?.name} />
          <Content.ProjectDescription children={thisProject?.description} />
        </Content.Card>
        <Content.TaskList title='Unfinished' children={tasks.unfinished} />
        <Content.TaskList title='Finished' children={tasks.finished} />
      </>
    );
  }

  return <></>;
};
