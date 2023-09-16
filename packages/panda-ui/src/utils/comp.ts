import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue';

export function getCompInitialZIndex(context: any): number {
  if (!context) return 0;
  let comp: string =
    typeof context === 'string' ? context : context.$options.name;
  comp = comp.replace('panda-', '');
  switch (comp) {
    case 'toast':
    case 'message':
      return 3000;
    case 'modal':
    case 'bottom-sheet':
    case 'drawer':
    case 'loading':
      return 2000;
    case 'notification':
      return 1200;
    case 'announcement':
      return 600;
    case 'poptip':
    case 'dropdown':
    case 'select':
      return 200;
    default:
      return 0;
  }
}

export function genUpdateCompZIndexFn(
  initalZIndex: number,
  context?: any,
): Function {
  initalZIndex = initalZIndex || getCompInitialZIndex(context);
  let index = initalZIndex;
  return function (reset = false): number {
    if (reset) {
      index = initalZIndex;
    }
    return index++;
  };
}

export function getFirstComponentChild(children: any) {
  return children && children.filter((c: any) => c && c.tag)[0];
}

// Find components upward
export function findComponentsUpward(context: any, componentName: string): any {
  let parents: any[] = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}

// Find components downward
export function findComponentsDownward(context: any, componentName: string) {
  return context.$children.reduce((components: any[], child: any) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

// Find components upward
export function findComponentUpward<T>(
  curIns: ComponentInternalInstance | null,
  componentName: string,
  componentNames?: string[],
): ComponentPublicInstance<T> | null | undefined {
  if (!curIns) return;
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }

  let parent = curIns.parent;
  let name = parent?.type.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.parent;
    if (parent) name = parent?.type.name;
  }
  return parent?.proxy as ComponentPublicInstance<T>;
}

// Find component downward
export function findComponentDownward(
  curIns: ComponentInternalInstance,
  componentName: string,
): any {
  // TODO: vue3 之后移除了 $children 支持，这个方法得重写下
  /* const childrens = curIns.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;
      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children; */
}
