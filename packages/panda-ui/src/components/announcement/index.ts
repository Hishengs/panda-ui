import type { App } from 'vue';
import './announcement.scss';
import Announcement from './Announcement.vue';

Announcement.install = function (app: App) {
  app.component(Announcement.name, Announcement);
};

export default Announcement;
