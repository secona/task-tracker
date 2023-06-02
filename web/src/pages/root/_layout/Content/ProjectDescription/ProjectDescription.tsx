import React from 'react';

import projectDescriptionCN from './ProjectDescription.module.scss';

export interface ProjectDescriptionProps
  extends React.ComponentPropsWithoutRef<'p'> {}

export const ProjectDescription = (props: ProjectDescriptionProps) => {
  return <p {...props} className={projectDescriptionCN.projectDescription} />;
};
