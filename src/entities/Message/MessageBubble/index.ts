import { Block } from '@/shared/services/Block';
import tmpl from './tmpl';

import cls from './styles.module.scss';

interface MessageBubbleProps {
  isMy?: boolean;
  content?: string;
}

export class MessageBubble extends Block {
  constructor({ isMy = false, content }: MessageBubbleProps) {
    super({ className: isMy ? cls.my : '', content });
  }

  render() {
    return tmpl;
  }
}
