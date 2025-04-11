import { Block } from '..';

export const isBlock = (value: unknown): value is Block => {
  return value instanceof Block;
};
