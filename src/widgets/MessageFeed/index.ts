import { Block } from '@/shared/services';

import styles from './MessageFeed.module.scss';
import { MessagesList } from '@/entities';
import { SendMessageForm } from '../SendMessageForm';

export class MessageFeed extends Block {
  constructor() {
    super({
      SendMessageForm: new SendMessageForm(),
      messageList: new MessagesList(),
    });
  }

  render() {
    return `
      <section class=${styles.mainContainer}>
        <div class=${styles.top}>
          <div class=${styles.chatInfo}>
            <div class=${styles.fallbackChatAvatar}></div>
            <h3 class=${styles.chatTitle}>Вадим</h3>
          </div>
    
          <div class=${styles.actionSlot}>
            <button class=${styles.btnChatActions}>
              <svg fill="none" class="icon">
                <use href="/assets/icons/index.svg#ellipsis-v"></use>
              </svg>
    
            </button>
          </div>
        </div>
    
        {{{messageList}}}
    
        <div class=${styles.bottom}>
          {{{SendMessageForm}}}
        </div>
      </section>
    `;
  }
}
