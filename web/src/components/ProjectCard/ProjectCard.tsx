import { mc } from '@/utils/mergeClassnames';
import { ComponentPropsWithRef, forwardRef } from 'react';
import './ProjectCard.scss';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'react-feather';

export interface ProjectCardProps extends ComponentPropsWithRef<'div'> {
  name: string;
  description: string;
  colorCode: number;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ name, description, colorCode, ...props }, ref) => {
    return (
      <div
        {...mc(props, 'project-card', `project-card--color-${colorCode}`)}
        ref={ref}
      >
        <div>
          <Link to={'/'} className='project-card__name'>
            {name}
          </Link>
          <p className='project-card__description'>{description}</p>
        </div>
        <div>
          <button className='project-card__more'>
            <MoreVertical color='white' size={16} />
          </button>
        </div>
      </div>
    );
  }
);
