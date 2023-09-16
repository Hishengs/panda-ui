import type { App } from 'vue';
import './checkbox.scss';
import Checkbox from './Checkbox.vue';
import CheckboxGroup from './CheckboxGroup.vue';

Checkbox.install = function (app: App) {
  app.component(Checkbox.name, Checkbox);
  app.component(CheckboxGroup.name, CheckboxGroup);
};

export { Checkbox, CheckboxGroup };

export default Checkbox;
