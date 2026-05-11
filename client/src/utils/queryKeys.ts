export function stableStringify<T extends Record<string, unknown>>(
  obj: T,
): string {
  return JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce(
        (acc, key) => {
          const value = obj[key];
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      ),
  );
}
