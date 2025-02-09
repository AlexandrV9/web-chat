import cls from './styles.module.scss';

import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';
import { Button, FieldInput } from '@/components';
import { Block } from '@/services/Block';
import { loginValidator, passwordValidator } from '@/services/Validator';

export class SignInForm extends Block {
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

          let isValid = true;

          isValid = !loginValidator(values.login);
          isValid = !passwordValidator(values.password);

          if (isValid) {
            console.log(values);
          } else {
            const errorEl = document.querySelector(`.${cls.error}`);

            if (errorEl) {
              errorEl.classList.add(cls.visible);
            }
          }
        },
      },
      Inputs: INPUT_FIELDS.map(item => new FieldInput(item)),
      SubmitButton: new Button({
        id: 'home',
        className: cls.btnSubmit,
        children: 'Войти',
        htmlType: 'submit',
      }),
    });
  }

  render() {
    return tmpl;
  }
}
