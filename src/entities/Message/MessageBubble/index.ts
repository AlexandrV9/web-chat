import { Block } from '@/shared/services/Block';
import tmpl from './tmpl';

import cls from './styles.module.scss';

interface MessageBubbleProps {
  isMy?: boolean;
}

export class MessageBubble extends Block {
  constructor({ isMy = false }: MessageBubbleProps) {
    super({ className: isMy ? cls.my : '' });
  }

  render() {
    return tmpl;
  }
}
