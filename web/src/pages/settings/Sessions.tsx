import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { Session } from './_components/Session/Session';
import { Setting } from './_components/Setting/Setting';

export const Sessions = () => {
  const query = useQuery(queries.sessions());

  return (
    <Setting>
      <Setting.Main>
        <Setting.Title>Sessions</Setting.Title>
        <QueryState query={query} loading='Loading...'>
          {query.data?.map(session => (
            <Session session={session} />
          ))}
        </QueryState>
      </Setting.Main>
    </Setting>
  );
};
