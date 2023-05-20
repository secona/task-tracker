import { Heading } from '@/components/Heading';
import './Home.scss';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export const Home = () => {
  return (
    <div className='home'>
      <Heading fontSize='6xl'>Good Morning!</Heading>
      <div className='home__grid'>
        <ProjectCard
          name='School'
          description='For school things'
          colorCode={0}
        />
        <ProjectCard
          name='School'
          description='For school things'
          colorCode={0}
        />
        <ProjectCard
          name='School'
          description='For school things'
          colorCode={0}
        />
        <ProjectCard
          name='School'
          description='For school things'
          colorCode={0}
        />
      </div>
    </div>
  );
};
