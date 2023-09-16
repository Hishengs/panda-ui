import type { App } from 'vue';
import './alert.scss';
import Alert from './Alert.vue';

Alert.install = function (app: App) {
  app.component(Alert.name, Alert);
};

export default Alert;
