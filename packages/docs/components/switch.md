---
title: Switch 开关
lang: zh-CN
---

<script setup>
import { ref, computed, reactive } from 'vue'
import Switch from '../../panda-ui/src/components/switch'
import { Row, Col } from '../../panda-ui/src/components/grid'

defineOptions({
  components: {
    'panda-switch': Switch,
    'panda-row': Row,
    'panda-col': Col
  }
});

const normal = reactive({
  checkbox: true,
  radio: 1,
  switch: false
});
const checkbox = reactive({
  value1: [],
  value2: false,
  value3: false
});
const radio = reactive({
  value1: [],
  value2: 'heart',
  value3: 'disable'
});
const switchVal = reactive({
  value1: false,
  value2: true,
  value3: false,
  value4: true
});
const tfVal = ref('');

const checkAll = computed(() => {
  return checkbox.value1.length > 0;
})

const handleCheckAll = (val) => {
  checkbox.value1 = checkAll.value && checkbox.value1.length >= 3 ? [] : ['Checkbox 1', 'Checkbox 2', 'Checkbox 3'];
}
const onChange = (val) => {
  console.log('>>> onChange', val);
}
const toggleTFVal = () => {
  tfVal.value = tfVal.value === 'apple' ? false : 'apple';
}
</script>

# Switch 开关

开关允许用户在两个对立/互斥的状态之间切换，通常起到“开启”和“关闭”的作用；开关通常是在用户操作后便立即生效的，不需要通过提交应用/提交按钮来生效。

## 默认

<panda-row>
  <panda-col :span="12">
    <p>Off</p>
    <panda-switch>Switch Text</panda-switch>
  </panda-col>
  <panda-col :span="12">
    <p>On</p>
    <panda-switch v-model="switchVal.value2"></panda-switch>
  </panda-col>
</panda-row>

<script>
export default {
  data () {
    return {
      switchVal: {
        value1: false,
        value2: true,
        value3: false,
        value4: true,
      }
    }
  }
}
</script>

<!-- ## 真假值测试


<panda-button type="primary" @click="toggleTFVal">toggleTFVal{{ tfVal }}</panda-button>
<panda-switch v-model="tfVal" true-value="apple" @change="onChange">Apple</panda-switch>

 -->

## 禁用状态

<panda-row>
  <panda-col :span="12">
    <p>Off Disabled</p>
    <panda-switch v-model="switchVal.value3" disabled>Switch Text</panda-switch>
  </panda-col>
  <panda-col :span="12">
    <p>On Disabled</p>
    <panda-switch v-model="switchVal.value4" disabled></panda-switch>
  </panda-col>
</panda-row>

## 大小 Size

> 在正常尺寸之外提供一种 small 尺寸

<panda-row>
  <panda-col :span="12">
    <p>Off</p>
    <panda-switch v-model="switchVal.value1" size="small">Switch Text</panda-switch>
  </panda-col>
  <panda-col :span="12">
    <p>On</p>
    <panda-switch v-model="switchVal.value2" size="small"></panda-switch>
  </panda-col>
</panda-row>

<panda-row>
  <panda-col :span="12">
    <p>Off Disabled</p>
    <panda-switch v-model="switchVal.value3" disabled size="small">Switch Text</panda-switch>
  </panda-col>
  <panda-col :span="12">
    <p>On Disabled</p>
    <panda-switch v-model="switchVal.value4" disabled size="small"></panda-switch>
  </panda-col>
</panda-row>

## Switch Props

| 参数        | 介绍                          | 类型                    | 可选值 | 默认值 |
| ----------- | ----------------------------- | ----------------------- | ------ | ------ |
| value       | 是否选中，可通过 v-model 绑定 | String, Number, Boolean | —      | —      |
| true-value  | 选中时的值                    | String, Number, Boolean | true   |
| false-value | 没有选中时的值                | String, Number, Boolean | false  |
| disabled    | 是否禁用                      | Boolean                 | —      | false  |
| size        | 尺寸                          | String                  | small  | -      |
| name        | switch 对应的 name 属性       | String                  | -      | -      |

## Switch Events

| 名称   | 介绍         | 参数    |
| ------ | ------------ | ------- |
| change | 值改变时触发 | (value) |
