import type { App } from 'vue';
import './select.scss';
import Select from './Select.vue';
import Option from './Option.vue';
import OptionGroup from './OptionGroup.vue';

Select.install = function (app: App) {
  app.component(Select.name, Select);
  app.component(Option.name, Option);
  app.component(OptionGroup.name, OptionGroup);
};

export { Select, Option, OptionGroup };

export default Select;
