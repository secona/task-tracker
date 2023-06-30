import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Container } from './_components/Container/Container';
import { ProjectDetails } from './_components/ProjectDetails/ProjectDetails';
import { SortedTaskList } from './_components/SortedTaskList/SortedTaskList';

export const Project = () => {
  const { projectId } = useParams();
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks(projectId)],
  });

  return (
    <Container>
      <ProjectDetails projectsQuery={projectsQuery} />
      <SortedTaskList projectsQuery={projectsQuery} tasksQuery={tasksQuery} />
      <Outlet />
    </Container>
  );
};
