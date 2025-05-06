import { isArray, isPlainObject } from '../_common';

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

export function classNames(...args: unknown[]): string {
  const classes = [];

  for (let i = 0; i < args.length; i++) {
    const item = args[i];

    if (isPlainObject(item)) {
      if (item.toString !== Object.prototype.toString) {
        classes.push(item.toString());
      } else {
        Object.keys(item)
          .filter(key => Boolean(item[key]))
          .forEach(key => classes.push(key));
      }
    } else if (isArray(item)) {
      const value = classNames(...item);
      if (value) {
        classes.push(value);
      }
    } else if (item) {
      const value = String(item).trim();
      if (value) {
        classes.push(value);
      }
    }
  }

  return classes.join(' ');
}
