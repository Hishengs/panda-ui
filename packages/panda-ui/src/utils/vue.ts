import { createApp, nextTick as _nextTick, App } from 'vue';

// new Vue()
export const newVue = (options: any[]) => createApp(options);
// Vue.extend
export const vueExtend: any = function (options: any[]) {
  return function VueApp(_options: any[]) {
    return createApp(Object.assign(options, _options));
  };
};
// Vue.prototype.$isServer
export const isServer = typeof window === undefined;
// Vue.nextTick
export const nextTick = (...args: any[]) => _nextTick(...args);
// Vue.prototype
export const setVueProto = function (app: App, key: string, val: any) {
  app.config.globalProperties[key] = val;
};
