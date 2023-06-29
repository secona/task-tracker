import { Link, useParams } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { QueryState } from '@/components/QueryState';
import { IProject } from '@/api/projects';
import { cn } from '@/utils/mergeClassnames';
import { Card } from '../Card';

import projectDetailsCN from './ProjectDetails.module.scss';

export interface ProjectDetailsProps {
  projectsQuery: UseQueryResult<IProject[]>;
}

export const ProjectDetails = ({ projectsQuery }: ProjectDetailsProps) => {
  const params = useParams();
  const project = projectsQuery.data?.find(
    p => p.project_id === params.projectId
  );

  return (
    <QueryState query={projectsQuery} loading='Loading...'>
      <Card
        className={cn(
          projectDetailsCN.card,
          project?.color ? projectDetailsCN[`card_color${project?.color}`] : ''
        )}
      >
        <Heading className={projectDetailsCN.name} fontSize='6xl'>
          {project?.name}
        </Heading>
        <p className={projectDetailsCN.description}>{project?.description}</p>
        {/* Temporary */} <Link to='edit'>Edit Project</Link>
        {/* Temporary */} <Link to='new'>Add New Task</Link>
      </Card>
    </QueryState>
  );
};
