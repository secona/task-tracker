import { Link, Outlet } from 'react-router-dom';
import { Plus } from 'react-feather';
import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { usePrevious } from '@/hooks/usePrevious';
import { QueryState } from '@/components/QueryState';
import { Button } from '@/components/Button';
import { Container } from './_components/Container/Container';
import { Card } from './_components/Card/Card';
import { Greeting } from './_components/Greeting/Greeting';
import { ProjectGrid } from './_components/ProjectGrid/ProjectGrid';
import { Project } from './_components/Project/Project';
import { HeaderLinks } from './_components/HeaderLinks/HeaderLinks';

export const Home = () => {
  const query = useQuery(queries.projects());
  const previous = usePrevious();

  return (
    <Container>
      <Card>
        <Greeting />
        <HeaderLinks>
          <Button.Link
            size='sm'
            onClick={() => previous.setToHere()}
            to='new'
            LeftIcon={Plus}
          >
            New Project
          </Button.Link>
        </HeaderLinks>
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
