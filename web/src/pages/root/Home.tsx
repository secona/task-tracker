import { useQuery } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { ProjectCard } from '@/components/ProjectCard';
import { projectsListQuery } from './_layout';

import './Home.scss';

export const Home = () => {
  const query = useQuery(projectsListQuery);

  return (
    <div className='home'>
      <Heading fontSize='6xl'>Good Morning!</Heading>
      <div className='home__grid'>
        {query.data?.data.msg === 'SUCCESS' &&
          query.data.data.projects.map(project => (
            <ProjectCard
              name={project.name}
              description={project.description}
              colorCode={project.color}
            />
          ))}
      </div>
    </div>
  );
};
