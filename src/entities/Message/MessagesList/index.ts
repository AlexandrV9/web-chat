import { Block } from '@/shared/services/Block';
import { MessageBubble } from '../MessageBubble';
import { store, STORE_EVENTS } from '@/shared/services';

import styles from './MessagesList.module.scss';
import { Message, User } from '@/types';

export class MessagesList extends Block {
  constructor() {
    super({
      list: [],
    });

    store.on(STORE_EVENTS.updated, async () => {
      const { messages = [], user } = store.getState();

      this.setProps({
        list: (messages as Message[]).map(message => {
          return new MessageBubble({ isMy: message.userId === (user as User).id, ...message });
        }),
      });
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
