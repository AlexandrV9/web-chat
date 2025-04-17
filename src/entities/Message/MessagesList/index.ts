import { Block } from '@/shared/services/Block';
import { MessageBubble } from '../MessageBubble';
import { store, STORE_EVENTS } from '@/shared/services';
import { AuthController, ChatController, messageController } from '@/shared/controllers';

import styles from './MessagesList.module.scss';

const list = Array.from({ length: 30 }).map((_, index) => new MessageBubble({ isMy: index % 2 === 0 }));

export class MessagesList extends Block {
  constructor() {
    super({
      list: [],
    });

    store.on(STORE_EVENTS.updated, async () => {
      // const state = store.getState();

      // const chatId = state.chatId;
      // const userId = state.user.data.id;

      // if (!chatId || !userId) return;

      // const response = await ChatController.getMessageToken(chatId);
      // const token = response.data?.token;

      // if (!token) return;

      // messageController.connect({
      //   userId,
      //   chatId,
      //   token,
      // });

      // this.setProps({});
    });
  }

  render() {
    return `
      <div class=${styles.messagesList}>
        {{{list}}}
      </div>
    `;
  }
}
