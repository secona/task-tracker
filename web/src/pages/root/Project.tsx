import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Project = () => {
  const { projectId } = useParams();
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks(projectId)],
  });

  const thisProject = projectsQuery.data?.find(p => p.project_id === projectId);

  return (
    <Content.Container>
      <Content.Card>
        <Content.ProjectName children={thisProject?.name} />
        <Content.ProjectDescription children={thisProject?.description} />
        {/* Temporary */} <Link to='edit'>Edit Project</Link>
        {/* Temporary */} <Link to='new'>Add New Task</Link>
      </Content.Card>
      <Content.SortedTaskList
        projectsQuery={projectsQuery}
        tasksQuery={tasksQuery}
      />
      <Outlet />
    </Content.Container>
  );
};
