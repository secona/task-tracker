import { Edit3, Plus } from 'react-feather';
import { Outlet, useParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { Button } from '@/components/Button';
import { usePrevious } from '@/hooks/usePrevious';
import { queries } from '@/queries';
import { Container } from './_components/Container/Container';
import { ProjectDetails } from './_components/ProjectDetails/ProjectDetails';
import { SortedTaskList } from './_components/SortedTaskList/SortedTaskList';
import { HeaderLinks } from './_components/HeaderLinks/HeaderLinks';

export const Project = () => {
  const { projectId } = useParams();
  const previous = usePrevious();
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks(projectId)],
  });

  return (
    <Container>
      <ProjectDetails projectsQuery={projectsQuery} />
      <HeaderLinks>
        <Button.Link
          size='sm'
          onClick={() => previous.setToHere()}
          to='new'
          LeftIcon={Plus}
        >
          New Task
        </Button.Link>
        <Button.Link
          size='sm'
          variant='secondary'
          onClick={() => previous.setToHere()}
          to='edit'
          LeftIcon={Edit3}
        >
          Edit Project
        </Button.Link>
      </HeaderLinks>
      <SortedTaskList projectsQuery={projectsQuery} tasksQuery={tasksQuery} />
      <Outlet />
    </Container>
  );
};
