import type { App } from 'vue';
import './link.scss';
import Link from './Link.vue';

Link.install = function (app: App) {
  app.component(Link.name, Link);
};

export { Link };

export default Link;
