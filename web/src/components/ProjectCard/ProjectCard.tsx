import { ComponentPropsWithRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'react-feather';
import { IProject } from '@/api/projects';
import { cnProps } from '@/utils/mergeClassnames';

import projectCardCN from './ProjectCard.module.scss';

export interface ProjectCardProps extends ComponentPropsWithRef<'div'> {
  project: IProject;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, ...props }, ref) => {
    return (
      <div
        {...cnProps(
          props,
          projectCardCN.projectCard,
          projectCardCN[`projectCard_color${project.color}`]
        )}
        ref={ref}
      >
        <div>
          <Link to={`/p/${project.project_id}`} className={projectCardCN.name}>
            {project.name}
          </Link>
          <p className={projectCardCN.description}>{project.description}</p>
        </div>
        <div>
          <button className={projectCardCN.moreButton}>
            <MoreVertical color='white' size='1rem' />
          </button>
        </div>
      </div>
    );
  }
);
