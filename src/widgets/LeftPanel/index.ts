import { Block } from '@/shared/services/Block';
import { Navbar } from '../Navbar';
import { ChatsList } from '@/entities';
import { Button, Image, Input, Modal } from '@/shared/ui';

import styles from './LeftPanel.module.scss';
import { FormCreateChat } from './FormCreateChat';
import { store } from '@/shared/services';
import { ChatController, messageController } from '@/shared/controllers';

import plusIcon from '@/shared/assets/icons/plus-circle.svg';

interface LeftPanelProps {
  title?: string;
}

export class LeftPanel extends Block {
  constructor({ title = '' }: LeftPanelProps) {
    super({
      title,
      children: new ChatsList({
        onSelect: chatId => {
          messageController.leave();
          store.setState({ chatId, messages: [] });
        },
      }),
      navbar: new Navbar(),
      searchInput: new Input({}),
      modalCreateChat: new Modal({
        className: styles.modal,
        isOpen: false,
        children: new FormCreateChat({}),
      }),
      actionButton: new Button({
        className: styles.button,
        children: new Image({ src: plusIcon }),
        onClick: e => {
          e.preventDefault();
          // console.log(this._children.modalCreateChat.setProps({ isOpen: true }));
        },
      }),
    });
  }

  render() {
    return `
      <aside class=${styles.leftPanel}>
        <section class=${styles.top}>
          <h3 class=${styles.title}>{{title}}</h3>
          {{{actionButton}}}
        </section>

        <div class=${styles.searchChats}>
          <input
            type="text"
            class=${styles.inpSearchChats}
            placeholder="Введите название чата..."
          />
        </div>

        {{{children}}}
        {{{navbar}}}
        {{{modalCreateChat}}}
      </aside>
    `;
  }
}

// <button class=${cls.btnEdit}>
// <img src="../../shared/assets/icons/pencil-square.svg" />
// </button>
