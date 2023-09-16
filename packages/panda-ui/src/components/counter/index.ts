import { App } from 'vue';
import './counter.scss';
import Counter from './Counter.vue';

Counter.install = function (app: App) {
  app.component(Counter.name, Counter);
};

export {
  Counter
};

export default Counter;
