import { isServer } from './index';

// sniff functions

export const isIE = function (): boolean {
  return !isServer && !isNaN(Number((document as any).documentMode));
};

export const isEdge = function (): boolean {
  return !isServer && navigator.userAgent.indexOf('Edge') > -1;
};

export const isFirefox = function (): boolean {
  return !isServer && !!window.navigator.userAgent.match(/firefox/i);
};

export function isPc(): boolean {
  var uaInfo = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  var agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
  var flag = true;
  for (var i = 0; i < agents.length; i++) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export let isIOS: boolean = false,
  isAndroid: boolean = false,
  isMobile: boolean = false;

if (!isServer) {
  const UA = navigator.userAgent;
  isIOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
  isMobile = !!UA.match(/AppleWebKit.*Mobile.*/);
}
