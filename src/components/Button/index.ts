import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface ButtonProps extends Omit<Partial<HTMLButtonElement>, 'children' | 'className'> {
  className?: string;
  children?: string;
  htmlType?: HTMLButtonElement['type'];
  onClick?: (e: MouseEvent) => void;
}

export class Button extends Block {
  constructor({ onClick, id = "", ...otherProps }: ButtonProps) {
    super({
      events: {
        click: onClick,
      },
      id,
      ...otherProps,
    });
  }

  render() {
    return tmpl;
  }
}
