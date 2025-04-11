import { Block } from '@/shared/services';

interface IconProps {
  size?: number;
  text?: string;
}

export class Icon extends Block {
  constructor(props: IconProps) {
    super(props);
  }

  render() {
    return `
      <svg 
        fill="none" 
        class="icon" 
        width={{ size }} 
        height={{ size }}
      >
        <use href="{{ path }}"></use>
      </svg>
    `;
  }
}
