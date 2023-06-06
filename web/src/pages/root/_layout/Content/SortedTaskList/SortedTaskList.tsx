import { UseQueryResult } from '@tanstack/react-query';
import { ProjectsQuery, TasksQuery } from '@/queries';
import { Task } from '../Task';
import { TaskList } from '../TaskList';

export interface SortedTaskListProps {
  projectsQuery: UseQueryResult<ProjectsQuery>;
  tasksQuery: UseQueryResult<TasksQuery>;
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
      tasksQuery.data.forEach(task => {
        const component = (
          <Task
            key={task.task_id}
            task={task}
            project={
              colors
                ? projectsQuery.data.find(
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
