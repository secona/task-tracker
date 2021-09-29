import { Knex } from 'knex';
import { User, UserInsert } from '~/api/users/users.common';
import { Task, TaskInsert } from '~/api/tasks/tasks.common';

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<User, UserInsert>;
    tasks: Knex.CompositeTableType<Task, TaskInsert>;
  }
}
