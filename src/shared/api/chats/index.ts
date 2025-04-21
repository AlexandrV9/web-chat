import { baseAPI } from '@/shared/services';
import { convertObjKeysToSnakeCase } from '@/shared/utils';
import { Chat, User } from '@/types';

export interface ReqCreateChat {
  title: string;
}

export interface ReqGetAllChats {
  offset: number;
  limit: number;
  title: string;
}

export interface ReqGetChatUsers {
  chatId: Chat['id'];
}

export interface ReqAddUsersToChat {
  users: User['id'][];
  chatId: Chat['id'];
}

export interface ReqDeleteUsersFromChat {
  users: User['id'][];
  chatId: Chat['id'];
}

export class ChatsAPI {
  static getAll(data?: ReqGetAllChats) {
    return baseAPI.get('/chats', { credentials: 'include', params: data });
  }

  static createChat(data: ReqCreateChat) {
    return baseAPI.post('/chats', JSON.stringify(convertObjKeysToSnakeCase(data)), { credentials: 'include' });
  }

  static getChatUsers(data: ReqGetChatUsers) {
    return baseAPI.get(`/chats/${data.chatId}/users`, { credentials: 'include' });
  }

  static getToken(chatId: string) {
    return baseAPI.post<{
      token: string;
    }>(`/chats/token/${chatId}`, JSON.stringify({}), { credentials: 'include' });
  }

  static addUsersToChat(data: ReqAddUsersToChat) {
    return baseAPI.put(`/chats/users`, JSON.stringify(data), { credentials: 'include' });
  }

  static deleteUsersFromChat(data: ReqDeleteUsersFromChat) {
    return baseAPI.delete(`/chats/users`, JSON.stringify(data), { credentials: 'include' });
  }
}
