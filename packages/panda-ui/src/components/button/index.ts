import { App } from 'vue';
import './button.scss';
import Button from './Button.vue';

Button.install = function (app: App) {
  app.component(Button.name, Button);
};

export default Button;
