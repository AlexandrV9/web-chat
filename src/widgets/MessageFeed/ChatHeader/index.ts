import { Block, store, STORE_EVENTS } from '@/shared/services';

import { Button, Dropdown, Image } from '@/shared/ui';

import styles from './ChatHeader.module.scss';
import menuIcon from '@/shared/assets/icons/ellipsis-v.svg';
import { tmpl } from './ChatHeader.tmpl';
import { Chat } from '@/types';
import { Menu, MenuItem } from './Menu';
import { ModalAddUserToChat } from '@/widgets/ModalAddUserToChat';

export class ChatHeader extends Block {
  constructor() {
    super({
      chatTitle: '',
      ActionSlot: new Dropdown({
        Content: new Menu({
          Items: [
            new MenuItem({
              text: 'Обновить список участников чата',
              onClick: () => {
                console.log(this.getPropValue('ModalAddUserToChat'));
                this.getPropValue('ModalAddUserToChat').setProps({
                  isOpen: true,
                });
              },
            }),
          ],
        }),
        position: 'left',
        Trigger: new Button({
          variant: 'clean',
          className: styles.btnChatActions,
          children: new Image({
            src: menuIcon,
          }),
        }),
      }),
      ModalAddUserToChat: new ModalAddUserToChat({ isOpen: false }),
    });

    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState();
      const selectedChat: Chat | null = state.selectedChat;

      if (!selectedChat) {
        return;
      }

      this.setProps({ chatTitle: selectedChat.title });
    });
  }

  render() {
    return tmpl;
  }
}
