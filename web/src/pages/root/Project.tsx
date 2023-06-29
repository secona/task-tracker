import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Project = () => {
  const { projectId } = useParams();
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks(projectId)],
  });

  const project = projectsQuery.data?.find(p => p.project_id === projectId)!;

  return (
    <Content.Container>
      <Content.ProjectDetails project={project} />
      <Content.SortedTaskList
        projectsQuery={projectsQuery}
        tasksQuery={tasksQuery}
      />
      <Outlet />
    </Content.Container>
  );
};
