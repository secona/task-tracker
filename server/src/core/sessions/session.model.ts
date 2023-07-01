import geoip from 'geoip-lite';
import useragent from 'useragent';
import { User } from '../users/user.model';
import { IncomingHttpHeaders } from 'http';

export class Activity {
  date: number;
  loc: string;

  constructor(ip: string) {
    const timeNow = Date.now();
    const lookup = geoip.lookup(ip);

    if (lookup === null) {
      this.date = timeNow;
      this.loc = 'Unknown';
      return;
    }

    const { city, region, country } = lookup;

    this.date = timeNow;
    this.loc = `${city}, ${region}, ${country}`;
  }
}

export class Session {
  user_id: number;
  client: string;
  last_activity: {
    date: number;
    loc: string;
  };
  signed_in: {
    date: number;
    loc: string;
  };

  constructor(user: User, headers: IncomingHttpHeaders, ip: string) {
    const client = useragent.parse(headers['user-agent']).toString();
    const current = new Activity(ip);
    this.user_id = user.user_id;
    this.client = client;
    this.last_activity = current;
    this.signed_in = current;
  }
}
