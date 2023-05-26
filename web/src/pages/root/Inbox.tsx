import { Heading } from '@/components/Heading';
import { Task, TaskGroup } from '@/components/Task';

import './Project.scss';
import { useQueries } from '@tanstack/react-query';
import { projectsListQuery } from './_layout';
import { tasksQuery } from './Project';
import { separateTasks } from '@/utils/separateTasks';

export const Inbox = () => {
  const [projectsQ, tasksQ] = useQueries({
    queries: [projectsListQuery, tasksQuery()],
  });

  // @ts-ignore
  const tasks = separateTasks(tasksQ.data?.data.tasks);

  return (
    <div className='project'>
      <Heading fontSize='6xl'>Good Morning!</Heading>
      <TaskGroup title='Unfinished'>
        {(() => {
          if (projectsQ.data?.data.msg === 'SUCCESS') {
            const projects = projectsQ.data.data.projects;
            return tasks.unfinished.map(task => (
              <Task
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
    </div>
  );
};
