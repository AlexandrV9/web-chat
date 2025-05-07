import { cloneDeep } from '../cloneDeep';

function omit<T extends object>(obj: T, fields: (keyof T)[]): Omit<T, (typeof fields)[0]> {
  const shallowCopy = cloneDeep(obj) as T;

  for (const key of fields) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      delete shallowCopy[key];
    }
  }

  return shallowCopy;
}

export default omit;
