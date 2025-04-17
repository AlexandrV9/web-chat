import { baseAPI } from '@/shared/services';

export class ChatsAPI {
  static getAll(data?: { offset: number; limit: number; title: string }) {
    return baseAPI.get('/chats', { credentials: 'include', params: data });
  }

  static createChat(data?: { title: string }) {
    return baseAPI.post('/chats', data, { credentials: 'include' });
  }

  static getToken(chatId: number) {
    return baseAPI.post<{
      token: string;
    }>(`/chats/token/${chatId}`, {}, { credentials: 'include' });
  }

  // static async signIn(data: { login: string; password: string }) {
  //   const response = await baseAPI.post<'OK'>('/auth/signin', data, {
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.status === 401) {
  //     // Отчистка токенов
  //   }

  //   return response;
  // }
}
