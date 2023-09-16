---
title: Announcement 公告
lang: zh-CN
---

<script setup>
import { ref } from 'vue'
import Announcement from '../../panda-ui/src/components/announcement'

defineOptions({
  components: {
    'panda-announcement': Announcement,
  }
});

const content = 'This is the content of the notification ';
const content2 = content.repeat(6);
const content3 = content.repeat(12);
const link = 'https://www.google.com';
const items = ref([
  { content: content + '-1', link, },
  { content: content + '-2', link, },
  { content: content2 + '-3', link, },
  { content: content3 + '-4', link, },
]);
const detailMsg = ref('');
const showModal = ref(false);
const noLinkItems = ref(items.value.map(item => {
  return {
    content: item.content
  };
}));

const showDetail = (index) => {
  detailMsg.value = items.value[index].content;
  showModal.value = true;
}
</script>

# Announcement 公告

## 默认

<panda-announcement :items="items.slice(0, 1)"></panda-announcement>

## 多条轮播

<panda-announcement :items="items.slice(0, 2)"></panda-announcement>

<p></p>
<panda-announcement :items="items.slice(0, 3)"></panda-announcement>
<p></p>
<panda-announcement :items="items"></panda-announcement>

## 设置内容区域宽度

<panda-announcement :items="items" max-content-width="70%"></panda-announcement>

## 设置最多显示行数

> 默认最多显示 1 行，可配置为最多显示 3行

<panda-announcement :items="items.slice(0, 2)"></panda-announcement>

<p></p>
<panda-announcement :items="items.slice(0, 3)" :max-lines="3"></panda-announcement>
<p></p>
<panda-announcement :items="items" :max-lines="3"></panda-announcement>

## 配合弹窗显示详细消息

<panda-announcement :items="noLinkItems" @click="showDetail"></panda-announcement>

<panda-modal title="消息详情" :open.sync="showModal" @on-cancel = "showModal = false" @on-confirm = "showModal = false">

  <div class="panda-modal-content">
    {{ detailMsg }}
  </div>
</panda-modal>

<!-- ## 隐藏箭头



<panda-announcement :items="items" hide-arrow></panda-announcement>

 -->

## 固定顶部

已固定到顶部

<panda-announcement :items="items.slice(0, 2)" fixed :max-content-width="1000"></panda-announcement>

## 顶部偏移

已固定到顶部

<panda-announcement :items="items" fixed :max-content-width="1000" :offset-top="60"></panda-announcement>

## Announcement Props

| 参数              | 介绍                   | 类型              | 可选值 | 默认值 |
| ----------------- | ---------------------- | ----------------- | ------ | ------ |
| items             | 通知条目               | Array&lt;Item&gt; | —      | —      |
| max-content-width | 最大内容区域宽度       | String, Number    | —      | —      |
| fixed             | 是否固定在顶部         | Boolean           | —      | false  |
| offset-top        | fixed 时，距离顶部偏移 | Number            | —      | 0      |
| max-lines         | 最多显示行数           | Number            | 1, 3   | 1      |

<!-- | hide-arrow | 是否隐藏箭头 | Boolean | — | false | -->

js
type Item {
content: string; // 通知内容
link: string; // 通知跳转链接
}

## Announcement Events

| 名称  | 介绍           | 参数                  |
| ----- | -------------- | --------------------- |
| click | 点击通知时触发 | index: 被点击通知下标 |

<style lang="scss" scoped>
  .markdown-body {
    padding-top: 120px;
  }
</style>
