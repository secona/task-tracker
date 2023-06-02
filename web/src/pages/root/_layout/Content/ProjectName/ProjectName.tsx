import { Heading, HeadingProps } from '@/components/Heading';

import projectNameCN from './ProjectName.module.scss';

export interface ProjectNameProps extends HeadingProps {}

export const ProjectName = (props: ProjectNameProps) => {
  return (
    <Heading {...props} fontSize='6xl' className={projectNameCN.projectName} />
  );
};
