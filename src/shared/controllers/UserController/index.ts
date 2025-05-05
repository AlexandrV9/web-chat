import { ReqSearchUser, ReqUpdateAvatar, ReqUpdatePassword, ReqUpdateProfile, UserAPI } from '@/shared/api';
import { store } from '@/shared/services';
import { convertObjKeysToCamelCase } from '@/shared/utils';

export class UserController {
  static async updatePassword(data: ReqUpdatePassword) {
    return UserAPI.updatePassword(data);
  }

  static async updateProfile(data: ReqUpdateProfile) {
    return UserAPI.updateProfile(data).then(res => {
      store.setState({
        user: res.data,
      });

      return res;
    });
  }

  static async searchUserByLogin(data: ReqSearchUser) {
    return UserAPI.searchUser(data).then(res => {
      return {
        ...res,
        data: res.data?.map(item => convertObjKeysToCamelCase(item)),
      };
    });
  }

  static async updateAvatar(data: ReqUpdateAvatar) {
    return UserAPI.updateAvatar(data).then(res => {
      store.setState({
        user: res.data,
      });

      return res;
    });
  }
}
