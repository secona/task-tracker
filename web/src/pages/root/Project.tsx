import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Project = () => {
  const { projectId } = useParams();
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks(projectId)],
  });

  return (
    <Content.Container>
      <Content.ProjectDetails projectsQuery={projectsQuery} />
      <Content.SortedTaskList
        projectsQuery={projectsQuery}
        tasksQuery={tasksQuery}
      />
      <Outlet />
    </Content.Container>
  );
};
