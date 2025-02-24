import { Block } from '../../services/Block';
import tmpl from './tmpl';

interface IconProps {
  size?: number;
  text?: string;
}

export class Icon extends Block {
  constructor(props: IconProps) {
    super(props);
  }

  render() {
    return tmpl;
  }
}
