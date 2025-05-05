import { ReqAuthSignIn, ReqAuthSignUp } from '@/shared/controllers';
import { baseAPI } from '@/shared/services';

export class AuthAPI {
  static async signIn(data: ReqAuthSignIn) {
    const response = await baseAPI.post<'OK'>('/auth/signin', JSON.stringify(data), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      console.log('Редирект на страницу авторизации');
      // Отчистка токенов
    }

    if (!response.ok) {
      return Promise.reject(response);
    }

    return response;
  }

  static signUp(data: ReqAuthSignUp) {
    return baseAPI.post('/auth/signup', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async getAuthUser() {
    return baseAPI.get('/auth/user', { credentials: 'include' });
  }

  static async signOut() {
    const response = await baseAPI.post(
      '/auth/logout',
      JSON.stringify({}),
      {
        credentials: 'include',
      },
    );

    return response;
  }
}
