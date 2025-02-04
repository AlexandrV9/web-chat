import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface ButtonProps extends Omit<Partial<HTMLButtonElement>, 'children' | 'className'> {
  className?: string;
  children?: string;
  htmlType?: HTMLButtonElement['type'];
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return tmpl;
  }
}
