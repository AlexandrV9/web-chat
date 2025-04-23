import { Block } from '@/shared/services';
import { tmpl } from './SendMessageForm.tmpl';
import { Button, Icon, Input } from '@/shared/ui';

import styles from './SendMessageForm.module.scss';

import paperClipIcon from '@/shared/assets/icons/paper-clip.svg';
import arrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { messageController } from '@/shared/controllers';

export class SendMessageForm extends Block {
  constructor() {
    super({
      ButtonAttach: new Button({
        variant: 'clean',
        className: styles.btnAttach,
        children: new Icon({ src: paperClipIcon }),
      }),
      InputMessage: new Input({
        id: 'send-message',
        className: styles.inpTextMessage,
        placeholder: 'Введите сообщение...',
        name: 'message',
      }),
      ButtonSubmit: new Button({
        variant: 'clean',
        type: 'submit',
        className: styles.btnSendMessage,
        children: new Icon({ src: arrowRightIcon, size: 20 }),
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();

          const input = this.getPropValue('InputMessage').getContent();

          if (!input.value) {
            return;
          }

          messageController.sendMessage(input.value);
        },
      },
    });
  }

  render() {
    return tmpl;
  }
}
