// Zaimplementuj typ MergeableObject z wykorzystaniem typów wbudowanych - Exclude i NonNullable.

// In my opinion using "NonNullable" is not necessary here, because "extends object" already excludes null and undefined.
type MergeableObject<T> = T extends object ? Exclude<T, Function | any[]> : never;

export function mergeObjects<T, U>(obj1: MergeableObject<T>, obj2: MergeableObject<U>): T & U {
  const merged = { ...obj1, ...obj2 };
  console.log(merged);
  return merged;
}
