import { useQuery } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Home = () => {
  const query = useQuery(queries.projects());

  return (
    <Content.Container>
      <Content.Card>
        <Content.ProjectName>Good Morning!</Content.ProjectName>
      </Content.Card>
      <Content.ProjectGrid>
        {query.data?.data.projects.map(project => (
          <Content.Project key={project.project_id} project={project} />
        ))}
      </Content.ProjectGrid>
    </Content.Container>
  );
};
