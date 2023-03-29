import { nanoid } from 'nanoid';
import { IncomingHttpHeaders } from 'http';
import useragent from 'useragent';
import geoip from 'geoip-lite';
import { redis } from '~/clients';
import { User } from '~/core/users/user.model';

const SESSION_EXPIRE = 2_592_000_000; // 30 days

function getCurrentTimeAndPlace(ip: string) {
  const timeNow = Date.now();
  const lookup = geoip.lookup(ip);

  if (lookup === null) {
    return {
      date: timeNow,
      loc: 'Unknown',
    }
  }

  const { city, region, country } = lookup;

  return {
    date: timeNow,
    loc: `${city}, ${region}, ${country}`,
  };
}

export type Session = {
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
}

const sessionService = {
  async create(user: User, headers: IncomingHttpHeaders, ip: string) {
    const sessionId = nanoid(24);
    const sessionKey = `session:${sessionId}`;
    const multi = redis.multi();
    
    const ua = useragent.parse(headers['user-agent']);
    const current = getCurrentTimeAndPlace(ip);
    const value: Session = {
      user_id: user.user_id,
      client: ua.toString(),
      last_activity: current,
      signed_in: current,
    };

    multi.json.set(sessionKey, '$', value);
    multi.expire(sessionKey, SESSION_EXPIRE);

    await multi.exec();

    return sessionId;
  },

  async update(sessionId: string, ip: string, data: Partial<Session> = {}) {
    data.last_activity = getCurrentTimeAndPlace(ip);

    const multi = redis.multi();
    const sessionKey = `session:${sessionId}`;
    Object.entries(data).forEach(([key, val]) => {
      multi.json.set(sessionKey, key, val);
    });
  
    return multi.exec();
  },

  async get(sessionId: string, ip?: string) {
    const session = await redis.json.get(`session:${sessionId}`);
    if (ip) await this.update(sessionId, ip);
    return session as Session | null;
  },

  async getAll(user_id: number) {
    const result = await redis.ft.search(
      'idx:session',
      `@user_id:[${user_id} ${user_id}]`
    );
    return result;
  },

  async delAll(user_id: number) {
    const all = await this.getAll(user_id);
    const multi = redis.multi();

    all.documents.forEach(({ id }) => {
      multi.json.del(id);
    });

    return multi.exec();
  },

  async del(sessionId: string) {
    const deleted = await redis.json.del(`session:${sessionId}`);
    return deleted > 0;
  }
};

export default sessionService;
