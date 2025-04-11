import { isPlainObject } from '../_common';

export function clsx(...args: unknown[]): string {
  return args
    .flatMap(item => {
      if (!item) return [];

      if (isPlainObject(item)) {
        return Object.entries(item)
          .filter(([key, value]) => value && key)
          .map(([key]) => key);
      }

      if (Array.isArray(item)) {
        return clsx(...item).split(' ');
      }

      return String(item).trim();
    })
    .filter(Boolean)
    .join(' ');
}
