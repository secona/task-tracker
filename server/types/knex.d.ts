import { Knex } from 'knex';
import { User, UserInsert } from '~/api/users/users.common';
import { Task, TaskInsert } from '~/api/tasks/tasks.common';

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<User, UserInsert>;
    // tasks: Knex.CompositeTableType<Task, TaskInsert>;

    /* TEMPORARY */
    tasks: {
      task_id: string;
      project_id: string;
      task: string;
      description: string;
      done: boolean;
    },
    projects: {
      project_id: string;
      user_id: number;
      description: string;
      display_color: string;
    }
  }
}
