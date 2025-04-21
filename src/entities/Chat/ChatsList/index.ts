import { Block } from '@/shared/services/Block';
import { ChatItem } from './ChatItem';
import { ChatController } from '@/shared/controllers';
import { store, STORE_EVENTS } from '@/shared/services';

import styles from './styles.module.scss';
import { Chat } from '@/types';

interface ChatsListProps {
  onSelect?: (chatId: Chat['id']) => void;
}

export class ChatsList extends Block {
  constructor({ onSelect }: ChatsListProps) {
    super({
      onSelect,
      list: [],
    });

    ChatController.getChats();

    store.on(STORE_EVENTS.updated, () => {
      const { chats } = store.getState() as { chats: Chat[] };
      this.setProps({ list: chats?.map(item => new ChatItem({ data: item, onClick: this.props.onSelect })) ?? [] });
    });
  }

  render() {
    return `
      <ul class=${styles.chatsList}>
        {{{list}}}
      </ul>
    `;
  }
}
