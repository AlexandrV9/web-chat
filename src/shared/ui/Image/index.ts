import { Block } from '@/shared/services';

interface ImageProps {
  src: string;
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super(props);
  }

  render() {
    return `
      <img 
        src={{src}} 
      />
    `;
  }
}
