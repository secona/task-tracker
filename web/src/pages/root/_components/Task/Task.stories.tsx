import { IProject } from '@/api/projects';
import { Task } from './Task';
import { Meta, StoryFn } from '@storybook/react';
import { ITask } from '@/api/tasks';

export default {
  title: 'Task',
  component: Task,
} as Meta<typeof Task>;

const Template: StoryFn<typeof Task> = args => <Task {...args} />;

const fakeTask: ITask = {
  project_id: 'x',
  task_id: 'x',
  task: 'Math Homework',
  description: 'Page 11 Exercise 2',
  done: false,
  created_at: new Date(),
  updated_at: new Date(),
};

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
  task: fakeTask,
};

export const Inbox = Template.bind({});
Inbox.args = {
  task: fakeTask,
  project: fakeProject,
};

export const Loading: StoryFn<typeof Task.Loading> = () => <Task.Loading />;
