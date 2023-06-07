import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Content } from './_layout';

export const Inbox = () => {
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks()],
  });

  return (
    <Content.Container>
      <Content.Card>
        <Content.Greeting />
      </Content.Card>
      <Content.SortedTaskList
        projectsQuery={projectsQuery}
        tasksQuery={tasksQuery}
        colors
      />
    </Content.Container>
  );
};
