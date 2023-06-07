import { TaskLoading } from './TaskLoading';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'TaskLoading',
  component: TaskLoading,
} as Meta<typeof TaskLoading>;

const Template: StoryFn<typeof TaskLoading> = () => <TaskLoading />;

export const Default = Template.bind({});
Default.args = {};
