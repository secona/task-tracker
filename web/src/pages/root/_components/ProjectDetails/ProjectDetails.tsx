import { Link, useParams } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { QueryState } from '@/components/QueryState';
import { IProject } from '@/api/projects';
import { cn } from '@/utils/mergeClassnames';
import { Card } from '../Card/Card';

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
    <QueryState query={projectsQuery} loading={<ProjectDetails.Loading />}>
      <Card
        className={cn(
          projectDetailsCN.card,
          project?.color !== undefined
            ? projectDetailsCN[`card_color${project?.color}`]
            : ''
        )}
      >
        <Heading className={projectDetailsCN.name} fontSize='6xl'>
          {project?.name}
        </Heading>
        <p className={projectDetailsCN.description}>{project?.description}</p>
      </Card>
    </QueryState>
  );
};

ProjectDetails.Loading = () => (
  <Card className={projectDetailsCN.loading}>
    <span className={projectDetailsCN.loadingName} />
    <span className={projectDetailsCN.loadingDescription} />
  </Card>
);
