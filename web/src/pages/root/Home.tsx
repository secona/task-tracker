import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { Content } from './_layout';

import homeCN from './Home.module.scss';

export const Home = () => {
  return (
    <div className={homeCN.home}>
      <Content.Card>
        <Heading fontSize='6xl'>Good Morning!</Heading>
      </Content.Card>
      <QueryState
        Error={({ resetErrorBoundary }) => (
          <button onClick={resetErrorBoundary}>retry</button>
        )}
      >
        <ProjectGrid />
      </QueryState>
    </div>
  );
};

const ProjectGrid = () => {
  const query = useQuery(queries.projects());

  return (
    <Content.Card>
      <div className={homeCN.grid}>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <Content.Project key={project.project_id} project={project} />
          ))}
      </div>
    </Content.Card>
  );
};
