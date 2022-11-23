export function switchAssign<
  V extends string | number | null | undefined,
  M extends Record<Exclude<V, null | undefined>, unknown>,
>(
  value: V,
  map: M,
  fallback?: M[Exclude<typeof value, null | undefined>],
): M[Exclude<typeof value, null | undefined>] | undefined {
  if (value == null) {
    return fallback;
  } else {
    return map[value as Exclude<typeof value, null | undefined>];
  }
}

export function switchExec<
  V extends string | number | null | undefined,
  M extends Record<Exclude<V, null | undefined>, (value: V) => unknown>,
>(
  value: V,
  map: M,
  fallback?: ReturnType<M[Exclude<typeof value, null | undefined>]>,
): ReturnType<M[Exclude<typeof value, null | undefined>]> | undefined {
  if (value == null) {
    return fallback;
  } else {
    const handler = map[value as Exclude<typeof value, null | undefined>];
    if (handler) {
      return handler(value) as any;
    }
  }
}

export function switchThrow<
  V extends string | number | null | undefined,
  M extends Record<Exclude<V, null | undefined>, unknown>,
>(value: V, map: M, fallback?: unknown): never | void {
  if (value == null) {
    throw fallback;
  } else {
    const reason = map[value as Exclude<typeof value, null | undefined>];
    if (reason) {
      throw reason;
    }
    if (fallback) {
      throw fallback;
    }
  }
}
