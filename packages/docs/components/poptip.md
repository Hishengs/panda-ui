---
title: Poptip 弹出框
lang: zh-CN
---

<script setup>
import { ref } from 'vue'
import Button from '../../panda-ui/src/components/button'
import Poptip from '../../panda-ui/src/components/poptip'
import { Row, Col } from '../../panda-ui/src/components/grid'

defineOptions({
  components: {
    'panda-button': Button,
    'panda-poptip': Poptip,
    'panda-row': Row,
    'panda-col': Col
  }
});

const date = ref(new Date());
const show = ref(false);
</script>

# Poptip 弹出框

用于描述被指向的对象（图标、图形、文字）信息的提示气泡，非阻碍式信息提示，它不打断用户当前操作

### 默认

<panda-poptip content="Your details are safe with us. ">
  <panda-button type="primary">查看内容</panda-button>
</panda-poptip>
<panda-poptip title="Panda Price Guarantee">
  <panda-button type="primary">带标题</panda-button>
  <template #content>
    <p>
      Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!
    </p>
  </template>
</panda-poptip>
<panda-poptip content="Your details are safe with us. " :arrow="false">
  <panda-button type="primary">无箭头</panda-button>
</panda-poptip>

<!-- 用于测试 -->
<!-- ### 多层嵌套


<panda-poptip closable>
  <panda-button type="primary">查看内容1</panda-button>
  <template #content>
    <panda-poptip placement="top-start">
      <panda-button type="primary">查看内容2</panda-button>
      <template #content>
        <panda-poptip content="Your details are safe with us. " placement="top-end">
          <panda-button type="primary">查看内容3</panda-button>
        </panda-poptip>
      </template>
    </panda-poptip>
  </template>
</panda-poptip>

 -->

### Dark 暗黑

<panda-poptip content="Your details are safe with us. " dark>
  <panda-button type="primary">查看内容</panda-button>
</panda-poptip>
<panda-poptip title="Panda Price Guarantee" dark trigger="click">
  <panda-button type="primary">带标题</panda-button>
  <template #content>
    <p>
      Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference!
    </p>
  </template>
</panda-poptip>

### 触发方式

<panda-poptip title="This is title" content="Your details are safe with us. ">
  <panda-button type="primary">hover</panda-button>
</panda-poptip>
<panda-poptip title="Panda Price Guarantee" content="Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click">
  <panda-button type="primary">click</panda-button>
</panda-poptip>
<panda-poptip title="This is title" content="Your details are safe with us. " trigger="focus">
  <panda-button type="primary">focus</panda-button>
</panda-poptip>
<panda-poptip title="This is title" content="Your details are safe with us. " trigger="focus">
  <panda-input placeholder="focus 触发" value=""></panda-input>
</panda-poptip>
<panda-button type="primary" @click="show=!show">
手动激活右侧 Poptip
</panda-button>
<panda-poptip content="Your details are safe with us. " v-model="show" trigger="none">
  <panda-button type="primary">查看内容</panda-button>
</panda-poptip>

### 可关闭

<panda-poptip title="This is title" content="Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click" closable>
  <panda-button type="primary">可关闭</panda-button>
</panda-poptip>
<panda-poptip content="Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference!Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference! Find a cheaper ticket, tour or activity and we'll refund Double the difference!" trigger="click" closable dark>
  <panda-button type="primary">可关闭(Dark)</panda-button>
</panda-poptip>
<!-- <panda-poptip trigger="click" closable placement="top-start">
  <template #content>
    <panda-poptip content="Your details are safe with us. " trigger="click" closable placement="top">
      <panda-button type="primary">查看内容</panda-button>
    </panda-poptip>
  </template>
  <panda-button type="primary">可关闭</panda-button>
</panda-poptip> -->

### 方向

支持 12 个方向

<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="top-start">
    <panda-button type="primary">Top Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="top">
    <panda-button type="primary">Top</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="top-end">
    <panda-button type="primary">Top End</panda-button>
  </panda-poptip>
</div>

<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="left-start">
    <panda-button type="primary">Left Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="left">
    <panda-button type="primary">Left</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="left-end">
    <panda-button type="primary">Left End</panda-button>
  </panda-poptip>
</div>
<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="right-start">
    <panda-button type="primary">Right Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="right">
    <panda-button type="primary">Right</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="right-end">
    <panda-button type="primary">Right End</panda-button>
  </panda-poptip>
</div>
<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="bottom-start">
    <panda-button type="primary">Bottom Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="bottom">
    <panda-button type="primary">Bottom</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="bottom-end">
    <panda-button type="primary">Bottom End</panda-button>
  </panda-poptip>
</div>

dark

<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="top-start" dark>
    <panda-button type="primary">Top Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="top" dark>
    <panda-button type="primary">Top</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="top-end" dark>
    <panda-button type="primary">Top End</panda-button>
  </panda-poptip>
</div>
<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="left-start" dark>
    <panda-button type="primary">Left Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="left" dark>
    <panda-button type="primary">Left</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="left-end" dark>
    <panda-button type="primary">Left End</panda-button>
  </panda-poptip>
</div>
<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="right-start" dark>
    <panda-button type="primary">Right Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="right" dark>
    <panda-button type="primary">Right</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="right-end" dark>
    <panda-button type="primary">Right End</panda-button>
  </panda-poptip>
</div>
<div class="poptip-placement">
  <panda-poptip content="Your details are safe with us. " placement="bottom-start" dark>
    <panda-button type="primary">Bottom Start</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="bottom" dark>
    <panda-button type="primary">Bottom</panda-button>
  </panda-poptip>
  <panda-poptip content="Your details are safe with us. " placement="bottom-end" dark>
    <panda-button type="primary">Bottom End</panda-button>
  </panda-poptip>
</div>

## Poptip Props

| 参数           | 介绍                          | 类型           | 可选值                                                                                                                          | 默认值 |
| -------------- | ----------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| value          | 是否显示，可通过 v-model 控制 | Boolean        | —                                                                                                                               | false  |
| title          | 标题                          | String         | —                                                                                                                               | -      |
| content        | 内容                          | String         | —                                                                                                                               | —      |
| placement      | 弹出位置                      | String         | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | top    |
| trigger        | 触发方式                      | String         | hover, click, focus, none                                                                                                       | hover  |
| offset         | 偏移                          | Number / Array | 数组 `[x,y]` 表示两个方向的偏移                                                                                                 | 10     |
| width          | popper 宽度                   | Number         | —                                                                                                                               | -      |
| max-width      | popper 最大宽度               | Number         | —                                                                                                                               | 360    |
| height         | popper 高度                   | Number         | —                                                                                                                               | -      |
| max-height     | popper 最大高度               | Number         | —                                                                                                                               | 168    |
| closable       | 可关闭                        | Boolean        | —                                                                                                                               | false  |
| z-index        | popper 层级                   | Number         | —                                                                                                                               | -      |
| dark           | 黑色风格                      | Boolean        | —                                                                                                                               | false  |
| append-to-body | 附加到 body                   | Boolean        | —                                                                                                                               | false  |

## Poptip Slots

| 参数    | 介绍 | 类型 | 可选值 | 默认值 |
| ------- | ---- | ---- | ------ | ------ |
| content | 内容 | Slot | —      | -      |

## Poptip API

| 方法 | 介绍 | 参数说明 |
| ---- | ---- | -------- |
| show | 显示 | —        |
| hide | 隐藏 | —        |

## Poptip Events

| 参数 | 介绍          | 回调参数 |
| ---- | ------------- | -------- |
| show | Poptip 显示时 | —        |
| hide | Poptip 隐藏时 | —        |

<style lang="scss" scoped>
  .panda-poptip {
    margin: 10px;
    p {
      margin: 0;
    }
  }
  .poptip-placement {
    margin: 0 auto;
    width: 500px;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    .panda-button {
      width: 150px;
    }
  }
</style>
