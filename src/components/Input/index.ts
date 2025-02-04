import { Block } from '../../services/Block';

import tmpl from './tmpl';

export interface InputProps extends Partial<HTMLInputElement> {
  className?: string;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
}

export class Input extends Block {
  constructor({ type = 'text', ...otherProps }: InputProps) {
    super('div', { type, ...otherProps });
  }

  render() {
    return tmpl;
  }
}
