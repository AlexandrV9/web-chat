import { Block } from '@/services/Block';
import tmpl from './tmpl';

export class ChatsItem extends Block {
  constructor() {
    super('li');
  }

  render() {
    return tmpl;
  }
}
