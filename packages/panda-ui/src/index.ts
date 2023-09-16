import type { App } from 'vue';
import Alert from './components/alert';
import Announcement from './components/announcement';
import Badge from './components/badge';
import BottomSheet from './components/bottom-sheet';
import Button from './components/button';
import Carousel from './components/carousel';
import Checkbox from './components/checkbox';
import Counter from './components/counter';
import DatePicker from './components/date-picker';
import Form from './components/form';
import Grid from './components/grid';
import Icon from './components/icon';
import Input from './components/input';
import Markdown from './components/markdown';
import Poptip from './components/poptip';
import Select from './components/select';
import * as locale from './locale';
import { defineComponent } from './utils/define';

const version = __VERSION__;

const components: any = {
  Alert,
  Announcement,
  BottomSheet,
  Badge,
  Button,
  Carousel,
  Checkbox,
  Counter,
  DatePicker,
  Form,
  Grid,
  Icon,
  Input,
  Markdown,
  Poptip,
  Select,
};

function install(app: App, opts: any = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  Object.keys(components).forEach((key) => {
    defineComponent(components[key]);
    app.use(components[key]);
  });
}

export {
  version,
  locale,
  Alert,
  Announcement,
  Badge,
  BottomSheet,
  Button,
  Carousel,
  Checkbox,
  Counter,
  DatePicker,
  Form,
  Grid,
  Icon,
  Input,
  Markdown,
  Poptip,
  Select,
};

export default {
  version,
  locale,
  install,
  ...components,
};
