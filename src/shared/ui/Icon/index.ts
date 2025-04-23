import { Block } from '@/shared/services';
import { clsx } from '@/shared/utils';

interface IconProps {
  className?: string;
  size?: number;
  src: string;
}

export class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    super({
      size: 24,
      ...props,
    });
  }

  render() {
    const { className, size } = this.getProps();

    return `
      <img 
        className='${clsx(className)}'
        width='${size}px'
        height='${size}px'
        src={{src}} 
      />
    `;
  }
}
