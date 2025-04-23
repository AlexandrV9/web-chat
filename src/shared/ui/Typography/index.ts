import { Block } from '@/shared/services';
import { clsx } from '@/shared/utils';

import styles from './Typography.module.scss';

export const Align = ['left', 'right', 'center'] as const;

export interface TypographyProps {
  className?: string;
  inline?: boolean;
  align?: (typeof Align)[number];
  text: string;
  variant?: 'accent1' | 'text1' | 'text2' | 'text3';
}

export class Typography extends Block {
  constructor({ variant = 'text1', align = 'left', ...props }: TypographyProps) {
    super({
      align,
      variant,
      ...props,
    });
  }

  render() {
    const { className, variant, inline, align } = this.getProps();

    return `
      <p 
        class='${clsx(styles.text, styles[variant], inline && styles.textInline, className)}'
        style="text-align: ${align}"
      >
        {{text}}
      </p>
    `;
  }
}
