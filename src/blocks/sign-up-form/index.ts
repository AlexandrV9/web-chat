import { Button, FieldInput } from '@/components';
import { Block } from '../../services/Block';

import cls from './styles.module.scss';

import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';

interface SignUpFormProps {}

export class SignUpForm extends Block {
  constructor(props: SignUpFormProps) {
    super('div', {
      ...props,
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
