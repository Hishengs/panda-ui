---
title: Link 文字链接
lang: zh-CN
---

<script setup>
import Link from '../../panda-ui/src/components/link'

defineOptions({
  components: {
    'panda-link': Link,
  }
});
</script>

# Link 文字链接

文字链是指在一段文本中的部分文字被作为超链接跳转到其他页面。

## 默认

<panda-link href="javascript:;">Privacy Policy</panda-link>

## 无下划线

<panda-link href="https://google.com" :underline="false">Privacy Policy</panda-link>

## 颜色

<panda-link href="https://google.com">Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#212121">Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#4a4a4a">Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#757575">Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#999999">Privacy Policy</panda-link>

## 禁用

<panda-link href="https://google.com" disabled>Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#212121" disabled>Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#4a4a4a" disabled>Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#757575" disabled>Privacy Policy</panda-link>
<panda-link href="https://google.com" color="#999999" disabled>Privacy Policy</panda-link>

## 新窗口打开

<panda-link href="https://google.com" target="_blank">Privacy Policy</panda-link>

## Link Props

| 参数      | 介绍           | 类型    | 可选值 | 默认值 |
| --------- | -------------- | ------- | ------ | ------ |
| href      | 原生 a href    | String  | —      | —      |
| target    | 原生 a target  | String  | —      | —      |
| disabled  | 是否禁用       | Boolean | —      | false  |
| color     | 链接颜色       | String  | —      | —      |
| underline | 是否显示下划线 | Boolean | —      | true   |

## Link Events

| 名称  | 介绍         | 参数 |
| ----- | ------------ | ---- |
| click | 链接被点击时 | —    |

<style scoped>
  .panda-link {
    margin-right: 10px;
  }
</style>
