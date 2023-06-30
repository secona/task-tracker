import { Card, CardProps } from '../Card/Card';
import { Task } from '../Task/Task';

import taskListCN from './TaskList.module.scss';

export interface TaskListProps extends CardProps {}

export const TaskList = (props: TaskListProps) => {
  return <Card {...props} className={taskListCN.taskList} />;
};

TaskList.Loading = () => (
  <TaskList>
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
    <Task.Loading />
  </TaskList>
);
