export function trim(target: string, str = 's \xA0') {
  return target.replace(new RegExp(`^[${str}]+|[\\s${str}]+$`, 'gi'), '');
}
