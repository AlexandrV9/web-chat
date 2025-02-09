import { Block } from '../../services/Block';

import tmpl from './tmpl';

export interface InputProps extends Partial<Omit<HTMLInputElement, "autocomplete">> {
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  autocomplete?: boolean,
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
}

export class Input extends Block {
  constructor({ type = 'text', onBlur, onChange, autocomplete, ...otherProps }: InputProps) {
    super({
      ...otherProps,
      autocomplete: autocomplete ? "on" : "off",
      type,
      events: {
        blur: onBlur,
        change: onChange,
      },
    });
  }

  render() {
    return tmpl;
  }
}
