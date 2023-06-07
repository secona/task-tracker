import { ProjectLoading } from './ProjectLoading';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'ProjectLoading',
  component: ProjectLoading,
} as Meta<typeof ProjectLoading>;

const Template: StoryFn<typeof ProjectLoading> = () => <ProjectLoading />;

export const Default = Template.bind({});
Default.args = {};
