import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';

import './Project.scss';
import { useQueries } from '@tanstack/react-query';
import { separateTasks } from '@/utils/separateTasks';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';

export const Inbox = () => {
  return (
    <div className='project'>
      <Heading fontSize='6xl'>Good Morning!</Heading>
      <QueryState
        Error={({ resetErrorBoundary }) => (
          <button onClick={resetErrorBoundary}>retry</button>
        )}
      >
        <TasksList />
      </QueryState>
    </div>
  );
};

const TasksList = () => {
  const [projectsQ, tasksQ] = useQueries({
    queries: [queries.projects(), queries.tasks()],
  });

  // @ts-ignore
  const tasks = separateTasks(tasksQ.data?.data.tasks);

  return (
    <>
      <TaskGroup title='Unfinished'>
        {(() => {
          if (projectsQ.data?.data.msg === 'SUCCESS') {
            const projects = projectsQ.data.data.projects;
            return tasks.unfinished.map(task => (
              <Task
                key={task.task_id}
                task={task.task}
                description={task.description}
                colorCode={
                  projects.find(
                    project => project.project_id === task.project_id
                  )?.color || 0
                }
              />
            ));
          }
        })()}
      </TaskGroup>
      <TaskGroup title='Finished'>
        {(() => {
          if (projectsQ.data?.data.msg === 'SUCCESS') {
            const projects = projectsQ.data.data.projects;
            return tasks.finished.map(task => (
              <Task
                key={task.task_id}
                task={task.task}
                description={task.description}
                colorCode={
                  projects.find(
                    project => project.project_id === task.project_id
                  )?.color || 0
                }
              />
            ));
          }
        })()}
      </TaskGroup>
    </>
  );
};
