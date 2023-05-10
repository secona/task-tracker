import { Task } from './Task';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Task',
  component: Task,
} as Meta<typeof Task>;

const Template: StoryFn<typeof Task> = args => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: 'Math Homework',
  description: 'Page 11 Exercise 2',
  colorCode: undefined,
  done: false,
};

export const Inbox = Template.bind({});
Inbox.args = {
  task: 'Math Homework',
  description: 'Page 11 Exercise 2',
  colorCode: 0,
};
