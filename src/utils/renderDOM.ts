import { Block } from '../services/Block';

export function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) return;

  const element = block.getContent();

  if (element) {
    root.appendChild(element);
  }

  return root;
}
