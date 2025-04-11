import { Block } from '@/shared/services';

import cls from './styles.module.scss';

export interface InputProps extends Partial<Omit<HTMLInputElement, 'autocomplete'>> {
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  autocomplete?: boolean;
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
        change: onChange,
      },
    });
  }

  render() {
    return `
      <input 
        id={{id}}
        class='${cls.input} {{className}}'
        value='{{value}}'
        name={{name}}
        placeholder=" "
        type={{type}}
        autocomplete={{autocomplete}}
      />
    `;
  }
}
