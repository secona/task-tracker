import { Project } from '@/api/projects';
import { ProjectCard } from './ProjectCard';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'ProjectCard',
  component: ProjectCard,
} as Meta<typeof ProjectCard>;

const Template: StoryFn<typeof ProjectCard> = args => <ProjectCard {...args} />;

const fakeProject: Project = {
  project_id: 'x',
  name: 'School',
  description: 'School things',
  color: 0,
  created_at: new Date(),
  updated_at: new Date(),
};

export const Default = Template.bind({});
Default.args = {
  project: fakeProject,
};
