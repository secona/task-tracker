import { nanoid } from 'nanoid';
import { Activity, Session } from './session.model';
import { redis } from '~/clients';

const SESSION_EXPIRE = 2_592_000_000; // 30 days

export const sessionRepository = {
  async save(session: Session) {
    const sessionId = nanoid(24);
    const sessionKey = `session:${sessionId}`;
    const multi = redis.multi();

    multi.json.set(sessionKey, '$', { ...session });
    multi.expire(sessionKey, SESSION_EXPIRE);

    await multi.exec();

    return sessionId;
  },

  async update(sessionId: string, ip: string, data: Partial<Session> = {}) {
    data.last_activity = new Activity(ip);

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
  },
};
