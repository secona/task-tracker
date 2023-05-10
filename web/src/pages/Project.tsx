import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task/Task';
import './Project.scss';

export const Project = () => {
  return (
    <>
      <Heading fontSize='6xl'>School</Heading>
      <div className='project__task-group'>
        <p className='project__task-group__title'>Unfinished</p>
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
        <Task task='Math Homework' description='Page 11 Exercise 2' />
      </div>
      <div className='project__task-group'>
        <p className='project__task-group__title'>Finished</p>
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
      </div>
    </>
  );
};
