import { Knex } from 'knex';
import { User, UserInsert } from '~/api/users/users.schemas';
import { Task, TaskInsert } from '~/api/tasks/tasks.schemas'

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<User, UserInsert>;
    tasks: Knex.CompositeTableType<Task, TaskInsert>;
  }
}
