import { Heading } from '@/components/Heading';
import { QueryState } from '@/components/QueryState';
import { queries } from '@/queries';
import { useQuery } from '@tanstack/react-query';
import { Session } from './_components/Session/Session';

export const Sessions = () => {
  const query = useQuery(queries.sessions());

  return (
    <>
      <Heading fontSize='5xl'>Sessions</Heading>
      <QueryState query={query} loading='Loading...'>
        {query.data?.map(session => (
          <Session session={session} />
        ))}
      </QueryState>
    </>
  );
};
