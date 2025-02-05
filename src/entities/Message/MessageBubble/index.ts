import { Block } from '@/services/Block';
import tmpl from './tmpl';

import cls from "./styles.module.scss"

interface MessageBubbleProps {
  isMy?: boolean;
}

export class MessageBubble extends Block {
  constructor({ isMy = false }: MessageBubbleProps) {
    super('li', { className: isMy ? cls.my : '' });
  }

  render() {
    return tmpl;
  }
}
