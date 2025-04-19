import { baseAPI } from '@/shared/services';
import { convertObjKeysToSnakeCase } from '@/shared/utils';

export interface ReqCreateChat {
  title: string;
}

export interface ReqGetAllChats {
  offset: number;
  limit: number;
  title: string;
}

export class ChatsAPI {
  static getAll(data?: ReqGetAllChats) {
    return baseAPI.get('/chats', { credentials: 'include', params: data });
  }

  static createChat(data: ReqCreateChat) {
    return baseAPI.post('/chats', JSON.stringify(convertObjKeysToSnakeCase(data)), { credentials: 'include' });
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
