export function unzip(...args: number[][]): number[][] {
  const maxLength = args.reduce((result, arg) => {
    if (!Array.isArray(arg)) {
      throw new Error(`${arg} is not array`);
    }

    return Math.max(result, arg.length);
  }, 0);

  return [...Array(maxLength)].map((_, index) => {
    return args.map(arg => arg[index]);
  });
}

