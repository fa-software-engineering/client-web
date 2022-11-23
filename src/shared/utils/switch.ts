export function switchAssign<V extends string | number, R, F = undefined>(
  value: V | null,
  map: Record<V, R>,
  fallback?: F,
): R | F {
  if (value != null && map[value]) {
    return map[value];
  } else {
    return fallback as F;
  }
}

export function switchExec<
  V extends string | number,
  R extends (...args: any[]) => any,
  F = undefined,
>(value: V | null, map: Record<V, R>, fallback?: F): ReturnType<R> | F {
  if (value != null && map[value]) {
    return map[value](value);
  } else {
    return fallback as F;
  }
}

export function switchThrow<V extends string | number, R, F = undefined>(
  value: V | null,
  map: Record<V, R>,
  fallback?: F,
): never | void {
  if (value != null && map[value]) {
    throw map[value];
  } else if (fallback) {
    throw fallback;
  }
}
