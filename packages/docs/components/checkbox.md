---
title: Checkbox 复选框
lang: zh-CN
---

<script setup>
import { ref, reactive } from 'vue';
import Checkbox from '../../panda-ui/src/components/checkbox'
import { Row, Col } from '../../panda-ui/src/components/grid'

defineOptions({
  components: {
    'panda-checkbox': Checkbox,
    'panda-row': Row,
    'panda-col': Col
  }
});

const groupVal = ref([1])
const indeterminate = ref(true)
const checkAll = ref(false)
const indeterminateChecked = ref([1])
const indeterminateOptions = ref([1,2,3])
const radioVal = reactive({
  value1: false,
  value2: true,
  value3: false,
  value4: true
})
const tfVal = ref('apple')

const onChange = (val) => {
  console.log('>>> onChange', val);
}
const handleCheckAllChange = (val) => {
  indeterminateChecked.value = val ? [...(indeterminateOptions.value)] : [];
  indeterminate.value = false;
}
const handleCheckedChange = (value) => {
  let checkedCount = value.length;
  checkAll.value = checkedCount === indeterminateOptions.value.length;
  indeterminate.value = checkedCount > 0 && checkedCount < indeterminateOptions.value.length;
}
const toggleTFVal = () => {
  tfVal.value = tfVal.value === 'apple' ? false : 'apple';
}
</script>

# Checkbox 复选框

## 默认

<panda-row>
  <panda-col :span="6">
    <p>UnChecked</p>
    <panda-checkbox>Option 1</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Checked</p>
    <panda-checkbox v-model="radioVal.value2">Option 2 bla bla bla bla bla bla bla bla bla</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Solo</p>
    <panda-checkbox v-model="radioVal.value1"></panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Indeterminate</p>
    <panda-checkbox v-model="radioVal.value1" indeterminate></panda-checkbox>
  </panda-col>
</panda-row>

<script>
export default {
  data () {
    return {
      radioVal: {
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
<panda-checkbox v-model="tfVal" true-value="apple" @change="onChange">Apple</panda-checkbox>

 -->

> `indeterminate` 一般用于多选组半选中状态，勿单独使用

## 禁用状态

<panda-row>
  <panda-col :span="6">
    <p>UnChecked Disabled</p>
    <panda-checkbox v-model="radioVal.value3" disabled>Option Text</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Checked Disabled</p>
    <panda-checkbox v-model="radioVal.value4" disabled>Option 2 bla bla bla bla bla bla bla bla bla</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Solo</p>
    <panda-checkbox v-model="radioVal.value1" disabled></panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Indeterminate Disabled</p>
    <panda-checkbox v-model="radioVal.value1" indeterminate disabled>Option Text</panda-checkbox>
  </panda-col>
</panda-row>

## 大小 Size

> 在正常尺寸之外提供一种 small 尺寸

<panda-row>
  <panda-col :span="6">
    <p>UnChecked</p>
    <panda-checkbox v-model="radioVal.value1" size="small">Option 1</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Checked</p>
    <panda-checkbox v-model="radioVal.value2" size="small">Option 2</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Solo</p>
    <panda-checkbox v-model="radioVal.value1" size="small"></panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Indeterminate</p>
    <panda-checkbox v-model="radioVal.value1" indeterminate size="small"></panda-checkbox>
  </panda-col>
</panda-row>

<panda-row>
  <panda-col :span="6">
    <p>UnChecked Disabled</p>
    <panda-checkbox v-model="radioVal.value3" disabled size="small">Option Text</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Checked Disabled</p>
    <panda-checkbox v-model="radioVal.value4" disabled size="small">Option Text</panda-checkbox>
  </panda-col>
  <panda-col :span="6">
    <p>Indeterminate Disabled</p>
    <panda-checkbox v-model="radioVal.value1" indeterminate disabled size="small">Option Text</panda-checkbox>
  </panda-col>
</panda-row>

## 多选框组

<panda-row>
  <panda-col :span="12">
    <p>Default</p>
    <panda-checkbox-group v-model="groupVal" @change="onChange">
      <panda-checkbox :group-value="1">Option 1</panda-checkbox>
      <panda-checkbox :group-value="2">Option 2</panda-checkbox>
      <panda-checkbox :group-value="3">Option 3</panda-checkbox>
    </panda-checkbox-group>
  </panda-col>
  <panda-col :span="12">
    <p>Size Small</p>
    <panda-checkbox-group v-model="groupVal" size="small">
      <panda-checkbox :group-value="1">Option 1</panda-checkbox>
      <panda-checkbox :group-value="2">Option 2</panda-checkbox>
      <panda-checkbox :group-value="3">Option 3</panda-checkbox>
    </panda-checkbox-group>
  </panda-col>
</panda-row>

<panda-row>
  <panda-col :span="12">
    <p>Disabled</p>
    <panda-checkbox-group v-model="groupVal" disabled>
      <panda-checkbox :group-value="1">Option 1</panda-checkbox>
      <panda-checkbox :group-value="2">Option 2</panda-checkbox>
      <panda-checkbox :group-value="3">Option 3</panda-checkbox>
    </panda-checkbox-group>
  </panda-col>
  <panda-col :span="12">
    <p>Multi Lines</p>
    <panda-checkbox-group v-model="groupVal">
      <panda-checkbox :group-value="1">Option 1</panda-checkbox>
      <panda-checkbox :group-value="2">Option 2 bla</panda-checkbox>
      <panda-checkbox :group-value="4">Option 4</panda-checkbox>
      <panda-checkbox :group-value="5" disabled>Option 5 blabla</panda-checkbox>
      <panda-checkbox :group-value="6">Option 6 bla bla</panda-checkbox>
    </panda-checkbox-group>
  </panda-col>
</panda-row>

## indeterminate 状态

> 一般用于多选组中标识处于 **未选 => 全选** 的中间状态

<panda-checkbox
v-model="checkAll"
:indeterminate="indeterminate"
@change="handleCheckAllChange"

> 全选
> </panda-checkbox>
> <panda-checkbox-group
> v-model="indeterminateChecked"
> style="margin-top: 20px;"
> @change="handleCheckedChange"
>
> <panda-checkbox

    :group-value="item"
    v-for="item in indeterminateOptions"
    :key="item"

> Option {{ item }}</panda-checkbox>
> </panda-checkbox-group>

## 自由布局

> 配合 Grid 可实现自定义布局

<p>一行四列</p>
<panda-checkbox-group v-model="groupVal" @change="onChange">
  <panda-row style="margin-bottom: 20px;">
    <panda-col :span="6"><panda-checkbox :group-value="1">Option 1</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="2">Option 2</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="3">Option 3</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="4">Option 4</panda-checkbox></panda-col>
  </panda-row>
  <panda-row style="margin-bottom: 20px;">
    <panda-col :span="6"><panda-checkbox :group-value="5">Option 5</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="6">Option 6</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="7">Option 7</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="8">Option 8</panda-checkbox></panda-col>
  </panda-row>
  <panda-row>
    <panda-col :span="6"><panda-checkbox :group-value="9">Option 9</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="10">Option 10</panda-checkbox></panda-col>
    <panda-col :span="6"><panda-checkbox :group-value="11">Option 11</panda-checkbox></panda-col>
  </panda-row>
</panda-checkbox-group>

## Checkbox Props

| 参数          | 介绍                                             | 类型                    | 可选值 | 默认值 |
| ------------- | ------------------------------------------------ | ----------------------- | ------ | ------ |
| value         | 是否选中，可通过 v-model 绑定                    | String, Number, Boolean | —      | —      |
| true-value    | 选中时的值，绑定值与此值相等时选中               | String, Number, Boolean | true   |
| false-value   | 没有选中时的值                                   | String, Number, Boolean | false  |
| group-value   | 用于单选框组合的给定值                           | String, Number          | —      | -      |
| disabled      | 是否禁用                                         | Boolean                 | —      | false  |
| size          | 尺寸                                             | String                  | small  | -      |
| name          | checkbox 对应的 name 属性                        | String                  | -      | -      |
| indeterminate | 不确定态，一般用于多选组半选中状态，只起样式作用 | Boolean                 | —      | false  |

## Checkbox Events

| 名称   | 介绍         | 参数    |
| ------ | ------------ | ------- |
| change | 值改变时触发 | (value) |

## CheckboxGroup Props

| 参数     | 介绍                        | 类型    | 可选值 | 默认值 |
| -------- | --------------------------- | ------- | ------ | ------ |
| value    | 选中值，可通过 v-model 绑定 | Array   | —      | -      |
| disabled | 是否禁用                    | Boolean | —      | false  |
| size     | 尺寸                        | String  | small  | -      |

## CheckboxGroup Events

| 名称   | 介绍         | 参数    |
| ------ | ------------ | ------- |
| change | 值改变时触发 | (value) |

<style scoped>
  .panda-row {
    padding: 0 20px;
  }
  p.tip {
    margin: 0;
    color: #999;
    font-size: 14px;
  }
</style>
