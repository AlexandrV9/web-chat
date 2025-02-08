import { Block } from '@/services/Block';
import tmpl from './tmpl';
import { ChatsItem } from '../ChatsItem';

interface ChatsListPage {}

const list = Array.from({ length: 15 }).map(() => new ChatsItem({}))

export class ChatsList extends Block {
  constructor() {
    super({
      Children: list,
    });
  }

  render() {
    return tmpl;
  }
}
