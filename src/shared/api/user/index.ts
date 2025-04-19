import { baseAPI } from '@/shared/services';
import { convertObjKeysToSnakeCase } from '@/shared/utils';
import { User } from '@/types';

export type ReqUpdateProfile = User;

export interface ReqUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export type ReqUpdateAvatar = FormData;

export class UserAPI {
  static async updateProfile(data: ReqUpdateProfile) {
    return baseAPI.put<User>('/user/profile', JSON.stringify(convertObjKeysToSnakeCase(data)), { credentials: 'include' });
  }

  static async updateAvatar(data: ReqUpdateAvatar) {
    return baseAPI.put('/user/profile/avatar', data, {
      credentials: 'include',
      mode: 'cors',
      headers: {},
    });
  }

  static async updatePassword(data: ReqUpdatePassword) {
    return baseAPI.put('/user/password', JSON.stringify(convertObjKeysToSnakeCase(data)), { credentials: 'include' });
  }
}
