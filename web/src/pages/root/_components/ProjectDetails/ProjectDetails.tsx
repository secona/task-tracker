import { Link, useParams } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Heading } from '@/components/Heading';
import { QueryState } from '@/components/QueryState';
import { IProject } from '@/api/projects';
import { cn } from '@/utils/mergeClassnames';
import { Card } from '../Card/Card';

import projectDetailsCN from './ProjectDetails.module.scss';
import { usePrevious } from '@/hooks/usePrevious';
import { HeaderLinks } from '../HeaderLinks/HeaderLinks';
import { Button } from '@/components/Button';
import { Edit3, Plus } from 'react-feather';

export interface ProjectDetailsProps {
  projectsQuery: UseQueryResult<IProject[]>;
}

export const ProjectDetails = ({ projectsQuery }: ProjectDetailsProps) => {
  const params = useParams();
  const previous = usePrevious();
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
        <HeaderLinks>
          <Button.Link
            size='sm'
            onClick={() => previous.setToHere()}
            to='new'
            LeftIcon={Plus}
          >
            New Task
          </Button.Link>
          <Button.Link
            size='sm'
            variant='secondary'
            onClick={() => previous.setToHere()}
            to='edit'
            LeftIcon={Edit3}
          >
            Edit Project
          </Button.Link>
        </HeaderLinks>
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
