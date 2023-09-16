import type { App } from 'vue';
import './icon.scss';
import Icon from './Icon.vue';
import { isServer } from '../../utils';

const ICON_URL = 'https://unpkg.com/feather-icons@4.28.0/dist/feather.min.js';

function loadIcons() {
  const s = document.createElement('script');
  s.src = ICON_URL;
  s.onload = function () {
    window.feather.replace();
  };
  document.head.append(s);
}

if (!isServer) loadIcons();

Icon.install = function (app: App) {
  app.component(Icon.name, Icon);
};

export default Icon;
