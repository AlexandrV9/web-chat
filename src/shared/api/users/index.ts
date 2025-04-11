import { baseAPI } from '@/shared/services';
import { User } from '@/types';

export class UsersAPI {
  static updateProfile(data: User) {
    baseAPI.put('https://ya-praktikum.tech/api/v2/user/profile', data);
  }

  static updateAvatar(data: { avatar: string }) {
    baseAPI.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', data);
  }

  static updatePassword(data: { oldPassword: string; newPassword: string }) {
    baseAPI.put('https://ya-praktikum.tech/api/v2/user/password', data);
  }
}
