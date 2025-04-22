import { Block } from '@/shared/services/Block';
import { Navbar } from '../Navbar';
import { ChatsList } from '@/entities';
import { Button, Icon, Input } from '@/shared/ui';

import styles from './LeftPanel.module.scss';
import { store } from '@/shared/services';
import { ChatController, messageController } from '@/shared/controllers';

import plusIcon from '@/shared/assets/icons/plus-circle.svg';
import { tmpl } from './LeftPanel.tmpl';
import { ModalCreateChat } from '../ModalCreateChat';
import { Chat } from '@/types';

interface LeftPanelProps {
  title?: string;
}

export class LeftPanel extends Block {
  constructor({ title = '' }: LeftPanelProps) {
    super({
      title,
      children: new ChatsList({
        onSelect: chatId => this.setSelectedChat(chatId),
      }),
      Navbar: new Navbar(),
      searchInput: new Input({}),
      ModalCreateChat: new ModalCreateChat({ isOpen: false }),
      ActionButton: new Button({
        variant: 'clean',
        className: styles.button,
        children: new Icon({ src: plusIcon }),
        onClick: e => {
          e.preventDefault();
          this.getPropValue('ModalCreateChat')?.setProps({ isOpen: true });
        },
      }),
    });
  }

  private async setSelectedChat(chatId: Chat['id']) {
    const state = store.getState();

    messageController.leave();

    const token = await ChatController.getChatToken(String(chatId));
    const selectedChat = state.chats.find((chat: Chat) => chat.id === chatId);

    if (token) {
      messageController.connect({ userId: state.user.id, chatId, token });
    }

    store.setState({ chatId, selectedChat, messages: [] });
  }

  render() {
    return tmpl;
  }
}
