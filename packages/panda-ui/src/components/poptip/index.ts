import type { App } from 'vue';
import './poptip.scss';
import Poptip from './Poptip.vue';

Poptip.install = function (app: App) {
  app.component(Poptip.name, Poptip);
};

export default Poptip;
