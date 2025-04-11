import { ChatsAPI } from '@/shared/api';
import { store } from '@/shared/services';

export class ChatController {
  static getChats() {
    return ChatsAPI.getAll().then(res => {
      store.set('chats', res.data);
    });
  }

  static createChat() {
    return ChatsAPI.createChat();
  }
}
