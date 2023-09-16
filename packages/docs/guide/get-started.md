---
title: Get Started 起步
lang: zh-CN
layout: doc
---

<script setup>
import Alert from '../../panda-ui/src/components/alert';

defineOptions({
  components: {
    'panda-alert': Alert
  }
});
</script>

# Get Started

**Panda UI** is an UI component framework for Vue.js technically, but it is also a design system that helps you to build **Intuitive**, **Efficient**, **Simplified** applications.

There are <Badge type="tip" text="45+" /> components totally, and will be migrated gradually from <Badge type="info" text="vue2" /> to <Badge type="info" text="vue3" />, document will be completed later...

## Install

<panda-alert type="warning">
Note: <strong>panda-ui</strong> is currently not a released npm package, because there still things to do, it will be released when it's ready, maybe with another name.
</panda-alert>

```bash
npm install panda-ui -S
```

with CDN

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/panda-ui/dist/panda-ui.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="//unpkg.com/panda-ui/dist/panda-ui.js"></script>
</head>
```

## How to use

```ts
import { createApp } from 'vue';
import PandaUI from 'panda-ui';
import 'panda-ui/dist/panda-ui.css';
import App from './App.vue';

const app = createApp(App);

app.use(PandaUI);
app.mount('#app');
```

## Global config

```ts
import { createApp } from 'vue';
import PandaUI from 'panda-ui';
import 'panda-ui/dist/panda-ui.css';
import App from './App.vue';

const app = createApp(App);

// set config globally
app.use(PandaUI, {
  size: 'small',
});
app.mount('#app');
```
