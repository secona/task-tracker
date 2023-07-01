import { Session as SessionType } from '@/api/auth';

import sessionCN from './Session.module.scss';

function formatDate(date: number) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'long',
    hour12: false,
  }).format(date);
}

export interface SessionProps {
  session: SessionType;
}

export const Session = (props: SessionProps) => {
  const session = props.session.value;

  return (
    <table className={sessionCN.container}>
      <tr>
        <td>IP Address</td>
        <td>{session.ip}</td>
      </tr>
      <tr>
        <td>Client</td>
        <td>{session.client}</td>
      </tr>
      <tr>
        <td>Last Activity</td>
        <td>
          {session.last_activity.loc}
          <br />
          {formatDate(session.last_activity.date)}
        </td>
      </tr>
      <tr>
        <td>Signed In</td>
        <td>
          {session.signed_in.loc}
          <br />
          {formatDate(session.signed_in.date)}
        </td>
      </tr>
    </table>
  );
};
