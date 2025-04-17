import { ChatsAPI } from '@/shared/api';
import { store } from '@/shared/services';

export class ChatController {
  static async getChats() {
    return ChatsAPI.getAll().then(res => {
      store.setState({
        chats: res.data,
      });
    });
  }

  static async getMessageToken(chatId: number) {
    return ChatsAPI.getToken(chatId).then(auth => {
      return auth;
    });
  }

  static async createChat() {
    return ChatsAPI.createChat();
  }
}
