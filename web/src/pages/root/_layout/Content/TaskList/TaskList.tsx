import { Card, CardProps } from '../Card';
import { TaskListLoading } from './TaskListLoading/TaskListLoading';

import taskListCN from './TaskList.module.scss';

export interface TaskListProps extends CardProps {}

export const TaskList = (props: TaskListProps) => {
  return <Card {...props} className={taskListCN.taskList} />;
};

TaskList.Loading = TaskListLoading;