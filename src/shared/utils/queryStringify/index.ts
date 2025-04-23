import { isArray, isPlainObject } from '../_common';

export function queryStringify(data: unknown) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object');
  }

  const fn = (key: string, value: unknown): string => {
    if (isArray(value)) {
      return value.map((v, k) => fn(`${key}[${k}]`, v)).join('&');
    }

    if (isPlainObject(value)) {
      const list = Object.entries(value);
      return list.map(([k, v]) => fn(`${key}[${k}]`, v)).join('&');
    }

    return `${key}=${encodeURIComponent(String(value))}`;
  };

  return Object.entries(data).reduce((acc, [key, value], index, arr) => {
    const isLastItem = index !== arr.length - 1;
    acc += `${fn(key, value)}${isLastItem ? '&' : ''}`;

    return acc;
  }, '');
}
