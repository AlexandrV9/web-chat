import { AuthAPI } from '@/shared/api';
import { APP_ROUTES } from '@/shared/constants';
import { router, store } from '@/shared/services';

export interface ReqAuthSignIn {
  login: string;
  password: string;
}

export interface ReqAuthSignUp {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export class AuthController {
  static async signIn(user: ReqAuthSignIn) {
    return AuthAPI.signIn(user).then(() => {
      router.goByPathname(APP_ROUTES.CONVERSATIONS);
    });
  }

  static async signUp(user: ReqAuthSignUp) {
    return AuthAPI.signUp(user).then(() => {
      router.goByPathname(APP_ROUTES.SIGN_IN);
    });
  }

  static async signOut() {
    return AuthAPI.signOut().then((res) => {
      router.goByPathname(APP_ROUTES.SIGN_IN);
    });
  }

  static async checkAuth() {
    return AuthAPI.getAuthUser()
      .then(res => {
        store.setState({
          user: res.data,
        });
      })
      .catch(error => {
        router.goByPathname(APP_ROUTES.SIGN_IN);
      });
  }
}
