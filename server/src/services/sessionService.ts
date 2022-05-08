import { nanoid } from 'nanoid';
import { redis } from '~/clients';
import { User } from '~/core/users/user.model';

interface Session {
  user_id: string;
}

const sessionService = {
  async create(user: User) {
    const sessionId = nanoid(24);
    const key = `session:${sessionId}`;
    const multi = redis.multi();

    multi.json.set(key, '$', {
      user_id: user.user_id,
    });

    multi.expire(key, 2_592_000_000); // 30 days

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
