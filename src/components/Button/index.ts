import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface ButtonProps extends Omit<Partial<HTMLButtonElement>, 'children' | 'className'> {
  className?: string;
  children?: string;
  htmlType?: HTMLButtonElement['type'];
  onClick?: (e: MouseEvent) => void;
}

export class Button extends Block {
  constructor({ onClick, ...otherProps }: ButtonProps) {
    super({
      events: {
        click: onClick,
      },
      ...otherProps,
    });
  }

  render() {
    return tmpl;
  }
}
