class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.cause = 'fcff';
  }
}

export function take<T>(list: T[], num: number = 1): T[] {
  if (!Array.isArray(list) || typeof num !== 'number' || !Number.isInteger(num)) {
    throw new ValidationError('bad value');
  }

  return list.slice(0, num);
}
