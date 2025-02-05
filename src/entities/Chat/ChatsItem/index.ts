import { Block } from '@/services/Block';
import tmpl from './tmpl';

interface ChatsItemProps {}

export class ChatsItem extends Block {
  constructor({}: ChatsItemProps) {
    super('li', {});
  }

  render() {
    return tmpl;
  }
}
