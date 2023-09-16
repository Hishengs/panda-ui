import type { App } from 'vue';
import './markdown.scss';
import Markdown from './Markdown.vue';

Markdown.install = function (app: App) {
  app.component(Markdown.name, Markdown);
};

export { Markdown };

export default Markdown;
