import { Block } from '@/shared/services';

import cls from './styles.module.scss';

import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';
import { Button, FieldInput } from '@/shared/ui';
import { firstNameValidator, loginValidator, passwordValidator } from '@/shared/services/Validator';
import { AuthAPI } from '@/shared/api';

export class SignUpForm extends Block {
  constructor() {
    super({
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target as HTMLFormElement);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const values = Object.fromEntries(formData.entries());

          let isValid = true;

          // isValid = !loginValidator(values.email);
          // isValid = !loginValidator(values.login);
          // isValid = !loginValidator(values.phone);
          // isValid = !passwordValidator(values.password);
          // isValid = !firstNameValidator(values.first_name);
          // isValid = !firstNameValidator(values.second_name);
          // isValid = !firstNameValidator(values.password);

          if (isValid) {
            console.log(values);
            const res = await AuthAPI.signUp(values as any);
            console.log(res);
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
        className: cls.btnSubmit,
        children: 'Зарегистрироваться',
        htmlType: 'submit',
      }),
    });
  }

  render() {
    return tmpl;
  }
}
