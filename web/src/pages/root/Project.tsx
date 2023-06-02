import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { Content } from './_layout';

import taskListCN from './TaskList.module.scss';

export const Project = () => {
  return (
    <div className={taskListCN.container}>
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
      const component = <Task key={task.task_id} task={task} />;
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
          <Heading fontSize='6xl' className={taskListCN.name}>
            {thisProject?.name}
          </Heading>
          <p className={taskListCN.description}>{thisProject?.description}</p>
        </Content.Card>
        <Content.Card className={taskListCN.taskList} title='Unfinished'>
          {tasks.unfinished}
        </Content.Card>
        <Content.Card className={taskListCN.taskList} title='Finished'>
          {tasks.finished}
        </Content.Card>
      </>
    );
  }

  return <></>;
};
