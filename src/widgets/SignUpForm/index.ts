import { Block, Store, STORE_EVENTS } from '@/shared/services';

import styles from './SignUpForm.module.scss';

import { tmpl } from './SignUpForm.tmpl';
import { INPUT_FIELDS, INPUT_NAMES } from './constants';
import { Button, FieldInput, Link } from '@/shared/ui';
import { APP_ROUTES } from '@/shared/constants';
import { AuthController, ReqAuthSignUp } from '@/shared/controllers';
import { PlainObject } from '@/types';

const store = new Store(
  Object.keys(INPUT_NAMES).reduce((acc: PlainObject, key) => {
    acc[key] = false;
    return acc;
  }, {}),
);

export class SignUpForm extends Block {
  constructor() {
    super({
      errorForm: '',
      linkToSignInPage: new Link({
        className: styles.link,
        to: APP_ROUTES.SIGN_IN,
        children: 'Войти',
      }),
      Inputs: INPUT_FIELDS.map(
        item =>
          new FieldInput({
            ...item,
            onValid: isValid => {
              store.setState({ [item.name]: isValid });
            },
          }),
      ),
      SubmitButton: new Button({
        disabled: true,
        variant: 'success',
        className: styles.btnSubmit,
        children: 'Зарегистрироваться',
        type: 'submit',
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
          }, {}) as unknown as ReqAuthSignUp;


          const state = store.getState();
          const isNotValid = Object.values(state).includes(false);

          this.setProps({
            errorForm: isNotValid ? 'Некоторые поля формы заполнены не верно' : '',
          });

          if (isNotValid) {
            return;
          }

          AuthController.signUp(formData).catch(() => {
            this.setProps({
              errorForm: 'Не удалось создать пользователя, попробуйте еще раз',
            });
          });
        },
      },
    });

    store.on(STORE_EVENTS.updated, () => {
      const state = store.getState();
      const submitButton = this.getPropValue('SubmitButton');

      submitButton.setProps({
        disabled: Object.values(state).includes(false),
      });
    });
  }

  render() {
    const errorFormText = this.getPropValue('errorForm');

    return tmpl(errorFormText);
  }
}
