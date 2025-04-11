import { PlainObject } from '@/types';

const convertKeyObjToCamelCase = (key: string) => {
  const arr = key.split('_');
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    result += arr[i][0].toUpperCase() + arr[i].slice(1);
  }

  return result;
};

export const convertObjKeysToCamelCase = (obj: PlainObject) => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = convertKeyObjToCamelCase(key);
    acc[newKey] = obj[key];
    return acc;
  }, {} as PlainObject);
};
