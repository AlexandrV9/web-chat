import { Block } from '../../services/Block';

import tmpl from './tmpl';

export interface InputProps extends Partial<HTMLInputElement> {
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  onBlur?: (e: FocusEvent) => void;
  onChange?: (e: InputEvent) => void;
}

export class Input extends Block {
  constructor({ type = 'text', onBlur, onChange, ...otherProps }: InputProps) {
    super({
      ...otherProps,
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
