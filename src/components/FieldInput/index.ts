import { Block } from '../../services/Block';
import { Input, InputProps } from '../Input';

import tmpl from './tmpl';

interface FieldInputProps extends InputProps {
  label?: string;
  textError?: string;
  className?: string;
  validator?: (value: string) => string;
}

export type IFieldInput = FieldInputProps;

export class FieldInput extends Block {
  constructor({ label, textError = '', className = '', validator, ...otherProps }: FieldInputProps) {
    super({
      label,
      textError: '',
      htmlFor: otherProps.id,
      className,
      input: new Input({
        onBlur: e => {
          if (!validator) return;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.setProps({ textError: validator(e.target?.value) });
        },
        ...otherProps,
      }),
    });
  }

  render() {
    return tmpl;
  }
}
