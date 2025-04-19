import { Block } from '@/shared/services';
import { tmpl } from './SendMessageForm.tmpl';
import { Button, Icon, Input } from '@/shared/ui';

import styles from './SendMessageForm.module.scss';

import paperClipIcon from '@/shared/assets/icons/paper-clip.svg';
import arrowRightIcon from '@/shared/assets/icons/arrow-right.svg';

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
        className: styles.btnSendMessage,
        children: new Icon({ src: arrowRightIcon, size: 20 }),
      }),
      events: {
        submit: (event: Event) => {
          event.preventDefault();

          const { elements } = event.target as HTMLFormElement;

          const inputs = Array.from(elements).filter(el => {
            return el.nodeName === 'INPUT';
          }) as HTMLInputElement[];

          const formData = inputs.reduce((acc: Record<string, string>, input) => {
            acc[input.name] = input.value;
            return acc;
          }, {}) as unknown;

          console.log(formData);
        },
      },
    });
  }

  render() {
    return tmpl;
  }
}
