import { mc } from '@/utils/mergeClassnames';
import { forwardRef } from 'react';
import './ProjectCard.scss';
import { Link } from 'react-router-dom';
import { MoreVertical } from 'react-feather';

interface ProjectCardProps {
  name: string;
  description: string;
  color: number;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ name, description, color, ...props }, ref) => {
    return (
      <div
        {...mc(props, 'project-card', `project-card--color-${color}`)}
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
