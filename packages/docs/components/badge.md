---
title: Badge 红点提示
lang: zh-CN
---

<script setup>
import Badge from '../../panda-ui/src/components/badge'

defineOptions({
  components: {
    'panda-badge': Badge,
  }
});
</script>

# Badge 红点提示

`panda-badge` 可以配合图标、按钮、列表等组件使用，用于标记一些数字和文字

## Default 默认

<div class="demo-wrapper">
  <panda-badge :value="-101"><panda-button type="secondary">评论</panda-button></panda-badge>
  <panda-badge :value="32"><panda-button type="outlined">回复</panda-button></panda-badge>
  <panda-badge :value="100"><panda-button type="primary">点赞</panda-button></panda-badge>
  <panda-badge :value="100"><span style="display: inline-block; padding: 5px;">Text</span></panda-badge>
  <panda-badge :value="100"><panda-icon type="icon_communication_email" size="24"></panda-icon></panda-badge>
</div>

## Dot 小圆点

demo

<panda-badge is-dot><panda-icon type="icon_communication_email" size="24"></panda-icon></panda-badge>
<panda-badge is-dot><panda-button type="outlined">回复</panda-button></panda-badge>
<panda-badge is-dot><span style="display: inline-block; padding: 3px;">Text</span></panda-badge>

## Use alone 单独使用

<div class="demo-wrapper">
  <panda-badge is-dot></panda-badge>
  <panda-badge :value="32"></panda-badge>
  <panda-badge value="new"></panda-badge>
</div>

## Color 颜色

<div class="demo-wrapper">
  <panda-badge is-dot color="#eb4221"></panda-badge>
  <panda-badge is-dot color="#4985e6"></panda-badge>
  <panda-badge is-dot color="#ff9d26"></panda-badge>
  <panda-badge is-dot color="#16aa77"></panda-badge>
  <panda-badge :value="1" color="#4985e6"><panda-button type="secondary">评论</panda-button></panda-badge>
  <panda-badge :value="32" color="#ff9d26"><panda-button type="outlined">回复</panda-button></panda-badge>
  <panda-badge :value="100" color="#16aa77"><panda-button type="primary">点赞</panda-button></panda-badge>
</div>

## With Text 文字

<div class="demo-wrapper">
  <panda-badge value="new"><panda-button type="secondary">隆江猪脚饭</panda-button></panda-badge>
  <panda-badge value="新品"><panda-button type="outlined">兰州拉面</panda-button></panda-badge>
  <panda-badge value="折扣"><panda-button type="primary">沙县蒸饺</panda-button></panda-badge>
  <panda-badge value="折扣"><panda-button type="outlined">麦当劳饭</panda-button></panda-badge>
</div>

## Badge Props

| 参数   | 介绍                             | 类型           | 可选值 | 默认值 |
| ------ | -------------------------------- | -------------- | ------ | ------ |
| value  | 徽章的内容                       | String, Number | —      | —      |
| min    | 最小显示数字，value 为数字时有效 | Number         | —      | 1      |
| max    | 最大显示数字，value 为数字时有效 | Number         | —      | 99     |
| color  | 徽章的颜色                       | String         | —      | —      |
| is-dot | 徽章是否为圆点                   | Boolean        | —      | false  |
| hidden | 徽章是否为隐藏                   | Boolean        | —      | false  |

## Badge Slots

| 名称    | 介绍       |
| ------- | ---------- |
| content | 徽章的内容 |
| default | —          |

<style lang="scss" scoped>
.panda-badge {
  margin-right: 70px;
}
</style>
