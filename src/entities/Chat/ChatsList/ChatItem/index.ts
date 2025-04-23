import { Block } from '@/shared/services';

import styles from './ChatItem.module.scss';

import { Chat } from '@/types';

export interface ChatItemProps {
  data: Chat;
  onClick?: (chatId: Chat['id']) => void;
}

export class ChatItem extends Block {
  constructor({ data, onClick }: ChatItemProps) {
    super({
      id: data.id,
      title: data.title,
      unreadCount: data.unreadCount,
      lastMessage: data.lastMessage?.content ?? '',
      createdBy: new Date(data.createdBy),
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          if (data) {
            onClick?.(data.id);
          }
        },
      },
    });
  }

  render() {
    return `
      <li class=${styles.chatItem}>
        <div class=${styles.avatar}>T</div>
        <div class=${styles.container}>
        <div class=${styles.titleWrapper}>
        <p class=${styles.title}>{{ title }}</p>
      </div>

      <div class=${styles.content}>
        <p class=${styles.message}>{{ lastMessage }}</p>
        <div class=${styles.counter}>{{ unreadCount }}</div>
      </div>
      </div>
    </li>
    `;
  }
}
