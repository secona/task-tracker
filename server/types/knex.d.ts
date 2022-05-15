import { Knex } from 'knex';
import { User, UserInsert, UserUpdate } from '~/core/users/user.model';
import { Task, TaskInsert, TaskUpdate } from '~/core/tasks/task.model';
import { Project, ProjectInsert, ProjectUpdate } from '~/core/projects/project.model'

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<User, UserInsert, UserUpdate>;
    tasks: Knex.CompositeTableType<Task, TaskInsert & { task_id: string }, TaskUpdate>;
    projects: Knex.CompositeTableType<Project, ProjectInsert & { project_id: string }, ProjectUpdate>;
  }
}
