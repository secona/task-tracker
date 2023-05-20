import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task/Task';
import { TaskGroup } from '@/components/Task/TaskGroup/TaskGroup';
import './Project.scss';

export const Inbox = () => {
  return (
    <div className='project'>
      <Heading fontSize='6xl'>School</Heading>
      <TaskGroup title='Unfinished'>
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
        />
      </TaskGroup>
      <TaskGroup title='Finished'>
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          colorCode={0}
          done={true}
        />
      </TaskGroup>
    </div>
  );
};
