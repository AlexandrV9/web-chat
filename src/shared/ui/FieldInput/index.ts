import { Block } from '@/shared/services';
import { Input, InputProps } from '../Input';

import tmpl from './tmpl';

interface FieldInputProps extends InputProps {
  label?: string;
  textError?: string;
  className?: string;
  autocomplete?: boolean;
  validator?: (value: string) => string;
}

export type IFieldInput = FieldInputProps;

export class FieldInput extends Block {
  constructor({ label, textError = '', className = '', validator, ...props }: FieldInputProps) {
    super({
      label,
      textError: '',
      htmlFor: props.id,
      className,
      input: new Input({
        onBlur: e => {
          if (!validator) return;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.setProps({ textError: validator(e.target?.value) });
        },
        ...props,
      }),
    });
  }

  render() {
    return tmpl;
  }
}
