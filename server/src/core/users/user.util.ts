import { User, UserResponse } from './user.model';

export const userUtil = {
  omitSensitive(user: undefined | User | User[]) {
    if (!user) return;
    if (Array.isArray(user))
      return user.map(u => new UserResponse(u));
    return new UserResponse(user);
  }
}