import { PlainObject } from '@/types';

export function mergeTwoObjects(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = mergeTwoObjects(lhs[p] as PlainObject, rhs[p] as PlainObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
