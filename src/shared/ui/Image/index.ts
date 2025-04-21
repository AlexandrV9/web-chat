import { Block } from '@/shared/services';

interface ImageProps {
  src: string;
  className?: string;
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super(props);
  }

  render() {
    const { className } = this.getProps();

    return `
      <img
        ${className ? `class='${className}'` : ''}
        src={{ src }} 
      />
    `;
  }
}
