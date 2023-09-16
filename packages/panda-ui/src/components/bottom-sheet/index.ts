import type { App } from 'vue';
import './bottom-sheet.scss';
import BottomSheet from './BottomSheet.vue';

BottomSheet.install = function (app: App) {
  app.component(BottomSheet.name, BottomSheet);
};

export { BottomSheet };

export default BottomSheet;
