import { PlainObject } from '@/types';
import { mergeTwoObjects } from '../mergeTwoObjects';

export function setValueInObjectByPath(object: PlainObject | unknown, path: string, value: unknown): PlainObject | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<PlainObject>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as PlainObject,
  );

  return mergeTwoObjects(object as PlainObject, result);
}
