import { Block } from '@/shared/services/Block';
import { Navbar } from '../Navbar';
import { ChatsList } from '@/entities';
import { Button, Icon, Input } from '@/shared/ui';

import styles from './LeftPanel.module.scss';
import { router, store } from '@/shared/services';
import { ChatController, messageController } from '@/shared/controllers';

import plusIcon from '@/shared/assets/icons/plus-circle.svg';
import { tmpl } from './LeftPanel.tmpl';
import { ModalCreateChat } from '../ModalCreateChat';
import { Chat } from '@/types';
import { APP_ROUTES } from '@/shared/constants';

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

  connectToChat() {
    const chatId = store?.state?.chatId;
    const userId = store?.state?.user?.id;

    if (!userId) {
      return;
    }

    ChatController.getChatToken(String(chatId)).then(token => {
      if (token) {
        messageController.connect({ userId: store.state.user.id, chatId, token });
      }
    });
  }

  componentDidMount() {
    const lastChatId = localStorage.getItem('chatId');

    if (!lastChatId) {
      return;
    }

    store.setState({
      chatId: +lastChatId,
    });

    ChatController.getChats();

    this.connectToChat();
  }

  private async setSelectedChat(chatId: Chat['id']) {
    const state = store.getState();
    const selectedChat = state.chats.find((chat: Chat) => chat.id === chatId);

    localStorage.setItem('chat-id', String(chatId));

    messageController.leave();

    store.setState({ chatId, selectedChat, messages: [] });
    this.connectToChat();
    router.goByPathname(APP_ROUTES.CONVERSATIONS);
  }

  render() {
    return tmpl;
  }
}
