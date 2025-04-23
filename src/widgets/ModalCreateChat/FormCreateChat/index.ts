import { Block } from '@/shared/services';

import { Button, FieldInput } from '@/shared/ui';
import { ReqCreateChat } from '@/shared/api';
import { tmpl } from './FormCreateChat.tmpl';
import { ChatController } from '@/shared/controllers';

interface FormCreateChatProps {
  onCloseModal?: () => void;
}

export class FormCreateChat extends Block {
  constructor({ onCloseModal }: FormCreateChatProps) {
    super({
      isValid: false,
      Input: new FieldInput({
        placeholder: 'Название чата',
        name: 'title',
        label: 'Введите название чата',
        onValid: isValid => {
          this.setProps({ isValid });
        },
      }),
      SumitButton: new Button({
        variant: 'success',
        children: 'Создать',
        type: 'submit',
      }),
      CancelButton: new Button({
        children: 'Отмена',
        onClick: event => {
          event.preventDefault();
          const FieldInput = this.getPropValue('Input') as Block;
          FieldInput.getPropValue('input').getContent().value = '';

          onCloseModal?.();
        },
      }),
      events: {
        submit: async (event: Event) => {
          event.preventDefault();

          const { elements } = event.target as HTMLFormElement;

          const inputs = Array.from(elements).filter(el => {
            return el.nodeName === 'INPUT';
          }) as HTMLInputElement[];

          const formData = inputs.reduce((acc: Record<string, string>, input) => {
            acc[input.name] = input.value;
            return acc;
          }, {}) as unknown as ReqCreateChat;

          const res = await ChatController.createChat(formData);

          if (res.ok) {
            await ChatController.getChats();
            onCloseModal?.();
          }
        },
      },
    });
  }

  render() {
    return tmpl;
  }
}
