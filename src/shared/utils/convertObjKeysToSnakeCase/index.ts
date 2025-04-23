import { PlainObject } from "@/types";

export function convertObjKeysToSnakeCase<T>(obj: PlainObject): T {
  return Object.entries(obj).reduce((acc: PlainObject, [key, value]) => {
    const chars = [...key];
    chars.forEach((char, index) => {
      if (char === char.toUpperCase()) {
        chars[index] = chars[index].toLowerCase();
        chars.splice(index, 0, '_');
      }
    });

    acc[chars.join('')] = value;
    return acc;
  }, {}) as T;
}
