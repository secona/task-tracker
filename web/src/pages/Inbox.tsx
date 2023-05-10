import { Heading } from '@/components/Heading';
import { Task } from '@/components/Task/Task';

export const Inbox = () => {
  return (
    <>
      <Heading fontSize='6xl'>Good Morning</Heading>
      <div className='project__task-group'>
        <p className='project__task-group__title'>Unfinished</p>
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
      </div>
      <div className='project__task-group'>
        <p className='project__task-group__title'>Finished</p>
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
      </div>
    </>
  );
};
