import { Block } from '@/shared/services';

import styles from './ChatItem.module.scss';

import { Chat } from '@/types';
import { navigate } from '@/shared/utils';

export interface ChatItemProps {
  data: Chat;
  onClick?: (chatId: number) => void;
}

export class ChatItem extends Block {
  constructor({ data, onClick }: ChatItemProps) {
    super({
      id: data.id,
      title: data.title,
      unreadCount: data.unread_count,
      lastMessage: data.lastMessage?.content ?? '',
      createdBy: new Date(data.created_by),
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          onClick?.(this.props.id);
        },
      },
    });
  }

  render() {
    return `
      <li class=${styles.chatItem}>
        <div class=${styles.avatar}>И</div>
        <div class=${styles.container}>
        <div class=${styles.titleWrapper}>
        <p class=${styles.title}>{{title}}</p>
        <span class=${styles.time}>10:49</span>
      </div>

      <div class=${styles.content}>
        <p class=${styles.message}>{{last_message.content}}</p>
        <div class=${styles.counter}>{{unreadCount}}</div>
      </div>
    </div>
    </li>
    `;
  }
}
