import { App } from 'vue';
import DatePicker from './DatePicker.vue';
import './date-picker.scss';

DatePicker.install = function (app: App) {
  app.component(DatePicker.name, DatePicker);
};

export {
  DatePicker,
};

export default DatePicker;
