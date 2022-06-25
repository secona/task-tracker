import { nanoid } from 'nanoid';
import { IncomingHttpHeaders } from 'http';
import useragent from 'useragent';
import geoip from 'geoip-lite';
import { redis } from '~/clients';
import { User } from '~/core/users/user.model';

const SESSION_EXPIRE = 2_592_000_000; // 30 days

function getCurrentTimeAndPlace(ip: string) {
  const { city, region, country } = geoip.lookup(ip) || {};

  return {
    date: Date.now(),
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
    }

    multi.sAdd(`user:${user.user_id}`, sessionId);
    multi.json.set(sessionKey, '$', value);
    multi.expire(sessionKey, SESSION_EXPIRE);

    await multi.exec();

    return sessionId;
  },

  async get(sessionId: string) {
    const session = await redis.json.get(`session:${sessionId}`);
    return session as Session | null;
  },

  async del(sessionId: string) {
    const deleted = await redis.json.del(`session:${sessionId}`);
    return deleted > 0;
  }
};

export default sessionService;
