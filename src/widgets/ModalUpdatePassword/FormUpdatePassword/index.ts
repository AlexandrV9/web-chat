import { Block, Store, STORE_EVENTS } from '@/shared/services';
import { Button, FieldInput, Typography } from '@/shared/ui';
import { tmpl } from './FormUpdatePassword.tmpl';

import { UserController } from '@/shared/controllers/UserController';
import { INPUT_FIELDS, INPUT_NAMES } from './constants';
import { PlainObject } from '@/types';
import { ReqUpdatePassword } from '@/shared/api';
import { modalUpdatePasswordStore } from '@/widgets/ModalUpdatePassword';

const initialState = Object.keys(INPUT_NAMES).reduce((acc: PlainObject, key) => {
  acc[key] = false;
  return acc;
}, {});

const formStore = new Store(initialState);

interface FormUpdatePasswordProps {
  onCloseModal?: () => void;
}

export class FormUpdatePassword extends Block {
  constructor({ onCloseModal }: FormUpdatePasswordProps) {
    super({
      errorForm: '',
      Title: new Typography({
        variant: 'text2',
        text: 'Обновление пароля',
        align: 'center',
      }),
      Inputs: INPUT_FIELDS.map(
        item =>
          new FieldInput({
            ...item,
            onValid: isValid => {
              formStore.setState({ [item.name]: isValid });
            },
          }),
      ),
      ButtonCancel: new Button({
        children: 'Отмена',
        onClick: () => {
          onCloseModal?.();
          this.clearForm();
        },
      }),
      ButtonSubmit: new Button({
        disabled: true,
        type: 'submit',
        variant: 'success',
        children: 'Сохранить',
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
          }, {}) as unknown as ReqUpdatePassword;

          const state = formStore.getState();
          const isNotValid = Object.values(state).includes(false);

          this.setProps({
            errorForm: isNotValid ? 'Некоторые поля формы заполнены не верно' : '',
          });

          if (isNotValid) {
            return;
          }

          const res = await UserController.updatePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          });

          if (res.ok) {
            alert('Пароль успешно обновлен');
            onCloseModal?.();
            this.clearForm();
          } else {
            this.setProps({
              errorForm: 'Запрос не прошел, попробуйте еще раз',
            });
          }
        },
      },
    });

    modalUpdatePasswordStore.on(STORE_EVENTS.updated, () => {
      const state = modalUpdatePasswordStore.getState();

      if (!state.isOpen) {
        this.clearForm();
      }
    });

    formStore.on(STORE_EVENTS.updated, () => {
      const state = formStore.getState();
      const submitButton = this.getPropValue('ButtonSubmit') as Block;
      submitButton.setProps({ disabled: Object.values(state).includes(false) });
    });
  }

  clearForm() {
    this.getPropValue('Inputs').forEach((input: Block) => {
      input.setProps({ textError: '' });
      input.props.input._element.value = '';
    });

    formStore.setState(initialState);
  }

  render() {
    const errorFormText = this.getPropValue('errorForm');
    return tmpl(errorFormText);
  }
}
