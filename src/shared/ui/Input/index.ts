import { Block } from '@/shared/services';

import cls from './Input.module.scss';

import { clsx } from '@/shared/utils';

export interface InputProps extends Partial<Omit<HTMLInputElement, 'autocomplete'>> {
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  autocomplete?: boolean;
  validation?: {
    required?: boolean;
    minlength?: string;
    maxlength?: string;
    pattern?: string;
  };
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
}

export class Input extends Block {
  constructor({ type = 'text', onBlur, onChange, autocomplete, ...props }: InputProps) {
    super({
      ...props,
      autocomplete: autocomplete ? 'on' : 'off',
      type,
      events: {
        blur: onBlur,
        input: onChange,
      },
    });
  }

  render() {
    const { id, name, type, validation = {}, placeholder, autocomplete } = this.props;
    const { required, minlength } = validation;

    return `
      <input 
        class='${clsx(cls.input, this.props.className)}'
        ${id ? 'id={{id}}' : ''}
        ${name ? 'name={{name}}' : ''}
        ${type ? 'type={{type}}' : ''}
        ${autocomplete ? 'autocomplete={{autocomplete}}' : ''}
        ${placeholder ? 'placeholder="{{placeholder}}"' : ''}
        ${required ? 'required' : ''}
        ${minlength ? 'minlength={{validation.minlength}}' : ''}
      />
    `;
  }
}
