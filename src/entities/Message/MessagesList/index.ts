import { Block } from '@/services/Block';
import tmpl from './tmpl';
import { MessageBubble } from '../MessageBubble';

const list = Array.from({ length: 30 }).map((_, index) => new MessageBubble({ isMy: index % 2 === 0 }));

export class MessagesList extends Block {
  constructor() {
    super({
      Children: list,
    });
  }

  render() {
    return tmpl;
  }
}
