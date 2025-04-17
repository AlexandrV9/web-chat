import { ReqUpdatePassword, UserAPI } from '@/shared/api';

export class UserController {
  static async updatePassword(data: ReqUpdatePassword) {
    return UserAPI.updatePassword(data);
  }
}
