import type { App } from 'vue';
import './icon.scss';
import Icon from './Icon.vue';
import { isServer } from '../../utils';

const ICON_URL = 'https://unpkg.com/feather-icons@4.28.0/dist/feather.min.js';

let script: HTMLScriptElement;

function loadIcons() {
  if (script) return;
  script = document.createElement('script');
  script.src = ICON_URL;
  script.onload = function () {
    window.feather.replace();
  };
  document.head.append(script);
}

if (!isServer) loadIcons();

Icon.install = function (app: App) {
  app.component(Icon.name, Icon);
};

export default Icon;
