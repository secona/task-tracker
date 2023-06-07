import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'react-feather';
import { IProject } from '@/api/projects';
import { cnProps } from '@/utils/mergeClassnames';
import { ProjectLoading } from './ProjectLoading';

import projectCN from './Project.module.scss';

export interface ProjectProps extends ComponentPropsWithRef<'div'> {
  project: IProject;
}

export const Project = forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, ...props }, ref) => {
    return (
      <div
        {...cnProps(
          props,
          projectCN.project,
          projectCN[`project_color${project.color}`]
        )}
        ref={ref}
      >
        <div>
          <Link to={`/p/${project.project_id}`} className={projectCN.name}>
            {project.name}
          </Link>
          <p className={projectCN.description}>{project.description}</p>
        </div>
        <div>
          <button className={projectCN.moreButton}>
            <MoreVertical color='white' size='1rem' />
          </button>
        </div>
      </div>
    );
  }
) as React.ForwardRefExoticComponent<
  ProjectProps & React.RefAttributes<HTMLDivElement>
> & {
  Loading: React.FC;
};

Project.Loading = ProjectLoading;
