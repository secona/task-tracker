import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { usePrevious } from '@/hooks/usePrevious';
import { QueryState } from '@/components/QueryState';
import { Container } from './_components/Container/Container';
import { Card } from './_components/Card/Card';
import { Greeting } from './_components/Greeting/Greeting';
import { ProjectGrid } from './_components/ProjectGrid/ProjectGrid';
import { Project } from './_components/Project/Project';

export const Home = () => {
  const query = useQuery(queries.projects());
  const previous = usePrevious();

  return (
    <Container>
      <Card>
        <Greeting />
        {/* Temporary */}
        <Link onClick={() => previous.setToHere()} to='new'>
          Add New Project
        </Link>
      </Card>
      <ProjectGrid>
        <QueryState
          query={query}
          loading={<ProjectGrid.Loading />}
          children={query.data?.map(project => (
            <Project key={project.project_id} project={project} />
          ))}
        />
      </ProjectGrid>
      <Outlet />
    </Container>
  );
};
