import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ProjectCard } from '@/components/ProjectCard';
import { QueryState } from '@/components/QueryState';
import { Section } from '@/components/Section';
import { queries } from '@/queries';

import './Home.scss';

export const Home = () => {
  return (
    <div className='home'>
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
      <div className='home__grid'>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <ProjectCard
              key={project.project_id}
              projectId={project.project_id}
              name={project.name}
              description={project.description}
              colorCode={project.color}
            />
          ))}
      </div>
    </Section>
  );
};
