export function createNamespaceClass(ns: string) {
  function cls() {
    return ns;
  }
  cls.join = (str: string) => `${ns}-${str}`;
  cls.joinIf = (str: string, ifExp: boolean) => (ifExp ? `${ns}-${str}` : '');
  return cls;
}
