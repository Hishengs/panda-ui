---
title: Carousel 轮播（走马灯）
lang: zh-CN
---

<script setup>
import { ref } from 'vue'
import { Carousel, CarouselItem } from '../../panda-ui/src/components/carousel'
import { Row, Col } from '../../panda-ui/src/components/grid'
import Icon from '../../panda-ui/src/components/icon';

defineOptions({
  components: {
    'panda-carousel': Carousel,
    'panda-carousel-item': CarouselItem,
    'panda-row': Row,
    'panda-col': Col,
    'panda-icon': Icon
  }
});

const currentIndex = ref(0);
const images = [
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/zft7j419jc603u2lotpr.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/t0uync7f8lgu4n3lxx8z.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/yf6bf96kusvgjz3jb9br.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/wwtoc1tuhxt3cxmtizwq.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/tpvxtthjf32vdsgzwqe4.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/xp4mcluv0zrab0qvpzgp.webp',
  'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_750,h_420/activities/drjr3njrvictphdpxkxx.webp'
];

const slideTo = (i) => {
  // this.$refs.carousel.slideTo(i);
}
const onChange = (val) => {
  console.log('>>> onChange', val);
}
</script>

# Carousel 轮播（走马灯）

## 默认

<panda-carousel @change="onChange">
<panda-carousel-item
v-for="(item, index) in 8"
:key="index"

>

    <div class="panda-carousel-demo-item">{{ index }}</div>

  </panda-carousel-item>
</panda-carousel>

## 控制器位置

<panda-carousel :controllers-outside="false">
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## 自定义控制器

<panda-carousel :controllers-outside="false">
  <button slot="prev" class="ctrl-btn" slot-scope="{ disabled }">
    <panda-icon type="icon_navigation_chevron_left_xs" :size="20"></panda-icon>
  </button>
  <button slot="next" class="ctrl-btn" slot-scope="{ disabled }">
    <panda-icon type="icon_navigation_chevron_right_xs" :size="20"></panda-icon>
  </button>
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## 指示器位置

<panda-carousel :indicators-outside="true">
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## 指示器类型

> 通过 `indicators-type` 更改指示器类型

<panda-carousel indicators-type="number">
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## 自定义指示器

<!-- <panda-carousel ref="carousel">
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
  <ul class="my-indicators" slot="indicators" slot-scope="{ items, current }">
    <li v-for="(item,i) in items" :class="{
      'current-item': i === current
    }" @click="slideTo(i)"></li>
  </ul>
</panda-carousel> -->

## 隐藏控制器

<panda-carousel hide-controllers>
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## 隐藏控制器与指示器

<panda-carousel hide-controllers hide-indicators autoplay>
  <panda-carousel-item
    v-for="(item, index) in 8"
    :key="index"
  >
    <div class="panda-carousel-demo-item">{{ index }}</div>
  </panda-carousel-item>
</panda-carousel>

## Size 配置

<div style="width: 375px; height: 250px; margin: 0 auto;">
  <panda-carousel size="small" hide-controllers autoplay loop>
    <panda-carousel-item
      v-for="(item, index) in 8"
      :key="index"
    >
      <div class="panda-carousel-demo-item">{{ index }}</div>
    </panda-carousel-item>
  </panda-carousel>
</div>

数字指示器

<div style="width: 375px; height: 250px; margin: 0 auto;">
  <panda-carousel size="small" hide-controllers autoplay loop indicators-type="number">
    <panda-carousel-item
      v-for="(item, index) in 8"
      :key="index"
    >
      <div class="panda-carousel-demo-item">{{ index }}</div>
    </panda-carousel-item>
  </panda-carousel>
</div>

## 示例

<h4>示例1</h4>
<panda-carousel :autoplay="false" style="max-width: 750px; margin: 0 auto;">
  <panda-carousel-item
    v-for="(img, index) in images"
    :key="index"
  >
    <img :src="img" style="display: block; width: 100%;" />
  </panda-carousel-item>
</panda-carousel>

<style lang="scss">
  .panda-carousel-demo-item {
    height: 260px;
    background-color: #fa541c;
    border-radius: 2px;
    color: white;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.12);
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .my-indicators {
    list-style: none;
    margin: 0 !important;
    li {
      display: inline-block;
      width: 15px;
      height: 3px;
      background-color: white;
      opacity: .7;
      margin: 0 6px;
      transition: width .3s ease-in-out;
      cursor: pointer;
    }
    li.current-item {
      opacity: 1;
      width: 25px;
    }
  }
</style>

## Carousel Props

| 参数                | 介绍                       | 类型            | 可选值             | 默认值 |
| ------------------- | -------------------------- | --------------- | ------------------ | ------ |
| active              | 激活下标，可通过 sync 绑定 | Number          | -                  | 0      |
| loop                | 是否循环显示               | Boolean         | -                  | true   |
| autoplay            | 是否自动切换               | Boolean         | -                  | true   |
| autoplay-interval   | 自动切换间隔时间(ms)       | Number          | -                  | 5000   |
| indicators-type     | 指示器类型                 | String          | dot, number        | dot    |
| indicators-outside  | 将指示器外置               | Boolean         | -                  | false  |
| indicators-trigger  | 指示器切换的触发方式       | Strinig         | click, hover, none | click  |
| hide-indicators     | 隐藏指示器                 | Boolean         | -                  | false  |
| controllers-outside | 将控制器外置               | Boolean         | -                  | true   |
| hide-controllers    | 隐藏控制器                 | Boolean         | -                  | false  |
| size                | 尺寸                       | Strinig         | small              | -      |
| height              | 高度                       | Strinig, Number | -                  | -      |

## Carousel Events

| 名称   | 介绍           | 参数    |
| ------ | -------------- | ------- |
| change | 激活下标改变时 | (index) |

## Carousel Slot

| 插槽名称   | 介绍   | 参数(slot-scope)     | 参数说明                             |
| ---------- | ------ | -------------------- | ------------------------------------ |
| default    | -      | -                    | -                                    |
| prev       | 上一项 | \{ disabled, \}      | disabled: 是否禁用                   |
| next       | 下一项 | \{ disabled, \}      | disabled: 是否禁用                   |
| indicators | 指示器 | \{ items, current \} | items: 指示器项，current: 当前项下标 |

## Carousel API

| 方法                   | 介绍             | 参数说明 |
| ---------------------- | ---------------- | -------- |
| prev()                 | 上一项           | -        |
| next()                 | 下一项           | -        |
| slideTo(index: Number) | 切换到指定下标项 | -        |
