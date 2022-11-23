export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.keys(obj)
      .filter((k) => !keys.includes(k as K))
      .map((k) => [k, obj[k as keyof T]]),
  ) as Omit<T, K>;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return Object.fromEntries(
    Object.keys(obj)
      .filter((k) => keys.includes(k as K))
      .map((k) => [k, obj[k as keyof T]]),
  ) as Pick<T, K>;
}

export function map<S, T>(
  obj: Record<string, S>,
  fn: (value: [string, S], index: number, array: S[]) => [string, T],
): Record<string, T> {
  return Object.fromEntries(Object.entries(obj).map(fn as any));
}
