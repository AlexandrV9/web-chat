import { ChatsAPI, ReqAddUsersToChat, ReqCreateChat, ReqDeleteUsersFromChat, ReqGetChatUsers } from '@/shared/api';
import { store } from '@/shared/services';
import { convertObjKeysToCamelCase } from '@/shared/utils';

export class ChatController {
  static async getChats() {
    return ChatsAPI.getAll().then(res => {
      store.setState({
        chats: res.data?.map(chat => convertObjKeysToCamelCase(chat)),
      });
    });
  }

  static async getChatToken(chatId: string) {
    return ChatsAPI.getToken(chatId).then(res => {
      return res.data?.token;
    });
  }

  static async getChatUsers(data: ReqGetChatUsers) {
    return ChatsAPI.getChatUsers(data);
  }

  static async createChat(data: ReqCreateChat) {
    return ChatsAPI.createChat(data);
  }

  static async addUsersToChat(data: ReqAddUsersToChat) {
    return ChatsAPI.addUsersToChat(data);
  }

  static async deleteUsersFromChat(data: ReqDeleteUsersFromChat) {
    return ChatsAPI.deleteUsersFromChat(data);
  }
}
