import { useQueries } from '@tanstack/react-query';
import { queries } from '@/queries';
import { Container } from './_components/Container/Container';
import { Card } from './_components/Card/Card';
import { Greeting } from './_components/Greeting/Greeting';
import { SortedTaskList } from './_components/SortedTaskList/SortedTaskList';

export const Inbox = () => {
  const [projectsQuery, tasksQuery] = useQueries({
    queries: [queries.projects(), queries.tasks()],
  });

  return (
    <Container>
      <Card>
        <Greeting />
      </Card>
      <SortedTaskList
        projectsQuery={projectsQuery}
        tasksQuery={tasksQuery}
        colors
      />
    </Container>
  );
};
