export function debounce(func: (...args: unknown[]) => void, ms: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: unknown[]) {
    clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), ms);
  };
}
