import { Block } from '@/shared/services';

import styles from './FormCreateChat.module.scss';
import { Button, FieldInput } from '@/shared/ui';
import { AuthAPI, ChatsAPI } from '@/shared/api';

interface FormCreateChatProps {}

export class FormCreateChat extends Block {
  constructor({}: FormCreateChatProps) {
    super({
      titleInput: new FieldInput({
        id: 'chat-name-input',
        name: 'title',
        label: 'Введите название чата',
      }),
      sumitButton: new Button({
        children: 'Создать',
        className: styles.submitButton,
        htmlType: 'submit',
      }),
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target as HTMLFormElement);
          const values = Object.fromEntries(formData.entries());

          const res = await ChatsAPI.createChat(values as any);

          console.log(res);
        },
      },
    });
  }

  render() {
    return `
      <form class=${styles.form}>
        <h3 class=${styles.title}>Создание нового чата</h3>
        {{{titleInput}}}
        {{{sumitButton}}}
      </form>
    `;
  }
}
