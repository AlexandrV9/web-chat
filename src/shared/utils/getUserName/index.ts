import { User } from '@/types';

export const getUserName = (user: User) => {
  if (user?.displayName) {
    return user.displayName;
  }

  return user?.firstName + ' ' + user?.secondName;
};
