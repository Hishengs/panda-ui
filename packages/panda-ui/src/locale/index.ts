// import deepmerge from 'deepmerge';
import Format from './format';
import defaultLang from './lang/en.json';

type Lang = Record<string, any>;

const format = Format();
let lang: Lang = defaultLang;
// let merged = false;

// let i18nHandler = function () {
//   const vuei18n = Object.getPrototypeOf(this || Vue).$t;
//   if (typeof vuei18n === 'function' && typeof this.$i18n.setLocaleMessage === 'function') {
//     if (!merged) {
//       merged = true;
//       this.$i18n.setLocaleMessage(
//         this.$i18n.locale,
//         deepmerge(lang, this.$i18n.getLocaleMessage(this.$i18n.locale) || {}, {clone: true})
//       );
//     }
//     return vuei18n.apply(this, arguments);
//   }
// };

let i18nHandler: Function = function (this: any) {
  // TODO
  /* const vuei18n = Object.getPrototypeOf(this).$t;
  // @ts-ignore
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      // @ts-ignore
      Vue.locale(
        // @ts-ignore
        Vue.config.lang,
        // @ts-ignore
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true }),
      );
    }
    return vuei18n.apply(this, arguments);
  } */
};

export const t = function (this: any, path: string, options: any = {}) {
  // @ts-ignore
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;
  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function (l: Lang) {
  lang = l || lang;
};

export const i18n = function (fn: Function) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
