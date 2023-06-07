import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';
import { QueryState } from '@/components/QueryState';

export const Home = () => {
  const query = useQuery(queries.projects());

  return (
    <Content.Container>
      <Content.Card>
        <Content.ProjectName>Good Morning!</Content.ProjectName>
      </Content.Card>
      <Content.ProjectGrid>
        <QueryState
          query={query}
          loading={<Content.ProjectGrid.Loading />}
          children={query.data?.map(project => (
            <Content.Project key={project.project_id} project={project} />
          ))}
        />
      </Content.ProjectGrid>
    </Content.Container>
  );
};
