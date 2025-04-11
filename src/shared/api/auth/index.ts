import { baseAPI } from '@/shared/services';

export class AuthAPI {
  static async signIn(data: { login: string; password: string }) {
    const response = await baseAPI.post<'OK'>('/auth/signin', data, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      console.log("Редирект на страницу авторизации")
      // Отчистка токенов
    }

    return response;
  }

  static signUp(data: { firstName: string; secondName: string; login: string; email: string; password: string; phone: string }) {
    return baseAPI.post('/auth/signup', data, {
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
      {},
      {
        credentials: 'include',
      },
    );

    return response;
  }
}
