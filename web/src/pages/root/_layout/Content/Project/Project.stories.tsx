import { IProject } from '@/api/projects';
import { Project } from './Project';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'ProjectCard',
  component: Project,
} as Meta<typeof Project>;

const Template: StoryFn<typeof Project> = args => <Project {...args} />;

const fakeProject: IProject = {
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
