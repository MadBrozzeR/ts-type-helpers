import type { ValueOf } from './types';

export const isKeyOf = <T extends object>(key: string | number | symbol, object: T): key is keyof T => key in object;
export const isValueOf = <T extends object>(value: T[keyof T], object: T): value is ValueOf<T> => {
  for (let key in object) {
    if (object[key] === value) {
      return true;
    }
  }

  return false;
};
