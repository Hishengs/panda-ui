import type { App } from 'vue';
import './grid.scss';
import Row from './Row.vue';
import Col from './Col.vue';

const Grid: {
  install?: (app: App) => void;
} = {};

Grid.install = function (app: App) {
  app.component(Row.name, Row);
  app.component(Col.name, Col);
};

export { Row, Col };
export default Grid;
