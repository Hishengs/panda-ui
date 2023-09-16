import type { App } from 'vue';
import './switch.scss';
import Switch from './Switch.vue';

Switch.install = function (app: App) {
  app.component(Switch.name, Switch);
};

export default Switch;
