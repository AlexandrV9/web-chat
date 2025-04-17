import { Block, Store, STORE_EVENTS } from '@/shared/services';
import { Button, FieldInput } from '@/shared/ui';
import { tmpl } from './tmpl';

import styles from './FormUpdatePasswor.module.scss';
import { UserController } from '@/shared/controllers/UserController';
import { INPUT_FIELDS, INPUT_NAMES } from './constants';
import { PlainObject } from '@/types';
import { ReqUpdatePassword } from '@/shared/api';
import { modalStore } from '..';

const initialState = Object.keys(INPUT_NAMES).reduce((acc: PlainObject, key) => {
  acc[key] = false;
  return acc;
}, {});

const store = new Store(initialState);

interface FormUpdatePasswordProps {
  onCloseModal?: () => void;
}

export class FormUpdatePassword extends Block {
  constructor({ onCloseModal }: FormUpdatePasswordProps) {
    super({
      errorForm: '',
      Inputs: INPUT_FIELDS.map(
        item =>
          new FieldInput({
            ...item,
            onValid: isValid => {
              store.setState({ [item.name]: isValid });
            },
          }),
      ),
      ButtonCancel: new Button({
        className: styles.cancelButton,
        children: 'Отмена',
        onClick: () => {
          onCloseModal?.();
          this.clearForm();
        },
      }),
      ButtonSubmit: new Button({
        disabled: true,
        type: 'submit',
        className: styles.submitButton,
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

          const state = store.getState();
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

    modalStore.on(STORE_EVENTS.updated, () => {
      const state = modalStore.getState();

      if (!state.isOpen) {
        this.clearForm();
      }
    });

    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState();
      const form = this.getContent() as HTMLFormElement | null;

      if (!form) {
        return;
      }

      const submitButton: HTMLButtonElement | null = form.querySelector("button[type='submit']");

      if (submitButton) {
        submitButton.disabled = Object.values(state).includes(false);
      }
    });
  }

  clearForm() {
    const form = this.getContent() as HTMLFormElement | null;

    if (!form) {
      return;
    }

    const fields = this._lists.Inputs.children as Block[];
    fields.forEach(input => {
      console.log(input.setProps({ textError: '' }));
    });

    const inputs = Array.from(form.elements).filter(el => {
      return el.nodeName === 'INPUT';
    }) as HTMLInputElement[];

    inputs.forEach(input => {
      input.value = '';
    });

    store.setState(initialState);
  }

  render() {
    const errorFormText = this.getProp('errorForm');
    return tmpl(errorFormText);
  }
}
