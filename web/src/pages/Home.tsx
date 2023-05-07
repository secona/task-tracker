import { Heading } from '@/components/Heading';
import './Home.scss';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';

export const Home = () => {
  return (
    <>
      <Heading fontSize='6xl'>Good Morning!</Heading>
      <div className='home'>
        <ProjectCard name='School' description='For school things' color={0} />
        <ProjectCard name='School' description='For school things' color={0} />
        <ProjectCard name='School' description='For school things' color={0} />
        <ProjectCard name='School' description='For school things' color={0} />
      </div>
    </>
  );
};
