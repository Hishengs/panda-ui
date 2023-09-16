import { isServer as $isServer } from './vue';

export const isServer = $isServer;

const camelizeRE = /-(\w)/g;
export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const hyphenateRE = /\B([A-Z])/g;
export function hyphenate(str: string): string {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}

export function convertHexToRGB(color: string, opacity = 1) {
  if (color.length === 4) {
    let extendedColor = '#';
    for (let i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    color = extendedColor;
  }

  const values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16),
  };

  return `rgb(${values.r}, ${values.g}, ${values.b}, ${opacity})`;
}
