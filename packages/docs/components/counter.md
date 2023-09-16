---
title: Counter 计数器
lang: zh-CN
---

<script lang="ts">
import Counter from '../../panda-ui/src/components/counter';

export default {
  components: {
    'panda-counter': Counter,
  },
  data () {
    return {
      val1: 0,
      val2: 0,
      val3: 0,
      val4: 0,
      val5: 0,
    };
  },
  methods: {
    onChange (val) {
      console.log('>>> onChange', val);
    },
    onFocus (e) {
      console.log('>>> onFocus', e);
    },
    onBlur (e) {
      console.log('>>> onBlur', e);
    },
  }
};
</script>


# Counter 计数器

常用于数量跨度不大的选择性场景

## 基础

<panda-counter v-model="val1" @change="onChange" @focus="onFocus" @blur="onBlur"></panda-counter>

## 类型

<p>默认</p>
<panda-counter v-model="val5"></panda-counter>
<p>primary</p>
<panda-counter v-model="val5" type="primary"></panda-counter>

## 禁用

<panda-counter v-model="val1" disabled></panda-counter>
<panda-counter v-model="val1" disabled type="primary"></panda-counter>

## 只读

<panda-counter v-model="val1" readonly></panda-counter>

## 尺寸大小

<panda-counter v-model="val1" @change="onChange" size="small"></panda-counter>
<panda-counter v-model="val1" @change="onChange" size="small" type="primary"></panda-counter>

## 最大最小值

<panda-counter v-model="val2" :min="-2" :max="20" @change="onChange"></panda-counter>

## 步进

<panda-counter v-model="val3" @change="onChange" :step=".3"></panda-counter>

## 精度

<panda-counter v-model="val4" @change="onChange" :step="0.03" :precision="2"></panda-counter>

<style scoped>
  .panda-counter {
    margin-right: 30px;
  }
</style>

## Counter Props

| 参数      | 介绍                | 类型    | 可选值 | 默认值   |
| --------- | ------------------- | ------- | ------ | -------- |
| value     | 可通过 v-model 绑定 | Number  | —      | 0        |
| size      | 尺寸                | String  | small  | -        |
| disabled  | 是否禁用            | Boolean | —      | false    |
| readonly  | 是否只读            | Boolean | —      | false    |
| min       | 最小值              | Number  | —      | 0        |
| max       | 最大值              | Number  | —      | Infinity |
| step      | 步进                | Number  | —      | —        |
| precision | 精度                | Number  | —      | —        |
| autofocus | 是否自动聚焦        | Boolean | —      | false    |

<!-- | placeholder | 输入框默认 placeholder | String | — | — | -->

## Counter Events

| 名称           | 介绍                        | 参数                |
| -------------- | --------------------------- | ------------------- |
| change         | 值改变时触发                | (value)             |
| increase       | 点击递增按钮时触发          | (value)             |
| decrease       | 点击递减按钮时触发          | (value)             |
| focus          | 在组件 Input 获得焦点时触发 | (event: Event)      |
| blur           | 在组件 Input 失去焦点时触发 | (event: Event)      |
| disabled-click | 按钮禁用时点击触发          | (button: 'increase' \| 'decrease') |
