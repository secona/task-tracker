import { ComponentPropsWithRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'react-feather';
import { cnProps } from '@/utils/mergeClassnames';

import projectCardCN from './ProjectCard.module.scss';

export interface ProjectCardProps extends ComponentPropsWithRef<'div'> {
  projectId: string;
  name: string;
  description: string;
  colorCode: number;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ projectId, name, description, colorCode, ...props }, ref) => {
    return (
      <div
        {...cnProps(
          props,
          projectCardCN.projectCard,
          projectCardCN[`projectCard_color${colorCode}`]
        )}
        ref={ref}
      >
        <div>
          <Link to={`/p/${projectId}`} className={projectCardCN.name}>
            {name}
          </Link>
          <p className={projectCardCN.description}>{description}</p>
        </div>
        <div>
          <button className={projectCardCN.moreButton}>
            <MoreVertical color='white' size={16} />
          </button>
        </div>
      </div>
    );
  }
);
