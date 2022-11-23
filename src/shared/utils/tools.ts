export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  return Object.fromEntries(
    Object.keys(obj)
      .filter((k) => !keys.includes(k as K))
      .map((k) => [k, obj[k as keyof T]]),
  ) as Omit<T, K>;
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return Object.fromEntries(
    Object.keys(obj)
      .filter((k) => keys.includes(k as K))
      .map((k) => [k, obj[k as keyof T]]),
  ) as Pick<T, K>;
}
