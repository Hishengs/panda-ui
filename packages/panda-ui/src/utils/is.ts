// all is-like check function put here

export function isObject(val: any): boolean {
  return val !== null && val && typeof val === 'object' && !Array.isArray(val);
}

export function isPromise(val: any): boolean {
  return val && typeof val.then === 'function';
}

export function isNullish(val: any): boolean {
  return val === undefined || val === null;
}

export function isTypeOf(val: any, type: string) {
  type = type.toLowerCase();
  return (
    type === Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
  );
}
