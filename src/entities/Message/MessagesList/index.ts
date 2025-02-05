import { Block } from '@/services/Block';
import tmpl from './tmpl';
import { MessageBubble } from '../MessageBubble';

interface MessageBubbleProps {}

const list = Array.from({ length: 30 }).map((_, index) => new MessageBubble({ isMy: index % 2 === 0 }));

export class MessagesList extends Block {
  constructor({}: MessageBubbleProps) {
    super('li', {
      Children: list,
    });
  }

  render() {
    return tmpl;
  }
}
