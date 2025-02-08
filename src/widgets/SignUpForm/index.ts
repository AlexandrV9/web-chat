import { Block } from '../../services/Block';

import cls from './styles.module.scss';

import tmpl from './tmpl';
import { INPUT_FIELDS } from './constants';
import { Button, FieldInput } from '@/components';

interface SignUpFormProps {}

export class SignUpForm extends Block {
  constructor(props: SignUpFormProps) {
    super({
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
