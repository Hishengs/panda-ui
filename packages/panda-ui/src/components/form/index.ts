import type { App } from 'vue';
import './form.scss';
import Form from './Form.vue';
import FormItem from './FormItem.vue';

Form.install = function (app: App) {
  app.component(Form.name, Form);
  app.component(FormItem.name, FormItem);
};

export { Form, FormItem };

export default Form;
