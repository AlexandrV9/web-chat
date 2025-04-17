import { baseAPI } from '@/shared/services';
import { User } from '@/types';

export interface ReqUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export class UserAPI {
  static async updateProfile(data: User) {
    return baseAPI.put('/user/profile', data);
  }

  static async updateAvatar(data: { avatar: string }) {
    return baseAPI.put('/user/profile/avatar', data);
  }

  static async updatePassword(data: ReqUpdatePassword) {
    return baseAPI.put('/user/password', data, { credentials: 'include' });
  }
}
