import { Block } from '@/shared/services';

import { MessagesList } from '@/entities';
import { SendMessageForm } from '../SendMessageForm';
import { Button, Image } from '@/shared/ui';

import styles from './MessageFeed.module.scss';
import menuIcon from '@/shared/assets/icons/ellipsis-v.svg';
import { tmpl } from './MessageFeed.tmpl';

export class MessageFeed extends Block {
  constructor() {
    super({
      SendMessageForm: new SendMessageForm(),
      messageList: new MessagesList(),
      ActionButton: new Button({
        variant: 'clean',
        className: styles.btnChatActions,
        children: new Image({
          src: menuIcon,
        }),
      }),
    });
  }

  render() {
    return tmpl;
  }
}
