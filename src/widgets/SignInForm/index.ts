import cls from './styles.module.scss';

import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';
import { Button, FieldInput } from '@/components';
import { Block } from '@/services/Block';

interface SignInFormProps {}

export class SignInForm extends Block {
  constructor(props: SignInFormProps) {
    super('div', {
      ...props,
      Inputs: INPUT_FIELDS.map(item => new FieldInput(item)),
      SubmitButton: new Button({
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
