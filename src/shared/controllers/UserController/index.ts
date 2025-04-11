import { AuthAPI } from '@/shared/api';
import { store } from '@/shared/services';

export class UserController {
  static getAuthUser() {
    AuthAPI.getAuthUser().then(res => {
      store.set('user', res.data);
    });
  }
}
