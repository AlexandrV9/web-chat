import { Block } from '@/shared/services';

export function renderElementInDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.append(block.getContent() as Node);
  }

  return root;
}
