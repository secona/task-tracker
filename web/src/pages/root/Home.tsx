import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ProjectCard } from '@/components/ProjectCard';
import { QueryState } from '@/components/QueryState';
import { Section } from '@/components/Section';
import { queries } from '@/queries';

import homeCN from './Home.module.scss';

export const Home = () => {
  return (
    <div className={homeCN.home}>
      <Section>
        <Heading fontSize='6xl'>Good Morning!</Heading>
      </Section>
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
    <Section>
      <div className={homeCN.grid}>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <ProjectCard key={project.project_id} project={project} />
          ))}
      </div>
    </Section>
  );
};
