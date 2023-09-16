import { App } from 'vue';
import './badge.scss';
import Badge from './Badge.vue';

Badge.install = function (app: App) {
  app.component(Badge.name, Badge);
};

export { Badge };

export default Badge;
