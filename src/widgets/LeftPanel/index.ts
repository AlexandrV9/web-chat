import { Block } from '@/shared/services/Block';
import { Navbar } from '../Navbar';
import { ChatsList } from '@/entities';
import { Button, Icon, Input } from '@/shared/ui';

import styles from './LeftPanel.module.scss';
import { store } from '@/shared/services';
import { messageController } from '@/shared/controllers';

import plusIcon from '@/shared/assets/icons/plus-circle.svg';
import { tmpl } from './LeftPanel.tmpl';
import { ModalCreateChat } from '../ModalCreateChat';

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

  render() {
    return tmpl;
  }
}
