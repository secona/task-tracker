import { ProjectCard } from './ProjectCard';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'ProjectCard',
  component: ProjectCard,
} as Meta<typeof ProjectCard>;

const Template: StoryFn<typeof ProjectCard> = args => <ProjectCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'School',
  description: 'For school things',
  colorCode: 0,
};
