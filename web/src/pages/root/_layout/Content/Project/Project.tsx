import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreVertical, Trash2 } from 'react-feather';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu } from '@/components/Menu';
import { IProject, projectsAPI } from '@/api/projects';
import { cnProps } from '@/utils/mergeClassnames';
import { ProjectLoading } from './ProjectLoading';

import projectCN from './Project.module.scss';

export interface ProjectProps extends ComponentPropsWithRef<'div'> {
  project: IProject;
}

export const Project = forwardRef<HTMLDivElement, ProjectProps>(
  ({ project, ...props }, ref) => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
      mutationKey: ['delete', 'project'],
      mutationFn: async () => {
        projectsAPI.del({ context: { projectId: project.project_id } });
      },
      onMutate: async () => {
        await queryClient.cancelQueries(['projects', 'all']);
      },
      onSuccess: () => {
        queryClient.setQueryData<IProject[]>(['projects', 'all'], projects => {
          const newProjects = [...projects!];
          const i = newProjects?.findIndex(
            v => v.project_id === project.project_id
          );
          newProjects?.splice(i!, 1);
          return newProjects;
        });
      },
      onSettled: async () => {
        await queryClient.invalidateQueries(['projects', 'all']);
      },
    });

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
          <Menu
            activator={
              <button className={projectCN.moreButton}>
                <MoreVertical color='white' size='1rem' />
              </button>
            }
          >
            <Menu.Item
              LeftIcon={Trash2}
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isLoading}
            >
              Delete
            </Menu.Item>
          </Menu>
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
