import { Block } from '../../services/Block';
import tmpl from './tmpl';
import { Input } from '@/components';

import cls from './styles.module.scss';

export class SendMessageForm extends Block {
  constructor() {
    super({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target as HTMLFormElement);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const values = Object.fromEntries(formData.entries());

          if (values.message) {
            console.log(values);
          }
        },
      },
      InputMessage: new Input({
        id: 'send-message',
        className: cls.inpTextMessage,
        placeholder: 'Введите сообщение...',
        name: 'message',
      }),
    });
  }

  render() {
    return tmpl;
  }
}
