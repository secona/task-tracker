import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task/Task';
import { TaskGroup } from '@/components/Task/TaskGroup/TaskGroup';
import './Project.scss';

export const Project = () => {
  return (
    <div className='project'>
      <Heading fontSize='6xl'>School</Heading>
      <TaskGroup title='Unfinished'>
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
      </TaskGroup>
      <TaskGroup title='Finished'>
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          done={true}
        />
        <Task
          task='Math Homework'
          description='Page 11 Exercise 2'
          done={true}
        />
      </TaskGroup>
    </div>
  );
};
