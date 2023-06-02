import { useQuery } from '@tanstack/react-query';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Home = () => {
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
        <ProjectGrid />
      </QueryState>
    </Content.Container>
  );
};

const ProjectGrid = () => {
  const query = useQuery(queries.projects());

  return (
    <Content.ProjectGrid>
      {query.data?.data.msg === 'SUCCESS' &&
        query.data.data.projects.map(project => (
          <Content.Project key={project.project_id} project={project} />
        ))}
    </Content.ProjectGrid>
  );
};
