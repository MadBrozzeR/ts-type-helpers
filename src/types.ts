export type ValueOf<T extends object> = T[keyof T];
export type Any = any;

export type Path<T> =
  T extends Array<unknown>
    ? `${number}` | `${number}.${Path<T[number]>}`
    : T extends object
      ? {
          [K in Exclude<keyof T, symbol>]: K extends string | number
            ? `${K}` | `${K}.${Path<T[K]>}`
            : never;
        }[Exclude<keyof T, symbol>]
      : never;

export type ArrayPath<T, P extends string = Path<T>> = P extends never
  ? never
  : {
      [K in P]: DeepIndex<T, K> extends Array<unknown> ? K : never;
    }[P];

export type Idx<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? number extends keyof T
      ? T[number]
      : never
    : never;

export type DeepIndex<T, K extends string> = T extends object
  ? K extends `${infer F}.${infer R}`
    ? DeepIndex<Idx<T, F>, R>
    : Idx<T, K>
  : never;

export type StringKeysOf<T> = T extends object
  ? {
      [K in Exclude<keyof T, symbol>]: K extends string ? `${K}` : never;
    }[Exclude<keyof T, symbol>]
  : never;

export type StringUnionAsObject<T extends string> = {
  [K in T]: K;
};

export type ObjectKeysAsDelimitedString<T extends object, D extends string> = {
  [K in Exclude<keyof T, symbol>]:
    | `${K}`
    | `${K}${D}${ObjectKeysAsDelimitedString<Omit<T, K>, D>}`;
}[Exclude<keyof T, symbol>];

export type DelimitedString<T extends string, D extends string> =
  ObjectKeysAsDelimitedString<StringUnionAsObject<T>, D>;
