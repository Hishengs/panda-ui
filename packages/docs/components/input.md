---
title: Input 输入框
lang: zh-CN
---

<script setup>
import Input from '../../panda-ui/src/components/input'
import { Row, Col } from '../../panda-ui/src/components/grid'

defineOptions({
  components: {
    'panda-input': Input,
    'panda-row': Row,
    'panda-col': Col
  }
});
</script>

# Input 输入框

Input（输入框）是一个信息输入的控件，用户可输入或复制粘贴文本、数字等内容

<!-- <ks-qrcode>扫描此二维码在移动端预览</ks-qrcode> -->

## 默认

<panda-input placeholder="I am an input" @input="onInput" @change="onChange"></panda-input>

<!-- ## 带标签


<panda-input
  placeholder="I am an input"
  label="Title"
  @focus="onFocus"
  @blur="onBlur"
></panda-input>

 -->

## 类型

<p style="margin: 10px 0;">outlined (默认)</p>
<panda-input style-type="outlined" placeholder="I am an input"></panda-input>

<p style="margin: 10px 0;">lined</p>
<panda-input style-type="lined" placeholder="I am an input"></panda-input>

<p style="margin: 10px 0;">filled</p>
<panda-input style-type="filled" placeholder="I am an input"></panda-input>

## 禁用

<p style="margin: 10px 0;">outlined</p>
<panda-input style-type="outlined" placeholder="I am an input" disabled></panda-input>

<p style="margin: 10px 0;">lined</p>
<panda-input style-type="lined" placeholder="I am an input" disabled></panda-input>

<p style="margin: 10px 0;">filled</p>
<panda-input style-type="filled" placeholder="I am an input" disabled></panda-input>

<!-- ## 错误文字


<p style="margin: 10px 0;">outlined</p>
<panda-input style-type="outlined" placeholder="I am an input" error-message="Error Message"></panda-input>

<p style="margin: 10px 0;">lined</p>
<panda-input style-type="lined" placeholder="I am an input" error-message="Error Message"></panda-input>

<p style="margin: 10px 0;">filled</p>
<panda-input style-type="filled" placeholder="I am an input" error-message="Error Message"></panda-input>

 -->

## 多行文本框

<panda-row :gutter="16">
  <panda-col :span="12">
    <panda-input type="textarea" placeholder="I am an input"></panda-input>
  </panda-col>
  <panda-col :span="12">
    <panda-input type="textarea" placeholder="I am an input" words-count></panda-input>
  </panda-col>
</panda-row>

## 可清除

<panda-input placeholder="I am an input" :clearable="true" @clear="onClear"></panda-input>

## 密码框

<panda-input type="password" placeholder="I am an input"></panda-input>

## 前后置图标

<panda-row :gutter="16">
  <panda-col :span="10">
    <panda-input placeholder="I am an input" prepend-icon="user"></panda-input>
  </panda-col>
  <panda-col :span="10">
    <panda-input placeholder="I am an input" append-icon="user"></panda-input>
  </panda-col>
</panda-row>

## 前后置内容

<panda-row :gutter="16">
  <panda-col :span="10">
    <panda-input placeholder="I am an input">
      <span slot="prepend" style="padding-left: 12px;">住址</span>
    </panda-input>
  </panda-col>
  <panda-col :span="10">
    <panda-input placeholder="I am an input">
      <span slot="append" style="padding-right: 12px;">@panda.com</span>
      <!-- <panda-button type="primary" size="small" slot="append" style="border-radius: 0;">
        搜索
      </panda-button> -->
    </panda-input>
  </panda-col>
</panda-row>

## 大小

<p style="margin: 10px 0;">small</p>
<panda-input size="small" placeholder="I am an input"></panda-input>

<p style="margin: 10px 0;">normal (默认)</p>
<panda-input placeholder="I am an input"></panda-input>

<p style="margin: 10px 0;">large</p>
<panda-input size="large" placeholder="I am an input"></panda-input>

## Input Props

| 参数                 | 介绍                                             | 类型           | 可选值                  | 默认值   |
| -------------------- | ------------------------------------------------ | -------------- | ----------------------- | -------- |
| value / v-model      | 绑定值                                           | String, Number | —                       | —        |
| type                 | 原生 type 类型                                   | String         | —                       | text     |
| size                 | 大小                                             | String         | small, large            | —        |
| style-type           | 样式类型                                         | String         | outlined, lined, filled | outlined |
| disabled             | 是否禁用                                         | Boolean        | —                       | false    |
| readonly             | 是否只读                                         | Boolean        | —                       | false    |
| clearable            | 是否可清除                                       | Boolean        | —                       | false    |
| words-count          | 是否统计字数，type 为 textarea 时有效            | Boolean        | —                       | false    |
| words-count-function | 自定义字数统计函数，参数为当前输入内容，返回字数 | Function       | —                       | —        |
| placeholder          | 占位符                                           | String         | —                       | —        |
| autocomplete         | 原生 autocomplete                                | String         | —                       | off      |
| name                 | 原生 name                                        | String         | —                       | —        |
| autofocus            | 原生 autofocus                                   | Boolean        | —                       | false    |
| maxlength            | 原生属性，最大输入长度                           | Number         | —                       | —        |
| minlength            | 原生属性，最小输入长度                           | Number         | —                       | —        |
| max                  | 原生属性，最大值                                 | —              | —                       | —        |
| min                  | 原生属性，最小值                                 | —              | —                       | —        |
| rows                 | textarea rows                                    | Number         | —                       | 5        |
| spellcheck           | 原生 spellcheck                                  | Boolean        | —                       | false    |
| prepend-icon         | 前置图标                                         | String         | —                       | —        |
| append-icon          | 后置图标                                         | String         | —                       | —        |

<!-- | error-message | 错误提示信息 | String | — | — | -->

## Input Events

| 事件    | 介绍                                 | 参数                     |
| ------- | ------------------------------------ | ------------------------ |
| blur    | 在 Input 失去焦点时触发              | (event: Event)           |
| focus   | 在 Input 获得焦点时触发              | (event: Event)           |
| input   | 在 Input 值改变时触发                | (value: string / number) |
| change  | 在输入框失去焦点或用户按下回车时触发 | (value: string / number) |
| enter   | 按下回车键时触发                     | (event: Event)           |
| keyup   | 原生的 keyup 事件                    | (event: Event)           |
| keydown | 原生的 keydown 事件                  | (event: Event)           |
| clear   | 点击清除按钮时触发                   | —                        |

## Input Slots

| 名称        | 介绍     | 类型 | 参数          |
| ----------- | -------- | ---- | ------------- |
| default     | 默认     | Slot | —             |
| prepend     | 前置内容 | Slot | —             |
| append      | 后置内容 | Slot | —             |
| words-count | 字数统计 | Slot | { words-num } |

<!-- | error-message | 错误提示 | Slot | — | -->

## Input Methods

| 事件  | 介绍              | 参数 |
| ----- | ----------------- | ---- |
| focus | 使 input 获取焦点 | —    |
| blur  | 使 input 失去焦点 | —    |

<script>
  export default {
    methods: {
      onInput (val) {
        console.log('>>> onInput', val);
      },
      onChange (val) {
        console.log('>>> onChange', val);
      },
      onFocus (e) {
        console.log('>>> onFocus', e);
      },
      onBlur (e) {
        console.log('>>> onBlur', e);
      },
      onClear () {
        console.log('>>> onClear');
      },
      // 字数计算
      countWords (val) {
        // 去掉不作计算的字符
        return val ? val.replace(/[\s\.\,]/g, '').length : 0;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panda-input {
    width: 320px;
  }
  .panda-input.panda-input-is-textarea {
    width: 100%;
  }
</style>
