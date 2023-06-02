import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ProjectCard } from '@/components/ProjectCard';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { ContentCard } from './_layout';

import homeCN from './Home.module.scss';

export const Home = () => {
  return (
    <div className={homeCN.home}>
      <ContentCard>
        <Heading fontSize='6xl'>Good Morning!</Heading>
      </ContentCard>
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
    <ContentCard>
      <div className={homeCN.grid}>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
      </div>
    </ContentCard>
  );
};
