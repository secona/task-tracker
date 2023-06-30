import { Card, CardProps } from '../Card/Card';
import { Project } from '../Project/Project';

import projectGridCN from './ProjectGrid.module.scss';

export interface ProjectGridProps extends CardProps {}

export const ProjectGrid = (props: ProjectGridProps) => {
  return <Card {...props} className={projectGridCN.grid} />;
};

ProjectGrid.Loading = () => (
  <>
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
    <Project.Loading />
  </>
);
