import { Heading } from '@/components/Heading';
import { Card } from '../Card';
import { Link } from 'react-router-dom';
import { IProject } from '@/api/projects';

import projectDetailsCN from './ProjectDetails.module.scss';

export interface ProjectDetailsProps {
  project: IProject;
}

export const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <Card className={projectDetailsCN.card}>
      <Heading className={projectDetailsCN.name} fontSize='6xl'>
        {project.name}
      </Heading>
      <p className={projectDetailsCN.description}>{project.description}</p>
      {/* Temporary */} <Link to='edit'>Edit Project</Link>
      {/* Temporary */} <Link to='new'>Add New Task</Link>
    </Card>
  );
};
