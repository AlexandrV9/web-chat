import { Block, store, STORE_EVENTS } from '@/shared/services';

import { MessagesList } from '@/entities';
import { SendMessageForm } from './SendMessageForm';

import { tmpl } from './MessageFeed.tmpl';
import { ChatNotSelected } from './ChatNotSelected';
import { ChatHeader } from './ChatHeader';

export class MessageFeed extends Block {
  constructor() {
    super({
      ChatNotSelected: new ChatNotSelected(),
      SendMessageForm: null,
      MessageList: null,
      ChatHeader: null,
    });

    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState();

      if (state.chatId) {
        this.setProps({
          ChatHeader: new ChatHeader(),
          SendMessageForm: new SendMessageForm(),
          MessageList: new MessagesList(),
          ChatNotSelected: null,
        });
      } else {
        this.setProps({ ChatNotSelected: new ChatNotSelected() });
      }
    });
  }

  render() {
    return tmpl;
  }
}
