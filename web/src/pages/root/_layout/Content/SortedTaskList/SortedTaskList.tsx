import { AxiosResponse } from 'axios';
import { ProjectsGetManyResponse } from '@/api/projects';
import { TasksGetManyResponse } from '@/api/tasks';
import { UseQueryResult } from '@tanstack/react-query';
import { Task } from '../Task';
import { TaskList } from '../TaskList';

export interface SortedTaskListProps {
  projectsQuery: UseQueryResult<AxiosResponse<ProjectsGetManyResponse>>;
  tasksQuery: UseQueryResult<AxiosResponse<TasksGetManyResponse>>;
  colors?: boolean;
}

export interface Tasks {
  unfinished: React.ReactNode[];
  finished: React.ReactNode[];
}

export const SortedTaskList = ({
  projectsQuery,
  tasksQuery,
  colors,
}: SortedTaskListProps) => {
  const tasks: Tasks = (() => {
    const result: Tasks = {
      unfinished: [],
      finished: [],
    };

    if (projectsQuery.data && tasksQuery.data) {
      tasksQuery.data.data.tasks.forEach(task => {
        const component = (
          <Task
            key={task.task_id}
            task={task}
            project={
              colors
                ? projectsQuery.data.data.projects.find(
                    project => project.project_id === task.project_id
                  )
                : undefined
            }
          />
        );

        if (task.done) result.finished.push(component);
        else result.unfinished.push(component);
      });
    }

    return result;
  })();

  return (
    <>
      <TaskList title='Unfinished' children={tasks.unfinished} />
      <TaskList title='Finished' children={tasks.finished} />
    </>
  );
};
