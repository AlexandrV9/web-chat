import { PlainObject } from '@/types';

export function convertObjKeysToCamelCase<T>(obj: PlainObject, replace?: string): T {
  return Object.entries(obj).reduce((acc: PlainObject, [key, value]) => {
    const chars = [...key];
    chars.forEach((char, index) => {
      if (char === (replace || '_')) {
        chars[index] = '';
        chars[index + 1] = chars[index + 1].toUpperCase();
      }
    });

    acc[chars.join('')] = value;
    return acc;
  }, {}) as T;
}
