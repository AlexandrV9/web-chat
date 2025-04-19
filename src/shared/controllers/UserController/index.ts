import { ReqUpdateAvatar, ReqUpdatePassword, ReqUpdateProfile, UserAPI } from '@/shared/api';
import { store } from '@/shared/services';

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

  static async updateAvatar(data: ReqUpdateAvatar) {
    return UserAPI.updateAvatar(data).then(res => {
      store.setState({
        user: res.data,
      });

      return res;
    });
  }
}
